import { membriApi } from './membriApi';
import type { 
  MembershipFormData, 
  MembershipType, 
  City, 
  SectorCategory,
  Event 
} from './membriApi';

// Interface pour les données complètes du formulaire d'inscription
export interface CompleteFormData extends MembershipFormData {
  // Champs supplémentaires du formulaire d'inscription ASL
  addressLine2: string;
  provinceId: string;
  neq: string;
  fax: string;
  employeeCount: string;
  yearFounded: string;
  sectorId: string;
  isNewBusiness: boolean;
  isSelfEmployed: boolean;
  isExporter: boolean;
  isManufacturer: boolean;
  showFaxOnWeb: boolean;
  showWebsiteOnWeb: boolean;
  showDescriptionOnWeb: boolean;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  bronzeSponsorship: boolean;
  silverSponsorship: boolean;
  goldSponsorship: boolean;
  platinumSponsorship: boolean;
  
  mainContact: {
    civility: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cell: string;
    jobtitle: string;
    department: string;
    showEmailOnWeb: boolean;
    showPhoneOnWeb: boolean;
    showCellphoneOnWeb: boolean;
  };
  
  delegates: Array<{
    civility: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cell: string;
    jobtitle: string;
    department: string;
  }>;
  
  selectedEvents: Array<{
    eventId: string;
    attendeeCount: number;
    specialRequests?: string;
  }>;
  
  billingContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
  };
  
  finalConsent: boolean;
  marketingConsent: boolean;
  newsletterSubscription: boolean;
}

// Interface pour la réponse de soumission
export interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  accountId?: string;
  paymentUrl?: string;
  errors?: string[];
  data?: any;
}

// Service d'API pour l'adhésion utilisant Membri 365
class MembershipApiService {
  
  /**
   * Récupère les types d'adhésion disponibles
   */
  async getMembershipTypes(): Promise<MembershipType[]> {
    try {
      console.log('📋 Chargement des types d\'adhésion...');
      const membershipTypes = await membriApi.fetchMembershipTypes();
      console.log(`✅ ${membershipTypes.length} types d'adhésion chargés`);
      return membershipTypes;
    } catch (error) {
      console.error('❌ Erreur lors du chargement des types d\'adhésion:', error);
      throw new Error('Impossible de charger les types d\'adhésion');
    }
  }

  /**
   * Récupère la liste des villes disponibles
   */
  async getCities(): Promise<City[]> {
    try {
      console.log('🏙️ Chargement des villes...');
      const cities = await membriApi.fetchCities();
      console.log(`✅ ${cities.length} villes chargées`);
      return cities;
    } catch (error) {
      console.error('❌ Erreur lors du chargement des villes:', error);
      throw new Error('Impossible de charger la liste des villes');
    }
  }

  /**
   * Récupère la liste des secteurs d'activité
   */
  async getSectorCategories(): Promise<SectorCategory[]> {
    try {
      console.log('🏭 Chargement des secteurs d\'activité...');
      const sectors = await membriApi.fetchSectorCategories();
      console.log(`✅ ${sectors.length} secteurs chargés`);
      return sectors;
    } catch (error) {
      console.error('❌ Erreur lors du chargement des secteurs:', error);
      throw new Error('Impossible de charger les secteurs d\'activité');
    }
  }

  /**
   * Récupère les événements actifs disponibles pour inscription
   */
  async getActiveEvents(): Promise<Event[]> {
    try {
      console.log('📅 Chargement des événements actifs...');
      const events = await membriApi.fetchActiveEvents();
      console.log(`✅ ${events.length} événements actifs chargés`);
      return events;
    } catch (error) {
      console.error('❌ Erreur lors du chargement des événements:', error);
      throw new Error('Impossible de charger les événements');
    }
  }

  /**
   * Valide les données du formulaire avant soumission
   */
  validateFormData(formData: CompleteFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validation des champs obligatoires de base
    if (!formData.accountName?.trim()) {
      errors.push('Le nom de l\'organisation est obligatoire');
    }

    if (!formData.address?.trim()) {
      errors.push('L\'adresse est obligatoire');
    }

    if (!formData.cityId) {
      errors.push('La ville est obligatoire');
    }

    if (!formData.postalCode?.trim()) {
      errors.push('Le code postal est obligatoire');
    }

    if (!formData.email?.trim()) {
      errors.push('L\'adresse courriel est obligatoire');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('L\'adresse courriel n\'est pas valide');
    }

    if (!formData.phone?.trim()) {
      errors.push('Le numéro de téléphone est obligatoire');
    }

    // Validation des types d'adhésion
    if (!formData.membershipTypeId) {
      errors.push('Le type d\'adhésion est obligatoire');
    }

    if (!formData.membershipPackageId) {
      errors.push('Le forfait d\'adhésion est obligatoire');
    }

    if (!formData.emailBilling?.trim()) {
      errors.push('L\'adresse courriel de facturation est obligatoire');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailBilling)) {
      errors.push('L\'adresse courriel de facturation n\'est pas valide');
    }

    // Validation du contact principal
    if (!formData.mainContact.firstName?.trim()) {
      errors.push('Le prénom du contact principal est obligatoire');
    }

    if (!formData.mainContact.lastName?.trim()) {
      errors.push('Le nom du contact principal est obligatoire');
    }

