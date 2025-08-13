/**
 * Système de messages d'erreur personnalisés pour l'application ASL
 * Gère la localisation et la contextualisation des erreurs API et système
 */

export interface ErrorContext {
  operation: string;
  component?: string;
  userId?: string;
  timestamp?: number;
  additionalData?: Record<string, any>;
}

export interface ErrorMessage {
  title: string;
  description: string;
  action?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'validation' | 'auth' | 'server' | 'unknown';
  userFriendly: boolean;
  technicalDetails?: string;
}

export interface ErrorDisplayOptions {
  showTechnicalDetails: boolean;
  showRetryButton: boolean;
  autoHide: boolean;
  hideAfterMs?: number;
  position?: 'top' | 'bottom' | 'center';
}

// Messages d'erreur par catégorie et contexte
const ERROR_MESSAGES: Record<string, Record<string, ErrorMessage>> = {
  // Erreurs réseau
  network: {
    connection_failed: {
      title: 'Problème de connexion',
      description: 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
      action: 'Réessayer dans quelques instants',
      severity: 'medium',
      category: 'network',
      userFriendly: true
    },
    timeout: {
      title: 'Délai d\'attente dépassé',
      description: 'La requête a pris trop de temps à aboutir. Le serveur pourrait être temporairement surchargé.',
      action: 'Réessayer maintenant',
      severity: 'medium',
      category: 'network',
      userFriendly: true
    },
    api_unreachable: {
      title: 'Service temporairement indisponible',
      description: 'Le service Membri 365 est actuellement indisponible. Nous utilisons des données de démonstration.',
      action: 'Le service sera rétabli automatiquement',
      severity: 'high',
      category: 'network',
      userFriendly: true
    }
  },

  // Erreurs d'authentification
  auth: {
    invalid_credentials: {
      title: 'Identifiants incorrects',
      description: 'L\'adresse courriel ou le mot de passe est incorrect.',
      action: 'Vérifier vos informations de connexion',
      severity: 'medium',
      category: 'auth',
      userFriendly: true
    },
    session_expired: {
      title: 'Session expirée',
      description: 'Votre session a expiré pour des raisons de sécurité.',
      action: 'Veuillez vous reconnecter',
      severity: 'medium',
      category: 'auth',
      userFriendly: true
    },
    unauthorized: {
      title: 'Accès non autorisé',
      description: 'Vous n\'avez pas les permissions nécessaires pour accéder à cette fonctionnalité.',
      action: 'Contactez l\'administrateur si nécessaire',
      severity: 'high',
      category: 'auth',
      userFriendly: true
    }
  },

  // Erreurs de validation
  validation: {
    required_field: {
      title: 'Champs obligatoires manquants',
      description: 'Veuillez remplir tous les champs obligatoires marqués d\'un astérisque.',
      action: 'Compléter le formulaire',
      severity: 'low',
      category: 'validation',
      userFriendly: true
    },
    invalid_email: {
      title: 'Adresse courriel invalide',
      description: 'L\'adresse courriel saisie n\'est pas dans un format valide.',
      action: 'Vérifier le format de l\'adresse courriel',
      severity: 'low',
      category: 'validation',
      userFriendly: true
    },
    duplicate_email: {
      title: 'Adresse courriel déjà utilisée',
      description: 'Cette adresse courriel est déjà associée à un compte existant.',
      action: 'Utiliser une autre adresse ou se connecter',
      severity: 'medium',
      category: 'validation',
      userFriendly: true
    },
    invalid_phone: {
      title: 'Numéro de téléphone invalide',
      description: 'Le numéro de téléphone saisi n\'est pas dans un format valide.',
      action: 'Utiliser le format (XXX) XXX-XXXX',
      severity: 'low',
      category: 'validation',
      userFriendly: true
    }
  },

  // Erreurs serveur
  server: {
    internal_error: {
      title: 'Erreur interne du serveur',
      description: 'Une erreur technique est survenue. Notre équipe technique a été notifiée.',
      action: 'Réessayer dans quelques minutes',
      severity: 'high',
      category: 'server',
      userFriendly: true
    },
    maintenance: {
      title: 'Maintenance en cours',
      description: 'Le système est temporairement en maintenance pour des améliorations.',
      action: 'Service rétabli sous peu',
      severity: 'medium',
      category: 'server',
      userFriendly: true
    },
    rate_limit: {
      title: 'Trop de requêtes',
      description: 'Vous avez effectué trop de requêtes rapidement. Veuillez patienter.',
      action: 'Attendre quelques secondes avant de réessayer',
      severity: 'low',
      category: 'server',
      userFriendly: true
    }
  },

  // Erreurs spécifiques aux opérations
  operations: {
    membership_submission_failed: {
      title: 'Échec de soumission',
      description: 'Votre demande d\'adhésion n\'a pas pu être soumise. Aucune donnée n\'a été perdue.',
      action: 'Réessayer la soumission',
      severity: 'high',
      category: 'server',
      userFriendly: true
    },
    data_fetch_failed: {
      title: 'Chargement des données impossible',
      description: 'Impossible de charger les données demandées.',
      action: 'Actualiser la page',
      severity: 'medium',
      category: 'network',
      userFriendly: true
    },
    search_failed: {
      title: 'Recherche échouée',
      description: 'La recherche n\'a pas pu être effectuée.',
      action: 'Réessayer avec d\'autres critères',
      severity: 'low',
      category: 'server',
      userFriendly: true
    }
  }
};

