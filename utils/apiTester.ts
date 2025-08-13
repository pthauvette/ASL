/**
 * Testeur API pour vérifier la connectivité et les performances de l'API Membri 365
 * Système de surveillance en temps réel avec diagnostics détaillés
 */

import { membriApi } from './membriApi';
import { MEMBRI_CONFIG } from './config';

export interface ApiTestResult {
  endpoint: string;
  success: boolean;
  responseTime: number;
  status?: number;
  error?: string;
  timestamp: number;
  retryCount?: number;
}

export interface HealthCheckResult {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  connectivity: boolean;
  responseTime: number;
  errors: string[];
  recommendations: string[];
  timestamp: number;
  endpoints: ApiTestResult[];
  apiMode: 'production' | 'demo' | 'offline';
}

interface TestConfig {
  timeout: number;
  maxRetries: number;
  retryDelay: number;
  criticalEndpoints: string[];
}

const DEFAULT_TEST_CONFIG: TestConfig = {
  timeout: 10000, // 10 secondes
  maxRetries: 2,
  retryDelay: 1000, // 1 seconde
  criticalEndpoints: [
    'cities',
    'membership-types',
    'sectors'
  ]
};

/**
 * Teste un endpoint spécifique avec retry automatique
 */
async function testEndpoint(
  endpointName: string, 
  testFunction: () => Promise<any>,
  config: TestConfig = DEFAULT_TEST_CONFIG
): Promise<ApiTestResult> {
  const startTime = Date.now();
  let lastError: string = '';
  let retryCount = 0;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    retryCount = attempt;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);
      
      await Promise.race([
        testFunction(),
        new Promise((_, reject) => {
          controller.signal.addEventListener('abort', () => {
            reject(new Error(`Timeout après ${config.timeout}ms`));
          });
        })
      ]);
      
      clearTimeout(timeoutId);
      
      return {
        endpoint: endpointName,
        success: true,
        responseTime: Date.now() - startTime,
        timestamp: Date.now(),
        retryCount: attempt
      };
      
    } catch (error: any) {
      lastError = error?.message || 'Erreur inconnue';
      
      // Si ce n'est pas le dernier essai, attendre avant de recommencer
      if (attempt < config.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, config.retryDelay * (attempt + 1)));
      }
    }
  }

  return {
    endpoint: endpointName,
    success: false,
    responseTime: Date.now() - startTime,
    error: lastError,
    timestamp: Date.now(),
    retryCount
  };
}

/**
 * Effectue un test de santé complet de l'API
 */
export async function performHealthCheck(): Promise<HealthCheckResult> {
  console.log('🔍 Démarrage du test de santé API Membri 365...');
  
  const results: ApiTestResult[] = [];
  const errors: string[] = [];
  const recommendations: string[] = [];
  
  // Détecter le mode API actuel
  const isDemo = membriApi.isUsingDemoMode();
  const apiMode: 'production' | 'demo' | 'offline' = isDemo ? 'demo' : 'production';
  
  // Tests des endpoints critiques
  const tests = [
    {
      name: 'cities',
      test: () => membriApi.getCities()
    },
    {
      name: 'membership-types', 
      test: () => membriApi.getMembershipTypes()
    },
    {
      name: 'sectors',
      test: () => membriApi.getSectors()
    },
    {
      name: 'events',
      test: () => membriApi.getEvents()
    },
    {
      name: 'members',
      test: () => membriApi.getMembers()
    }
  ];

  // Exécuter tous les tests en parallèle
  const testPromises = tests.map(({ name, test }) => 
    testEndpoint(name, test).catch(error => ({
      endpoint: name,
      success: false,
      responseTime: 0,
      error: error.message,
      timestamp: Date.now(),
      retryCount: DEFAULT_TEST_CONFIG.maxRetries
    }))
  );

  const testResults = await Promise.all(testPromises);
  results.push(...testResults);

  // Analyser les résultats
  const successfulTests = results.filter(r => r.success);
  const failedTests = results.filter(r => !r.success);
  const avgResponseTime = successfulTests.length > 0 
    ? successfulTests.reduce((sum, r) => sum + r.responseTime, 0) / successfulTests.length 
    : 0;

  // Déterminer l'état général
  let overall: 'healthy' | 'degraded' | 'unhealthy';
  const connectivity = successfulTests.length > 0;
  
  if (apiMode === 'demo') {
    overall = 'healthy'; // Mode démo est toujours considéré comme sain
  } else if (failedTests.length === 0) {
    overall = 'healthy';
  } else if (successfulTests.length >= failedTests.length) {
    overall = 'degraded';
  } else {
    overall = 'unhealthy';
  }

  // Collecter les erreurs et recommandations
  if (apiMode === 'demo') {
    recommendations.push('Mode démonstration actif - données simulées');
  }

  failedTests.forEach(test => {
    errors.push(`${test.endpoint}: ${test.error}`);
    
    if (DEFAULT_TEST_CONFIG.criticalEndpoints.includes(test.endpoint)) {
      recommendations.push(`Endpoint critique ${test.endpoint} indisponible - fonctionnalités limitées`);
    }
  });

  if (avgResponseTime > 5000) {
    recommendations.push('Temps de réponse élevé détecté - vérifier la connectivité');
  }

  if (failedTests.length > 0 && apiMode === 'production') {
    recommendations.push('Basculement automatique vers le mode démo recommandé');
  }

  const healthResult: HealthCheckResult = {
    overall,
    connectivity,
    responseTime: avgResponseTime,
    errors,
    recommendations,
    timestamp: Date.now(),
    endpoints: results,
    apiMode
  };

  console.log('✅ Test de santé terminé:', {
    overall: healthResult.overall,
    successful: successfulTests.length,
    failed: failedTests.length,
    avgResponseTime: Math.round(avgResponseTime),
    mode: apiMode
  });

  return healthResult;
}