    if (!formData.mainContact.email?.trim()) {
      errors.push('L\'adresse courriel du contact principal est obligatoire');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mainContact.email)) {
      errors.push('L\'adresse courriel du contact principal n\'est pas valide');
    }

    // Validation des délégués (si présents)
    formData.delegates.forEach((delegate, index) => {
      if (delegate.firstName || delegate.lastName || delegate.email) {
        if (!delegate.firstName?.trim()) {
          errors.push(`Le prénom du délégué ${index + 1} est obligatoire`);
        }
        if (!delegate.lastName?.trim()) {
          errors.push(`Le nom du délégué ${index + 1} est obligatoire`);
        }
        if (!delegate.email?.trim()) {
          errors.push(`L'adresse courriel du délégué ${index + 1} est obligatoire`);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delegate.email)) {
          errors.push(`L'adresse courriel du délégué ${index + 1} n'est pas valide`);
        }
      }
    });

    // Validation du code postal canadien
    if (formData.postalCode && !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(formData.postalCode)) {
      errors.push('Le format du code postal n\'est pas valide (format canadien requis)');
    }

    // Validation du consentement final
    if (!formData.finalConsent) {
      errors.push('Vous devez accepter les conditions pour soumettre votre demande');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Prépare les données pour l'envoi à l'API Membri 365
   */
  private prepareDataForSubmission(formData: CompleteFormData): MembershipFormData {
    // Mapper les données du formulaire complet vers le format attendu par Membri
    return {
      membershipTypeId: formData.membershipTypeId,
      membershipPackageId: formData.membershipPackageId,
      emailBilling: formData.emailBilling,
      accountName: formData.accountName,
      address: formData.address,
      cityId: formData.cityId,
      provinceId: formData.provinceId,
      postalCode: formData.postalCode,
      neq: formData.neq,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      description: formData.description,
      showInfoOnWebsite: formData.showInfoOnWebsite,
      showAddressOnWeb: formData.showAddressOnWeb,
      showEmailOnWeb: formData.showEmailOnWeb,
      showPhoneOnWeb: formData.showPhoneOnWeb,
      showSocialMediaOnWeb: formData.showSocialMediaOnWeb,
      autoRenewal: formData.autoRenewal,
      mainContact: {
        firstName: formData.mainContact.firstName,
        lastName: formData.mainContact.lastName,
        email: formData.mainContact.email,
        phone: formData.mainContact.phone,
        cell: formData.mainContact.cell,
        jobtitle: formData.mainContact.jobtitle,
        showEmailOnWeb: formData.mainContact.showEmailOnWeb,
        showCellphoneOnWeb: formData.mainContact.showCellphoneOnWeb
      }
    };
  }

  /**
   * Soumet la demande d'adhésion à Membri 365
   */
  async submitMembership(formData: CompleteFormData): Promise<SubmissionResponse> {
    try {
      console.log('📤 Début de la soumission d\'adhésion...');

      // Validation des données
      const validation = this.validateFormData(formData);
      if (!validation.isValid) {
        console.log('❌ Données invalides:', validation.errors);
        return {
          success: false,
          message: 'Les données soumises contiennent des erreurs',
          errors: validation.errors
        };
      }

      // Préparation des données pour Membri
      const membershipData = this.prepareDataForSubmission(formData);
      
      console.log('🔄 Envoi des données à Membri 365...');
      
      // Appel à l'API Membri 365
      const result = await membriApi.createMembership(membershipData);

      if (result.success) {
        console.log('✅ Adhésion soumise avec succès:', result);
        
        // Déterminer le message de succès approprié
        let successMessage = 'Votre demande d\'adhésion a été soumise avec succès.';
        
        if (result.paymentUrl) {
          successMessage += ' Vous allez être redirigé vers la page de paiement.';
        } else {
          successMessage += ' Elle sera examinée par notre équipe et vous recevrez une confirmation par courriel.';
        }

        return {
          success: true,
          message: successMessage,
          accountId: result.accountId,
          paymentUrl: result.paymentUrl,
          submissionId: result.accountId,
          data: result
        };
      } else {
        console.log('❌ Échec de la soumission:', result.error);
        return {
          success: false,
          message: result.error || 'Une erreur est survenue lors de la soumission',
          errors: result.error ? [result.error] : ['Erreur inconnue']
        };
      }

    } catch (error) {
      console.error('❌ Erreur fatale lors de la soumission:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      
      return {
        success: false,
        message: 'Une erreur technique est survenue lors de la soumission',
        errors: [errorMessage]
      };
    }
  }

  /**
   * Obtient les informations de configuration du service
   */
  getServiceInfo() {
    return {
      ...membriApi.getConfig(),
      apiVersion: 'v1_01',
      supportedFeatures: [
        'membership-creation',
        'city-lookup',
        'sector-categories',
        'membership-types',
        'event-registration'
      ]
    };
  }

  /**
   * Vérifie la disponibilité du service
   */
  async checkServiceHealth(): Promise<{ available: boolean; mode: string; details: any }> {
    try {
      const dataSource = membriApi.getDataSource();
      const config = membriApi.getConfig();
      
      return {
        available: true,
        mode: config.mode,
        details: {
          environment: config.environment,
          orgId: config.orgId,
          dataSource: dataSource
        }
      };
    } catch (error) {
      return {
        available: false,
        mode: 'error',
        details: {
          error: error instanceof Error ? error.message : 'Erreur inconnue'
        }
      };
    }
  }
}

// Export de l'instance singleton
export const membershipApi = new MembershipApiService();

// Export des types
export type {
  CompleteFormData as FormData,
  SubmissionResponse,
  MembershipType,
  City,
  SectorCategory,
  Event
};

// Export par défaut
export default membershipApi;