import type { StepInfo, AppView } from './form-types';

export const BASE_STEPS: StepInfo[] = [
  {
    id: 1,
    title: "Informations sur l'organisation / le compte",
    description: "Veuillez fournir les informations sur votre entreprise ou organisation.",
  },
  {
    id: 2,
    title: "Choix de la catégorie d'adhésion",
    description: "Sélectionnez la catégorie qui correspond le mieux à votre profil et à vos besoins.",
  },
  {
    id: 3,
    title: "Contact principal",
    description: "Renseignez les informations du contact principal de votre organisation.",
  },
  {
    id: 4,
    title: "Délégués supplémentaires",
    description: "Ajoutez des délégués qui représenteront votre organisation (optionnel).",
  },
];

export const EVENTS_STEP: StepInfo = {
  id: 5,
  title: "Événements et activités",
  description: "Inscrivez-vous aux événements et activités des Armateurs du Saint-Laurent.",
};

export const FINAL_STEP_WITH_EVENTS: StepInfo = {
  id: 6,
  title: "Revue et soumission",
  description: "Vérifiez vos informations et finalisez votre demande d'adhésion.",
};

export const FINAL_STEP_WITHOUT_EVENTS: StepInfo = {
  id: 5,
  title: "Revue et soumission",
  description: "Vérifiez vos informations et finalisez votre demande d'adhésion.",
};

export const getStepTitles = (hasActiveEvents: boolean): StepInfo[] => {
  if (hasActiveEvents) {
    return [...BASE_STEPS, EVENTS_STEP, FINAL_STEP_WITH_EVENTS];
  } else {
    return [...BASE_STEPS, FINAL_STEP_WITHOUT_EVENTS];
  }
};

export const LOADING_MESSAGES: Record<AppView, string> = {
  'website': 'Chargement du site internet',
  'association': 'Chargement de la page association',
  'saint-laurent': 'Chargement des informations du Saint-Laurent',
  'members': 'Chargement de la liste des membres',
  'events': 'Chargement des événements',
  'contact': 'Chargement de la page contact',
  'dossiers': 'Chargement des dossiers et publications',
  'privacy-policy': 'Chargement de la politique de confidentialité',
  'terms': 'Chargement des conditions d\'utilisation',
  'sitemap': 'Chargement du plan du site',
  'member-detail': 'Chargement des informations du membre',
  'signup': 'Configuration du portail d\'inscription',
  'login': 'Configuration de la page de connexion',
  'forgot-password': 'Configuration de la récupération de mot de passe',
  'portal': 'Chargement du portail membre'
};

export const PAGES_NEEDING_SYSTEM_READY: AppView[] = [
  'signup', 
  'website', 
  'association', 
  'saint-laurent', 
  'members', 
  'events', 
  'contact',
  'dossiers',
  'member-detail'
];

// Pages qui n'ont pas besoin du système (pages statiques)
export const STATIC_PAGES: AppView[] = [
  'privacy-policy',
  'terms', 
  'sitemap',
  'login',
  'forgot-password',
  'portal'
];