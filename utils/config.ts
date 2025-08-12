// Configuration pour l'API Membri 365 basée sur la documentation officielle

export const MEMBRI_CONFIG = {
  // URLs de base selon la documentation
  BASE_URL: typeof window !== 'undefined' && window.location.hostname.includes('localhost') 
    ? 'https://cdcapiqa.azurewebsites.net/v1_01'  // Sandbox pour développement
    : 'https://cdcapi.azurewebsites.net/v1_01',   // Production
  
  // GUID d'organisation spécifique pour les Armateurs du Saint-Laurent
  // Ce GUID doit être fourni par Membri 365 pour l'organisation
  ORG_ID: typeof import.meta !== 'undefined' && import.meta.env?.VITE_MEMBRI_ORG_ID || 'ec4fb530-d07a-4e5c-81d2-b238d3ff2adb',
  
  // Timeout pour les appels API
  TIMEOUT: 10000, // 10 secondes
  
  // Endpoints selon la documentation Membri 365
  ENDPOINTS: {
    // Données de référence
    CITIES: '/City',
    SECTOR_CATEGORIES: '/SectorCategory',
    MEMBERSHIP_TYPES: '/MembershipType',
    MEMBERSHIP_OPTIONS: '/MembershipOption',
    
    // Membres et adhésions - Utilisation du bon endpoint
    MEMBERS: '/Account',  // Correction: /Member devient /Account
    MEMBER_BY_ID: (id: string) => `/Account/${id}`,
    MEMBERSHIP_CREATE: '/Membership',
    
    // Événements
    EVENTS: '/Event',
    EVENT_TYPES: '/EventType',
    
    // Autres
    COMMITTEES: '/Committee',
    OFFERS: '/Offer',
    OFFER_CATEGORIES: '/OfferCategory',
    OFFER_TYPES: '/OfferType',
    PICTURES: '/Picture',
    SOLICITATIONS: '/Solicitation',
    
    // Donations (si nécessaire)
    DONATION_CAMPAIGNS: '/Donation/Campaigns',
    DONATION_CREATE: '/Donation'
  }
};

// Headers par défaut selon la documentation
export const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // Note: L'authentification se fait via le paramètre orgId selon la doc
};

// Fonction utilitaire pour construire les URLs d'API
export function buildApiUrl(endpoint: string, params: Record<string, string> = {}): string {
  const url = new URL(endpoint, MEMBRI_CONFIG.BASE_URL);
  
  // Ajouter l'orgId par défaut
  url.searchParams.set('orgId', MEMBRI_CONFIG.ORG_ID);
  
  // Ajouter les paramètres supplémentaires
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  return url.toString();
}

// Fonction utilitaire pour construire les URLs de soumission
export function buildSubmissionUrl(endpoint: string = '/Membership'): string {
  return `${MEMBRI_CONFIG.BASE_URL}${endpoint}`;
}

// Énumérations selon la documentation Membri 365
export const MEMBRI_ENUMS = {
  // Salutations
  SALUTATIONS: {
    M: 282210000,
    MME: 282210001,
    ME: 282210002,
    DR: 282210003,
    DRE: 282210004
  },
  
  // Types de partenaires
  SPONSOR_TYPES: {
    PETIT: 282210000,
    MOYEN: 282210001
  },
  
  // Langues
  LANGUAGES: {
    FRANCAIS: 282210000,
    ANGLAIS: 282210001
  },
  
  // Méthodes de paiement
  PAYMENT_METHODS: {
    VISA: 282210000,
    MASTERCARD: 282210001,
    AMEX: 282210002,
    GLOBAL_PAYMENT: 282210008,
    MONETICO: 282210009,
    STRIPE: 282210013
  },
  
  // Sexe
  GENDER: {
    HOMME: 282210000,
    FEMME: 282210001
  },
  
  // Types de photos
  PICTURE_TYPES: {
    OFFER: 1,
    EVENT: 2
  },
  
  // Tailles de photos
  PICTURE_SIZES: {
    XSMALL: 0,  // 240px wide
    SMALL: 1,   // 270px wide
    MEDIUM: 2,  // 360px wide
    LARGE: 3,   // 540px wide
    XLARGE: 4,  // 720px wide
    ORIGINAL: 5 // >= 720px wide
  },
  
  // Lieu de naissance
  BIRTHPLACE: {
    NE_AU_QUEBEC: 282210000,
    NE_HORS_QUEBEC: 282210001,
    NE_HORS_CANADA: 282210002
  },
  
  // Types de sollicitations
  SOLICITATION_TYPES: {
    PARTENARIAT: 282210000,
    PARTENARIAT_EVENEMENT: 282210001,
    MANDAT: 282210002,
    COMMANDE: 282210003,
    AUTRES: 282210004,
    ADHESION: 282210005,
    RENOUVELLEMENT: 282210006,
    SURCLASSEMENT: 282210007,
    ENTENTE_COMMANDITE: 282210008
  }
};