// Messages d'erreur par contexte d'utilisation
const CONTEXTUAL_ERROR_MESSAGES: Record<string, Record<string, Partial<ErrorMessage>>> = {
  signup: {
    network_error: {
      title: 'Problème lors de l\'inscription',
      description: 'Impossible de soumettre votre demande d\'adhésion actuellement.',
      action: 'Vos données sont sauvegardées, réessayez dans un moment'
    }
  },
  
  login: {
    network_error: {
      title: 'Connexion impossible',
      description: 'Impossible de vous connecter au portail membre.',
      action: 'Vérifiez votre connexion et réessayez'
    }
  },
  
  member_directory: {
    network_error: {
      title: 'Répertoire indisponible',
      description: 'Impossible de charger le répertoire des membres.',
      action: 'Les données seront mises à jour automatiquement'
    }
  },
  
  events: {
    network_error: {
      title: 'Événements indisponibles',
      description: 'Impossible de charger la liste des événements.',
      action: 'Consultez notre site web pour les derniers événements'
    }
  }
};

/**
 * Obtient un message d'erreur personnalisé selon le contexte
 */
export function getErrorMessage(
  errorType: string,
  context: ErrorContext,
  fallbackMessage?: string
): ErrorMessage {
  const category = categorizeError(errorType);
  const contextKey = context.component || context.operation;
  
  // Chercher d'abord un message contextuel
  const contextualMessage = CONTEXTUAL_ERROR_MESSAGES[contextKey]?.[category];
  const baseMessage = ERROR_MESSAGES[category]?.[errorType] || ERROR_MESSAGES[category]?.['generic'];
  
  // Fusionner le message de base avec les adaptations contextuelles
  const message: ErrorMessage = {
    title: 'Erreur inattendue',
    description: fallbackMessage || 'Une erreur inattendue s\'est produite.',
    severity: 'medium',
    category: 'unknown',
    userFriendly: false,
    ...baseMessage,
    ...contextualMessage
  };

  // Ajouter les détails techniques si disponibles
  if (context.additionalData?.technicalError) {
    message.technicalDetails = context.additionalData.technicalError;
  }

  return message;
}

/**
 * Catégorise une erreur selon son type
 */
