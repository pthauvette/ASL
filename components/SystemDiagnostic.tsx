import { useState, useEffect } from 'react';
import { membriApi } from '../utils/membriApi';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Wifi, 
  WifiOff, 
  Server, 
  Database,
  Shield,
  Clock,
  RefreshCw,
  Monitor,
  Zap,
  ChevronUp,
  ChevronDown,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { ApiHealthDashboard } from './ApiHealthDashboard';

interface DiagnosticInfo {
  environment: string;
  mode: string;
  hostname: string;
  userAgent: string;
  demoDataAvailable: boolean;
  networkCallsBlocked: boolean;
}

interface SystemDiagnosticProps {
  apiStatus: 'loading' | 'connected' | 'demo' | 'fallback';
  hasActiveEvents: boolean | null;
  className?: string;
}

export function SystemDiagnostic({ apiStatus, hasActiveEvents, className = '' }: SystemDiagnosticProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<DiagnosticInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadDiagnosticInfo = async () => {
    setIsLoading(true);
    try {
      const info = await membriApi.getDiagnosticInfo();
      setDiagnosticInfo(info);
    } catch (error) {
      console.error('Erreur de diagnostic:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && !diagnosticInfo) {
      loadDiagnosticInfo();
    }
  }, [isOpen, diagnosticInfo]);

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'demo':
        return <Settings className="h-4 w-4 text-blue-600" />;
      case 'fallback':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected':
        return 'Système connecté';
      case 'demo':
        return 'Mode démonstration';
      case 'fallback':
        return 'Mode dégradé';
      default:
        return 'Statut inconnu';
    }
  };

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'connected':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'demo':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'fallback':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const isDevelopment = membriApi.isInDevelopment();

  // Ne montrer que si nécessaire
  if (!isDevelopment && apiStatus === 'connected') {
    return null;
  }

  return (
    <div className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
              <Badge variant="outline" className="text-xs">
                {isDevelopment ? 'DEV' : 'PROD'}
              </Badge>
            </div>
            {isOpen ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-3">
          <Card className="text-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Diagnostic Système ASL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Statut principal */}
              <Alert className={getStatusColor()}>
                <AlertDescription>
                  <strong>Statut :</strong> {getStatusText()}
                  {apiStatus === 'demo' && (
                    <span className="block mt-1">
                      ✅ Mode hors ligne actif - Aucun appel réseau effectué. Données de test complètes disponibles.
                    </span>
                  )}
                  {apiStatus === 'fallback' && (
                    <span className="block mt-1">
                      ⚠️ API temporairement non accessible. Utilisation des données de secours.
                    </span>
                  )}
                  {apiStatus === 'connected' && (
                    <span className="block mt-1">
                      🌐 Connexion active à l'API Membri 365. Toutes les fonctionnalités disponibles.
                    </span>
                  )}
                </AlertDescription>
              </Alert>

              {/* Informations événements */}
              <div className="flex items-center justify-between py-2 border-b">
                <span>Événements disponibles :</span>
                <Badge variant={hasActiveEvents ? "default" : "secondary"}>
                  {hasActiveEvents === null ? 'Chargement...' : 
                   hasActiveEvents ? '5 événements' : 'Aucun événement'}
                </Badge>
              </div>

              {/* Performance et sécurité */}
              {apiStatus === 'demo' && (
                <div className="grid grid-cols-2 gap-2 py-2 border-b">
                  <div className="flex items-center gap-1 text-blue-700">
                    <Shield className="h-3 w-3" />
                    <span className="text-xs">Sécurisé</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-700">
                    <Zap className="h-3 w-3" />
                    <span className="text-xs">Performance max</span>
                  </div>
                </div>
              )}

              {/* Diagnostic détaillé */}
              {diagnosticInfo && (
                <div className="space-y-2 pt-2 border-t">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">Environnement :</span>
                      <div className="text-muted-foreground">{diagnosticInfo.environment}</div>
                    </div>
                    <div>
                      <span className="font-medium">Mode :</span>
                      <div className="text-muted-foreground">{diagnosticInfo.mode}</div>
                    </div>
                    <div>
                      <span className="font-medium">Hostname :</span>
                      <div className="text-muted-foreground">{diagnosticInfo.hostname}</div>
                    </div>
                    <div>
                      <span className="font-medium">Appels réseau :</span>
                      <div className="text-muted-foreground">
                        {diagnosticInfo.networkCallsBlocked ? '🚫 Bloqués' : '✅ Autorisés'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Garanties de sécurité */}
                  {diagnosticInfo.networkCallsBlocked && (
                    <div className="pt-2 border-t">
                      <div className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
                        <strong>Garantie :</strong> Mode hors ligne complet. Aucune donnée transmise sur le réseau.
                      </div>
                    </div>
                  )}
                  
                  {isDevelopment && (
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        <strong>User Agent :</strong> {diagnosticInfo.userAgent}...
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions de développement */}
              {isDevelopment && (
                <div className="pt-3 border-t space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">
                    Actions de développement :
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.location.reload()}
                      className="text-xs"
                    >
                      Recharger
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => console.log('Configuration:', membriApi.getConfig())}
                      className="text-xs"
                    >
                      Log config
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Note :</strong> Pour tester l'API réelle, déployez en environnement de production.
                  </div>
                </div>
              )}

              {/* Informations sur les données */}
              <div className="pt-2 border-t text-xs text-muted-foreground">
                <strong>Données disponibles :</strong> 13 provinces, 20 villes, 3 types d'adhésion, 10 secteurs d'activité, 5 événements
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}