// Configuration pour l'environnement de développement
export const DEV_CONFIG = {
  ENABLE_LOGGING: true,
  SIMULATE_LATENCY: true,
  MIN_LATENCY: 200,
  MAX_LATENCY: 800,
  DEMO_MODE_FORCE: true // Mode démo forcé pour éviter les erreurs réseau en développement
};

// Utilitaires pour la gestion des dates Membri
export const MEMBRI_DATE_UTILS = {
  // Parser une date au format Membri: /Date(1501434000000)/
  parseDate(membriDateString: string): Date | null {
    if (!membriDateString) return null;
    
    const match = membriDateString.match(/\/Date\((\d+)\)\//);
    if (match) {
      const timestamp = parseInt(match[1]);
      return new Date(timestamp);
    }
    
    // Essayer de parser comme date normale
    try {
      return new Date(membriDateString);
    } catch {
      return null;
    }
  },
  
  // Formatter une date pour Membri
  formatDate(date: Date): string {
    return `/Date(${date.getTime()})/`;
  },
  
  // Convertir une date ISO en format Membri
  isoToMembri(isoString: string): string {
    try {
      const date = new Date(isoString);
      return this.formatDate(date);
    } catch {
      return isoString;
    }
  }
};

// Validation des données selon les règles Membri
export const MEMBRI_VALIDATION = {
  // Valider un GUID
  isValidGuid(value: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(value);
  },
  
  // Valider un email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  // Valider un code postal canadien
  isValidPostalCode(postalCode: string): boolean {
    const canadianPostalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return canadianPostalCodeRegex.test(postalCode);
  },
  
  // Valider un numéro de téléphone
  isValidPhone(phone: string): boolean {
    // Format flexible pour différents formats de téléphone
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  }
};

// Configuration des messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur Membri 365',
  TIMEOUT_ERROR: 'Délai d\'attente dépassé lors de la connexion à Membri 365',
  VALIDATION_ERROR: 'Données invalides selon les critères Membri 365',
  AUTH_ERROR: 'Erreur d\'authentification avec Membri 365',
  NOT_FOUND_ERROR: 'Ressource non trouvée sur Membri 365',
  SERVER_ERROR: 'Erreur interne du serveur Membri 365',
  DEMO_MODE_ACTIVE: 'Mode démonstration actif - aucune donnée réelle ne sera soumise'
};

// Fonction pour obtenir la configuration d'environnement de manière sûre
export function getEnvironmentConfig() {
  // Détection sûre de l'environnement
  const isClient = typeof window !== 'undefined';
  const isDevelopment = isClient && (
    window.location.hostname === 'localhost' ||
    window.location.hostname.includes('stackblitz') ||
    window.location.hostname.includes('webcontainer') ||
    window.location.port === '5173' ||
    window.location.port === '3000'
  );

  // Mode démo désactivé - utilisation de l'API de production
  const forceDemo = DEV_CONFIG.DEMO_MODE_FORCE;
  
  // Force offline si on est en développement ou si forceDemo est activé
  const forceOffline = isDevelopment || forceDemo;

  return {
    isClient,
    isDevelopment,
    hostname: isClient ? window.location.hostname : 'server',
    port: isClient ? window.location.port : null,
    forceDemo,
    forceOffline,
    // Variables d'environnement Vite (disponibles uniquement côté client avec préfixe VITE_)
    orgId: (isClient && typeof import.meta !== 'undefined' && import.meta.env?.VITE_MEMBRI_ORG_ID) || MEMBRI_CONFIG.ORG_ID,
    apiUrl: (isClient && typeof import.meta !== 'undefined' && import.meta.env?.VITE_MEMBRI_API_URL) || MEMBRI_CONFIG.BASE_URL
  };
}

// Export de la configuration par défaut
export default MEMBRI_CONFIG;