function categorizeError(errorType: string): string {
  const type = errorType.toLowerCase();
  
  if (type.includes('network') || type.includes('connection') || type.includes('fetch')) {
    return 'network';
  }
  
  if (type.includes('auth') || type.includes('unauthorized') || type.includes('forbidden')) {
    return 'auth';
  }
  
  if (type.includes('validation') || type.includes('invalid') || type.includes('required')) {
    return 'validation';
  }
  
  if (type.includes('server') || type.includes('internal') || type.includes('500')) {
    return 'server';
  }
  
  return 'unknown';
}

/**
 * Convertit une erreur technique en message utilisateur
 */
export function humanizeError(
  error: any,
  context: ErrorContext,
  options: Partial<ErrorDisplayOptions> = {}
): {
  message: ErrorMessage;
  displayOptions: ErrorDisplayOptions;
} {
  let errorType = 'unknown_error';
  let technicalError = '';

  try {
    // Analyser l'erreur pour déterminer le type
    if (error?.message) {
      technicalError = error.message;
      
      if (error.message.includes('Network')) {
        errorType = 'connection_failed';
      } else if (error.message.includes('timeout')) {
        errorType = 'timeout';
      } else if (error.message.includes('401')) {
        errorType = 'unauthorized';
      } else if (error.message.includes('403')) {
        errorType = 'unauthorized';
      } else if (error.message.includes('429')) {
        errorType = 'rate_limit';
      } else if (error.message.includes('500')) {
        errorType = 'internal_error';
      }
    }

    if (error?.status) {
      switch (error.status) {
        case 401:
        case 403:
          errorType = 'unauthorized';
          break;
        case 429:
          errorType = 'rate_limit';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorType = 'internal_error';
          break;
      }
    }
  } catch {
    // Garder les valeurs par défaut
  }

  const message = getErrorMessage(errorType, {
    ...context,
    additionalData: {
      ...context.additionalData,
      technicalError
    }
  });

  const displayOptions: ErrorDisplayOptions = {
    showTechnicalDetails: false,
    showRetryButton: true,
    autoHide: message.severity === 'low',
    hideAfterMs: message.severity === 'low' ? 5000 : undefined,
    position: 'top',
    ...options
  };

  return { message, displayOptions };
}

/**
 * Crée un message d'erreur personnalisé
 */
export function createCustomErrorMessage(
  title: string,
  description: string,
  severity: ErrorMessage['severity'] = 'medium',
  action?: string
): ErrorMessage {
  return {
    title,
    description,
    action,
    severity,
    category: 'unknown',
    userFriendly: true
  };
}

/**
 * Messages d'erreur pour les différentes langues (extensibilité future)
 */
export const ERROR_MESSAGES_FR = ERROR_MESSAGES; // Français par défaut

// Structure pour l'anglais (pour extension future)
export const ERROR_MESSAGES_EN: typeof ERROR_MESSAGES = {
  network: {
    connection_failed: {
      title: 'Connection Problem',
      description: 'Unable to connect to the server. Please check your internet connection.',
      action: 'Try again in a few moments',
      severity: 'medium',
      category: 'network',
      userFriendly: true
    }
    // ... autres messages en anglais
  }
  // ... autres catégories
};

/**
 * Utilitaire pour logger les erreurs avec contexte
 */
export function logError(
  error: any,
  context: ErrorContext,
  message?: ErrorMessage
) {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    error: {
      message: error?.message,
      stack: error?.stack,
      status: error?.status
    },
    context,
    userMessage: message
  };

  console.error('🔴 Erreur application ASL:', logData);
  
  // En production, envoyer à un service de monitoring
  if (process.env.NODE_ENV === 'production') {
    // Intégration future avec Sentry, LogRocket, etc.
  }
}

/**
 * Hook React pour gérer les erreurs dans les composants
 */
export function useErrorHandler() {
  return {
    getErrorMessage,
    humanizeError,
    createCustomErrorMessage,
    logError
  };
}