/**
 * Test rapide de connectivité (pour les vérifications fréquentes)
 */
export async function quickConnectivityTest(): Promise<boolean> {
  try {
    const result = await testEndpoint('cities', () => membriApi.getCities(), {
      timeout: 5000,
      maxRetries: 1,
      retryDelay: 500,
      criticalEndpoints: []
    });
    
    return result.success;
  } catch {
    return false;
  }
}

/**
 * Surveille continuellement la santé de l'API
 */
export class ApiHealthMonitor {
  private intervalId: NodeJS.Timeout | null = null;
  private lastHealthCheck: HealthCheckResult | null = null;
  private listeners: ((health: HealthCheckResult) => void)[] = [];

  start(intervalMs: number = 300000) { // 5 minutes par défaut
    this.stop(); // Arrêter le monitoring existant
    
    console.log(`📊 Démarrage du monitoring API (intervalle: ${intervalMs/1000}s)`);
    
    this.intervalId = setInterval(async () => {
      try {
        const health = await performHealthCheck();
        this.lastHealthCheck = health;
        this.notifyListeners(health);
      } catch (error) {
        console.warn('Erreur lors du monitoring API:', error);
      }
    }, intervalMs);

    // Premier test immédiat
    this.performImmediateCheck();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('📊 Monitoring API arrêté');
    }
  }

  private async performImmediateCheck() {
    try {
      const health = await performHealthCheck();
      this.lastHealthCheck = health;
      this.notifyListeners(health);
    } catch (error) {
      console.warn('Erreur lors du test initial:', error);
    }
  }

  getLastHealthCheck(): HealthCheckResult | null {
    return this.lastHealthCheck;
  }

  addListener(callback: (health: HealthCheckResult) => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: (health: HealthCheckResult) => void) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(health: HealthCheckResult) {
    this.listeners.forEach(listener => {
      try {
        listener(health);
      } catch (error) {
        console.warn('Erreur dans le listener de monitoring:', error);
      }
    });
  }
}

// Instance globale du monitor
export const apiHealthMonitor = new ApiHealthMonitor();

/**
 * Utilitaire pour tester un endpoint spécifique manuellement
 */
export async function testSpecificEndpoint(endpointName: string): Promise<ApiTestResult> {
  const endpointMap: Record<string, () => Promise<any>> = {
    'cities': () => membriApi.getCities(),
    'membership-types': () => membriApi.getMembershipTypes(), 
    'sectors': () => membriApi.getSectors(),
    'events': () => membriApi.getEvents(),
    'members': () => membriApi.getMembers()
  };

  const testFunction = endpointMap[endpointName];
  if (!testFunction) {
    throw new Error(`Endpoint '${endpointName}' non reconnu`);
  }

  return testEndpoint(endpointName, testFunction);
}