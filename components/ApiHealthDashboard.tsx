/**
 * Tableau de bord pour monitorer la santé de l'API et le système de retry
 * Composant pour les administrateurs et le développement
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertCircle, CheckCircle, Clock, RefreshCw, Zap, Activity } from 'lucide-react';
import { performHealthCheck, apiHealthMonitor, testSpecificEndpoint, type HealthCheckResult, type ApiTestResult } from '../utils/apiTester';
import { retryManager } from '../utils/retrySystem';
import { toast } from 'sonner@2.0.3';

export function ApiHealthDashboard() {
  const [healthStatus, setHealthStatus] = useState<HealthCheckResult | null>(null);
  const [circuitBreakerStates, setCircuitBreakerStates] = useState<Record<string, { state: string; failures: number }>>({});
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Charger l'état initial
  useEffect(() => {
    loadHealthStatus();
    loadCircuitBreakerStates();
    
    // Écouter les mises à jour du monitoring
    const handleHealthUpdate = (health: HealthCheckResult) => {
      setHealthStatus(health);
      setLastUpdate(new Date());
    };
    
    apiHealthMonitor.addListener(handleHealthUpdate);
    
    return () => {
      apiHealthMonitor.removeListener(handleHealthUpdate);
    };
  }, []);

  const loadHealthStatus = async () => {
    const existing = apiHealthMonitor.getLastHealthCheck();
    if (existing) {
      setHealthStatus(existing);
      setLastUpdate(new Date(existing.timestamp));
    }
  };

  const loadCircuitBreakerStates = () => {
    const states = retryManager.getCircuitBreakerStates();
    setCircuitBreakerStates(states);
  };

  const runHealthCheck = async () => {
    setIsRunningTest(true);
    try {
      const result = await performHealthCheck();
      setHealthStatus(result);
      setLastUpdate(new Date());
      loadCircuitBreakerStates();
      
      toast.success('Test de santé terminé', {
        description: `État: ${result.overall} • ${result.endpoints.filter(e => e.success).length}/${result.endpoints.length} endpoints fonctionnels`
      });
    } catch (error) {
      toast.error('Erreur lors du test de santé', {
        description: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    } finally {
      setIsRunningTest(false);
    }
  };

  const testEndpoint = async (endpointName: string) => {
    try {
      toast.loading(`Test de l'endpoint ${endpointName}...`);
      const result = await testSpecificEndpoint(endpointName);
      
      if (result.success) {
        toast.success(`Endpoint ${endpointName} fonctionnel`, {
          description: `Temps de réponse: ${result.responseTime}ms • Tentatives: ${result.retryCount || 1}`
        });
      } else {
        toast.error(`Endpoint ${endpointName} en échec`, {
          description: result.error || 'Erreur inconnue'
        });
      }
      
      loadCircuitBreakerStates();
    } catch (error) {
      toast.error(`Erreur lors du test de ${endpointName}`, {
        description: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };

  const resetCircuitBreaker = (key: string) => {
    retryManager.resetCircuitBreaker(key);
    loadCircuitBreakerStates();
    toast.success('Circuit breaker réinitialisé', {
      description: `Le circuit breaker '${key}' a été réinitialisé`
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'unhealthy':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-orange-100 text-orange-800';
      case 'unhealthy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCircuitBreakerColor = (state: string) => {
    switch (state) {
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'half-open':
        return 'bg-orange-100 text-orange-800';
      case 'open':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Tableau de bord API</h2>
          <p className="text-sm text-muted-foreground">
            Monitoring de la santé de l'API Membri 365 et système de retry
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdate && (
            <span className="text-xs text-muted-foreground">
              Dernière MAJ: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <Button
            onClick={runHealthCheck}
            disabled={isRunningTest}
            size="sm"
          >
            {isRunningTest ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Activity className="w-4 h-4 mr-2" />
            )}
            Test complet
          </Button>
        </div>
      </div>

      {/* État général */}
      {healthStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(healthStatus.overall)}
              État général du système
            </CardTitle>
            <CardDescription>
              Mode: {healthStatus.apiMode} • Connectivité: {healthStatus.connectivity ? 'Oui' : 'Non'}
              {healthStatus.responseTime > 0 && (
                <> • Temps de réponse moyen: {Math.round(healthStatus.responseTime)}ms</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Badge className={getStatusColor(healthStatus.overall)}>
                {healthStatus.overall.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {healthStatus.endpoints.filter(e => e.success).length}/{healthStatus.endpoints.length} endpoints fonctionnels
              </span>
            </div>

            {/* Erreurs */}
            {healthStatus.errors.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Erreurs détectées:</h4>
                <ul className="text-sm text-red-600 space-y-1">
                  {healthStatus.errors.map((error, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommandations */}
            {healthStatus.recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recommandations:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {healthStatus.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-blue-500">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tests par endpoint */}
      {healthStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Tests par endpoint</CardTitle>
            <CardDescription>
              État détaillé de chaque endpoint de l'API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {healthStatus.endpoints.map((endpoint) => (
                <div key={endpoint.endpoint} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {endpoint.success ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <div>
                      <span className="font-medium">{endpoint.endpoint}</span>
                      {endpoint.error && (
                        <p className="text-xs text-red-600">{endpoint.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {endpoint.success && (
                      <span className="text-xs text-muted-foreground">
                        {endpoint.responseTime}ms
                      </span>
                    )}
                    {endpoint.retryCount && endpoint.retryCount > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {endpoint.retryCount + 1} tentatives
                      </Badge>
                    )}
                    <Button
                      onClick={() => testEndpoint(endpoint.endpoint)}
                      size="sm"
                      variant="outline"
                    >
                      Tester
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Circuit Breakers */}
      {Object.keys(circuitBreakerStates).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Circuit Breakers
            </CardTitle>
            <CardDescription>
              État des disjoncteurs pour la protection contre la surcharge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(circuitBreakerStates).map(([key, state]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="font-medium">{key}</span>
                      <p className="text-xs text-muted-foreground">
                        {state.failures} échecs détectés
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getCircuitBreakerColor(state.state)}>
                      {state.state.toUpperCase()}
                    </Badge>
                    {state.state === 'open' && (
                      <Button
                        onClick={() => resetCircuitBreaker(key)}
                        size="sm"
                        variant="outline"
                      >
                        Réinitialiser
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!healthStatus && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Aucun test effectué</p>
              <Button
                onClick={runHealthCheck}
                disabled={isRunningTest}
                className="mt-2"
                size="sm"
              >
                {isRunningTest ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Activity className="w-4 h-4 mr-2" />
                )}
                Lancer le premier test
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}