/**
 * Système de retry automatique avancé pour les appels API
 * Gère différentes stratégies de retry avec backoff exponentiel et circuit breaker
 */

export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  jitter: boolean;
  retryableErrors: string[];
  onRetry?: (attempt: number, error: any) => void;
  onSuccess?: (attempt: number) => void;
  onFailure?: (finalError: any, totalAttempts: number) => void;
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeout: number;
  monitoringPeriod: number;
}

export interface RetryResult<T> {
  success: boolean;
  data?: T;
  error?: any;
  attempts: number;
  totalTime: number;
  circuitBreakerState?: 'closed' | 'open' | 'half-open';
}

export enum RetryStrategy {
  FIXED = 'fixed',
  LINEAR = 'linear', 
  EXPONENTIAL = 'exponential',
  CUSTOM = 'custom'
}

// Configuration par défaut pour différents types d'opérations
export const DEFAULT_RETRY_CONFIGS: Record<string, RetryConfig> = {
  // Pour les opérations critiques (authentification, soumission de formulaires)
  critical: {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
    jitter: true,
    retryableErrors: ['NetworkError', 'TimeoutError', 'ServerError', 'RateLimitError']
  },
  
  // Pour les opérations standard (récupération de données)
  standard: {
    maxAttempts: 2,
    baseDelay: 500,
    maxDelay: 5000,
    backoffMultiplier: 1.5,
    jitter: true,
    retryableErrors: ['NetworkError', 'TimeoutError', 'ServerError']
  },
  
  // Pour les opérations en arrière-plan (non critiques)
  background: {
    maxAttempts: 5,
    baseDelay: 2000,
    maxDelay: 30000,
    backoffMultiplier: 2,
    jitter: true,
    retryableErrors: ['NetworkError', 'TimeoutError', 'ServerError', 'RateLimitError']
  },
  
  // Pour les tests de connectivité
  connectivity: {
    maxAttempts: 1,
    baseDelay: 1000,
    maxDelay: 1000,
    backoffMultiplier: 1,
    jitter: false,
    retryableErrors: ['NetworkError', 'TimeoutError']
  }
};

/**
 * Circuit Breaker pour éviter d'overloader un service défaillant
 */
class CircuitBreaker {
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private failures = 0;
  private lastFailureTime = 0;
  private successCount = 0;

  constructor(private config: CircuitBreakerConfig) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime >= this.config.resetTimeout) {
        this.state = 'half-open';
        this.successCount = 0;
        console.log('🔄 Circuit breaker: tentative de récupération (half-open)');
      } else {
        throw new Error('Circuit breaker ouvert - service temporairement indisponible');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    if (this.state === 'half-open') {
      this.successCount++;
      if (this.successCount >= 2) { // 2 succès consécutifs pour fermer
        this.state = 'closed';
        this.failures = 0;
        console.log('✅ Circuit breaker fermé - service rétabli');
      }
    } else {
      this.failures = Math.max(0, this.failures - 1); // Décrémenter graduellement
    }
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.config.failureThreshold) {
      this.state = 'open';
      console.log(`⚠️ Circuit breaker ouvert après ${this.failures} échecs`);
    }
  }

  getState() {
    return this.state;
  }

  getFailureCount() {
    return this.failures;
  }

  reset() {
    this.state = 'closed';
    this.failures = 0;
    this.lastFailureTime = 0;
    this.successCount = 0;
  }
}

/**
 * Classe principale pour gérer les retry avec circuit breaker
 */
class RetryManager {
  private circuitBreakers = new Map<string, CircuitBreaker>();
  private defaultCircuitBreakerConfig: CircuitBreakerConfig = {
    failureThreshold: 5,
    resetTimeout: 60000, // 1 minute
    monitoringPeriod: 300000 // 5 minutes
  };

