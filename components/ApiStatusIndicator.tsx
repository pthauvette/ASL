/**
 * Indicateur de statut API discret pour l'interface utilisateur
 * Affiche l'état de l'API et les métriques de retry de manière non-intrusive
 */

import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  CheckCircle, 
  AlertCircle, 
  Wifi, 
  WifiOff, 
  Settings, 
  RefreshCw,
  Clock,
  Zap
} from 'lucide-react';
import { apiHealthMonitor, quickConnectivityTest, type HealthCheckResult } from '../utils/apiTester';
import { retryManager } from '../utils/retrySystem';
import { membriApi } from '../utils/membriApi';

interface ApiStatusIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

export function ApiStatusIndicator({ className = '', showDetails = false }: ApiStatusIndicatorProps) {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected' | 'demo'>('checking');
  const [healthStatus, setHealthStatus] = useState<HealthCheckResult | null>(null);
  const [circuitBreakerCount, setCircuitBreakerCount] = useState(0);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  // Vérifier l'état initial et écouter les mises à jour
  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Vérifier toutes les 30 secondes

    // Écouter les mises à jour du monitoring
    const handleHealthUpdate = (health: HealthCheckResult) => {
      setHealthStatus(health);
      updateConnectionStatus(health);
      setLastCheck(new Date());
    };

    apiHealthMonitor.addListener(handleHealthUpdate);

    return () => {
      clearInterval(interval);
      apiHealthMonitor.removeListener(handleHealthUpdate);
    };
  }, []);

  const checkStatus = async () => {
    try {
      const isDemoMode = membriApi.isUsingDemoMode();
      
      if (isDemoMode) {
        setConnectionStatus('demo');
      } else {
        const isConnected = await quickConnectivityTest();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      }

      // Compter les circuit breakers ouverts
      const states = retryManager.getCircuitBreakerStates();
      const openBreakers = Object.values(states).filter(state => state.state === 'open').length;
      setCircuitBreakerCount(openBreakers);

      // Obtenir le dernier statut de santé
      const lastHealth = apiHealthMonitor.getLastHealthCheck();
      if (lastHealth) {
        setHealthStatus(lastHealth);
        setLastCheck(new Date(lastHealth.timestamp));
      }
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  const updateConnectionStatus = (health: HealthCheckResult) => {
    if (health.apiMode === 'demo') {
      setConnectionStatus('demo');
    } else if (health.connectivity) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('disconnected');
    }
  };

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          label: 'Connecté',
          color: 'bg-green-100 text-green-800 border-green-200',
          description: 'API Membri 365 fonctionnelle'
        };
      case 'demo':
        return {
          icon: <Settings className="w-3 h-3" />,
          label: 'Démo',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          description: 'Mode démonstration actif'
        };
      case 'disconnected':
        return {
          icon: <WifiOff className="w-3 h-3" />,
          label: 'Hors ligne',
          color: 'bg-red-100 text-red-800 border-red-200',
          description: 'API temporairement indisponible'
        };
      default:
        return {
          icon: <RefreshCw className="w-3 h-3 animate-spin" />,
          label: 'Vérification...',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          description: 'Vérification du statut en cours'
        };
    }
  };

  const statusConfig = getStatusConfig();

  if (!showDetails) {
    // Version simple - juste un indicateur discret
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className={`${statusConfig.color} ${className} cursor-help`}
            >
              <div className="flex items-center gap-1">
                {statusConfig.icon}
                <span className="text-xs">{statusConfig.label}</span>
              </div>
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-sm">
              <p className="font-medium">{statusConfig.description}</p>
              {lastCheck && (
                <p className="text-xs text-muted-foreground mt-1">
                  Dernière vérification: {lastCheck.toLocaleTimeString()}
                </p>
              )}
              {circuitBreakerCount > 0 && (
                <p className="text-xs text-orange-600 mt-1">
                  {circuitBreakerCount} protection(s) active(s)
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Version détaillée avec popover
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <div className="flex items-center gap-2">
            {statusConfig.icon}
            <span className="text-xs">{statusConfig.label}</span>
            {circuitBreakerCount > 0 && (
              <Badge variant="secondary" className="text-xs px-1">
                {circuitBreakerCount}
              </Badge>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-1">État de l'API</h4>
            <div className="flex items-center gap-2">
              <Badge className={statusConfig.color}>
                {statusConfig.label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {statusConfig.description}
              </span>
            </div>
          </div>

          {healthStatus && (
            <>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span>Endpoints fonctionnels:</span>
                  <span className="font-medium">
                    {healthStatus.endpoints.filter(e => e.success).length}/{healthStatus.endpoints.length}
                  </span>
                </div>
                {healthStatus.responseTime > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span>Temps de réponse moyen:</span>
                    <span className="font-medium">
                      {Math.round(healthStatus.responseTime)}ms
                    </span>
                  </div>
                )}
              </div>

              {healthStatus.errors.length > 0 && (
                <div className="pt-2 border-t">
                  <h5 className="text-xs font-medium text-red-600 mb-1">Erreurs actives:</h5>
                  <ul className="text-xs text-red-600 space-y-1">
                    {healthStatus.errors.slice(0, 3).map((error, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{error}</span>
                      </li>
                    ))}
                    {healthStatus.errors.length > 3 && (
                      <li className="text-muted-foreground">
                        ... et {healthStatus.errors.length - 3} autres
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </>
          )}

          {circuitBreakerCount > 0 && (
            <div className="pt-2 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-3 h-3 text-orange-500" />
                <span>{circuitBreakerCount} protection(s) active(s)</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Système de protection contre la surcharge actif
              </p>
            </div>
          )}

          <div className="pt-2 border-t flex items-center justify-between">
            {lastCheck && (
              <span className="text-xs text-muted-foreground">
                MAJ: {lastCheck.toLocaleTimeString()}
              </span>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={checkStatus}
              className="text-xs"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Actualiser
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}