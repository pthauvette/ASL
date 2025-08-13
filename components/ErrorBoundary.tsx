import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <Card className="shadow-xl">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </motion.div>

                <h1 className="text-3xl font-serif text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
                  Une erreur s'est produite
                </h1>
                
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Nous nous excusons pour ce désagrément. Une erreur technique inattendue s'est produite. 
                  Veuillez essayer à nouveau ou contactez notre équipe si le problème persiste.
                </p>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Détails de l'erreur (mode développement) :</h3>
                    <pre className="text-xs text-gray-700 overflow-auto max-h-32">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={this.handleRetry} className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Réessayer
                  </Button>
                  
                  <Button variant="outline" onClick={this.handleReload} className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Recharger la page
                  </Button>
                  
                  <Button variant="outline" onClick={this.handleGoHome} className="flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Si le problème persiste, contactez-nous à{' '}
                    <a href="mailto:support@armateur.ca" className="text-blue-600 hover:underline">
                      support@armateur.ca
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component pour afficher une erreur API spécifique
export const ApiErrorDisplay = ({ 
  error, 
  onRetry, 
  onGoBack 
}: { 
  error: string; 
  onRetry?: () => void; 
  onGoBack?: () => void; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16 px-4"
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Erreur de chargement
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {error || "Une erreur s'est produite lors du chargement des données."}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <Button onClick={onRetry} className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        )}
        
        {onGoBack && (
          <Button variant="outline" onClick={onGoBack} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        )}
      </div>
    </motion.div>
  );
};

// Hook personnalisé pour la gestion d'erreurs API
export const useApiError = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleError = (error: any) => {
    console.error('API Error:', error);
    setError(error?.message || "Une erreur s'est produite lors de la communication avec le serveur.");
  };

  const clearError = () => {
    setError(null);
  };

  const retryOperation = async (operation: () => Promise<any>) => {
    setIsRetrying(true);
    setError(null);
    
    try {
      await operation();
    } catch (err) {
      handleError(err);
    } finally {
      setIsRetrying(false);
    }
  };

  return {
    error,
    isRetrying,
    handleError,
    clearError,
    retryOperation,
  };
};