  /**
   * Exécute une opération avec retry automatique
   */
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: RetryConfig,
    circuitBreakerKey?: string
  ): Promise<RetryResult<T>> {
    const startTime = Date.now();
    let lastError: any;
    let attempts = 0;

    // Utiliser le circuit breaker si spécifié
    const executeOperation = circuitBreakerKey 
      ? () => this.getCircuitBreaker(circuitBreakerKey).execute(operation)
      : operation;

    for (attempts = 1; attempts <= config.maxAttempts; attempts++) {
      try {
        const result = await executeOperation();
        
        if (config.onSuccess) {
          config.onSuccess(attempts);
        }
        
        return {
          success: true,
          data: result,
          attempts,
          totalTime: Date.now() - startTime,
          circuitBreakerState: circuitBreakerKey 
            ? this.getCircuitBreaker(circuitBreakerKey).getState()
            : undefined
        };
        
      } catch (error: any) {
        lastError = error;
        
        // Vérifier si l'erreur est retry-able
        const isRetryable = this.isRetryableError(error, config.retryableErrors);
        
        if (!isRetryable || attempts >= config.maxAttempts) {
          break;
        }
        
        // Calculer le délai avec backoff et jitter
        const delay = this.calculateDelay(attempts, config);
        
        if (config.onRetry) {
          config.onRetry(attempts, error);
        }
        
        console.log(`🔄 Retry ${attempts}/${config.maxAttempts} après ${delay}ms: ${error.message}`);
        
        // Attendre avant le prochain essai
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (config.onFailure) {
      config.onFailure(lastError, attempts);
    }

    return {
      success: false,
      error: lastError,
      attempts,
      totalTime: Date.now() - startTime,
      circuitBreakerState: circuitBreakerKey 
        ? this.getCircuitBreaker(circuitBreakerKey).getState()
        : undefined
    };
  }

  /**
   * Vérifie si une erreur justifie un retry
   */
  private isRetryableError(error: any, retryableErrors: string[]): boolean {
    const errorType = this.categorizeError(error);
    return retryableErrors.includes(errorType);
  }

  /**
   * Catégorise les erreurs pour déterminer la stratégie de retry
   */
  private categorizeError(error: any): string {
    const message = error?.message?.toLowerCase() || '';
    const status = error?.status || error?.response?.status;

    // Erreurs réseau
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return 'NetworkError';
    }

    // Timeout
    if (message.includes('timeout') || message.includes('aborted')) {
      return 'TimeoutError';
    }

    // Erreurs serveur (5xx)
    if (status >= 500 && status < 600) {
      return 'ServerError';
    }

    // Rate limiting (429)
    if (status === 429) {
      return 'RateLimitError';
    }

    // Erreurs client (4xx) - généralement non retry-ables
    if (status >= 400 && status < 500) {
      return 'ClientError';
    }

    // Erreurs d'authentification
    if (status === 401 || status === 403) {
      return 'AuthError';
    }

    return 'UnknownError';
  }

  /**
   * Calcule le délai avec backoff exponentiel et jitter
   */
  private calculateDelay(attempt: number, config: RetryConfig): number {
    let delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1);
    
    // Appliquer la limite maximale
    delay = Math.min(delay, config.maxDelay);
    
    // Ajouter du jitter pour éviter le thundering herd
    if (config.jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }
    
    return Math.floor(delay);
  }

  /**
   * Obtient ou crée un circuit breaker pour une clé donnée
   */
  private getCircuitBreaker(key: string): CircuitBreaker {
    if (!this.circuitBreakers.has(key)) {
      this.circuitBreakers.set(key, new CircuitBreaker(this.defaultCircuitBreakerConfig));
    }
    return this.circuitBreakers.get(key)!;
  }

  /**
   * Réinitialise un circuit breaker spécifique
   */
  resetCircuitBreaker(key: string) {
    const breaker = this.circuitBreakers.get(key);
    if (breaker) {
      breaker.reset();
      console.log(`🔄 Circuit breaker '${key}' réinitialisé`);
    }
  }

  /**
   * Obtient l'état de tous les circuit breakers
   */
  getCircuitBreakerStates(): Record<string, { state: string; failures: number }> {
    const states: Record<string, { state: string; failures: number }> = {};
    
    this.circuitBreakers.forEach((breaker, key) => {
      states[key] = {
        state: breaker.getState(),
        failures: breaker.getFailureCount()
      };
    });
    
    return states;
  }
}

// Instance globale du gestionnaire de retry
export const retryManager = new RetryManager();

/**
 * Fonction utilitaire pour retry simple sans circuit breaker
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  configName: keyof typeof DEFAULT_RETRY_CONFIGS = 'standard'
): Promise<T> {
  const config = DEFAULT_RETRY_CONFIGS[configName];
  const result = await retryManager.executeWithRetry(operation, config);
  
  if (result.success) {
    return result.data!;
  } else {
    throw result.error;
  }
}

/**
 * Fonction utilitaire pour retry avec circuit breaker
 */
export async function withRetryAndCircuitBreaker<T>(
  operation: () => Promise<T>,
  circuitBreakerKey: string,
  configName: keyof typeof DEFAULT_RETRY_CONFIGS = 'standard'
): Promise<T> {
  const config = DEFAULT_RETRY_CONFIGS[configName];
  const result = await retryManager.executeWithRetry(operation, config, circuitBreakerKey);
  
  if (result.success) {
    return result.data!;
  } else {
    throw result.error;
  }
}

/**
 * Utilitaire pour créer une configuration de retry personnalisée
 */
export function createRetryConfig(overrides: Partial<RetryConfig>): RetryConfig {
  return {
    ...DEFAULT_RETRY_CONFIGS.standard,
    ...overrides
  };
}

/**
 * Hook React pour utiliser le retry dans les composants
 */
export function useRetry() {
  return {
    withRetry,
    withRetryAndCircuitBreaker,
    retryManager,
    DEFAULT_RETRY_CONFIGS,
    createRetryConfig
  };
}