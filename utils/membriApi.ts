import { MEMBRI_CONFIG, buildApiUrl, buildSubmissionUrl, DEFAULT_HEADERS, getEnvironmentConfig } from './config';
import { withRetry, withRetryAndCircuitBreaker, DEFAULT_RETRY_CONFIGS } from './retrySystem';
import { humanizeError, logError } from './errorMessages';

// ===== TYPES BASÉS SUR LA DOCUMENTATION API MEMBRI 365 =====

interface MembriCity {
  ID: string;
  Name: string;
  ProvinceID?: string;
  Province?: string;
  CountryID?: string;
  Country?: string;
}

interface MembriSectorCategory {
  ID: string;
  Name: string;
  Code?: number;
  SubSectors?: MembriSubSector[];
}

interface MembriSubSector {
  ID: string;
  Name: string;
  SectorID: string;
}

interface MembriMembershipPackage {
  ID: string;
  Name: string;
  Description?: string;
  AnnualPrice: number;
  HasAgeLimitForPrimaryContact?: boolean;
  AgeLimitForPrimaryContact?: number;
  HasReducedPriceForNewCompany?: boolean;
  AnnualPriceForNewCompany?: number;
  HasSecondaryPrice?: boolean;
  AnnualPriceForSecondaryContact?: number;
  CanHaveAdditionnalDelegates?: boolean;
  AnnualPriceForAdditionnalDelegate?: number;
  HasReducedPriceForYoungDelegate?: boolean;
  AnnualPriceForYoungDelegate?: number;
  AgeLimitForYoungDelegate?: number;
  HasIncludedDelegates?: boolean;
  NumberOfIncludedDelegates?: number;
  MembershipDuration?: number;
  MaximumNumberOfDelegates?: number;
  IncludedOptions?: string[];
  AdditionnalOptions?: string[];
}

interface MembriMembershipType {
  ID: string;
  Name: string;
  Description?: string;
  Packages: MembriMembershipPackage[];
}

interface MembriEventType {
  ID: string;
  Name: string;
  Description?: string;
  Code?: string;
}

interface MembriTicketType {
  ID: string;
  Name: string;
  Description?: string;
  MemberPrice: number;
  GuestPrice: number;
  TaxIncluded?: boolean;
  Presale?: boolean;
  PresaleEnd?: string;
  ActivitiesIncluded?: string[];
  MainTicketType?: boolean;
}

interface MembriActivity {
  ID: string;
  Name: string;
  Description?: string;
  StartTime: string;
  EndTime: string;
  AvailablePlaces?: number;
}

interface MembriEventSponsor {
  AccountID: string;
  SponsorName: string;
  SponsorType: number;
}

interface MembriEvent {
  ID: string;
  Name: string;
  Description?: string;
  Conditions?: string;
  Type?: MembriEventType;
  OpenToAll?: boolean;
  ReadyForSale?: boolean;
  ParticipantEmailRequired?: boolean;
  StartTime: string;
  EndTime: string;
  Venue?: string;
  Address?: string;
  City?: MembriCity;
  PostalCode?: string;
  SoldOut?: boolean;
  TicketingURL?: string;
  EventPictureID?: string;
  EventPictureURL?: string;
  Activities?: MembriActivity[];
  TicketTypes?: MembriTicketType[];
  Sponsors?: MembriEventSponsor[];
  ShowAllergiesField?: boolean;
  ShowTitleField?: boolean;
  ShowEnterpriseField?: boolean;
  ExternalRessources?: string;
  TicketingStartDate?: string;
  TicketingEndDate?: string;
  HideAnonymousOption?: boolean;
  ValidateUniqueEmailAddress?: boolean;
  AllowClientInvoicing?: boolean;
}

interface MembriContact {
  ID?: string;
  Salutation?: number;
  FirstName: string;
  LastName: string;
  JobTitle?: string;
  Cell?: string;
  Phone?: string;
  Email: string;
  Twitter?: string;
  LinkedIn?: string;
  Intrapreneur?: boolean;
  ShowCellphoneOnWeb?: boolean;
  ShowEmailOnWeb?: boolean;
  ShowSocialMediaOnWeb?: boolean;
}

interface MembriMember {
  ID: string;
  AccountName: string;
  Description?: string;
  MembershipTypeID?: string;
  MainContact?: MembriContact;
  SectorCategory?: MembriSectorCategory;
  SubSector?: MembriSubSector;
  SecondarySector?: MembriSectorCategory;
  SecondarySubSector?: MembriSubSector;
  Address?: string;
  City?: MembriCity;
  PostalCode?: string;
  FoundedOn?: string;
  MemberSince?: string;
  Phone?: string;
  Fax?: string;
  Email?: string;
  Website?: string;
  Facebook?: string;
  Twitter?: string;
  LinkedIn?: string;
  Instagram?: string;
  Youtube?: string;
  LogoURL?: string;
  NbEmployees?: number;
  EnterpriseMission?: string;
  OfferedServices?: string;
  ShowOnWeb?: boolean;
  ShowEmailOnWeb?: boolean;
  ShowAddressOnWeb?: boolean;
  ShowPhoneFaxOnWeb?: boolean;
  ShowSocialMediaOnWeb?: boolean;
  ShowFaxOnWeb?: boolean;
  ShowMainPhoneOnWeb?: boolean;
  Manufacturing?: boolean;
  EnvironmentallyFriendly?: boolean;
  FemaleEntrepreneur?: boolean;
  Delegates?: MembriContact[];
  Options?: string[];
}

interface MembriCreateMembershipRequest {
  MembershipTypeID: string;
  MembershipPackageID: string;
  MainContact: {
    Salutation?: number;
    FirstName: string;
    LastName: string;
    Email?: string;
    Phone?: string;
    Cell?: string;
    JobTitle?: string;
    Gender?: number;
    Language?: number;
    OptInNewsletter: boolean;
    ShowOnWeb?: boolean;
    ShowCellphoneOnWeb?: boolean;
    ShowEmailOnWeb?: boolean;
    Username?: string;
    Password?: string;
  };
  AccountName: string;
  Description?: string;
  Address: string;
  AddressLine2?: string;
  CityID: string;
  PostalCode: string;
  Email: string;
  EmailBilling?: string;
  EmailsCC?: string;
  Phone?: string;
  Fax?: string;
  Website?: string;
  Facebook?: string;
  Twitter?: string;
  LinkedIn?: string;
  Instagram?: string;
  Youtube?: string;
  LogoURL?: string;
  NbEmployees?: number;
  NEQ?: string;
  SectorCategoryID?: string;
  SubSectorID?: string;
  SecondarySectorID?: string;
  SecondarySubSectorID?: string;
  ShowInfoOnWebsite: boolean;
  ShowAddressOnWeb: boolean;
  ShowEmailOnWeb: boolean;
  ShowPhoneOnWeb: boolean;
  ShowSocialMediaOnWeb: boolean;
  AutoRenewal: boolean;
  IsNewCompany?: boolean;
  FoundedOn?: string;
  SelfEmployed?: boolean;
  Exporter?: boolean;
  Manufacturing?: boolean;
  EnvironmentallyFriendly?: boolean;
  FemaleEntrepreneur?: boolean;
  EnterpriseMission?: string;
  Delegates?: MembriContact[];
  OptionsID?: string[];
  IsPaid?: boolean;
  Payment?: {
    Amount: number;
    Method: number;
    Detail: string;
  };
  AccountID?: string;
}

interface MembriCreateMembershipResponse {
  AccountId?: string;
  PaymentURL?: string;
}

// ===== TYPES POUR L'APPLICATION (compatibles avec l'existant) =====

interface Province {
  id?: number;
  ID?: string;
  name?: string;
  Name?: string;
}

interface City {
  id?: number;
  ID?: string;
  name?: string;
  Name?: string;
}

interface MembershipPackage {
  id?: number;
  ID?: string;
  name?: string;
  Name?: string;
  annualPrice?: number;
  AnnualPrice?: number;
  description?: string;
}

interface MembershipType {
  id?: number;
  ID?: string;
  name?: string;
  Name?: string;
  description?: string;
  packages?: MembershipPackage[];
  Packages?: MembershipPackage[];
}

interface SectorCategory {
  id?: number;
  ID?: string;
  name?: string;
  Name?: string;
}

interface Event {
  id?: number;
  ID?: string;
  name?: string;
  Name?: string;
  description?: string;
  Description?: string;
  date?: string;
  Date?: string;
  location?: string;
  Location?: string;
  venue?: string;
  Venue?: string;
  address?: string;
  Address?: string;
  price?: number;
  Price?: number;
  capacity?: number;
  Capacity?: number;
  registeredCount?: number;
  RegisteredCount?: number;
  isActive?: boolean;
  IsActive?: boolean;
  readyForSale?: boolean;
  ReadyForSale?: boolean;
  category?: string;
  Category?: string;
  ticketTypes?: any[];
  TicketTypes?: any[];
  activities?: any[];
  Activities?: any[];
}

interface Member {
  id?: number | string;
  ID?: string;
  name?: string;
  Name?: string;
  firstName?: string;
  FirstName?: string;
  lastName?: string;
  LastName?: string;
  organization?: string;
  Organization?: string;
  accountName?: string;
  AccountName?: string;
  title?: string;
  Title?: string;
  department?: string;
  Department?: string;
  email?: string;
  Email?: string;
  phone?: string;
  Phone?: string;
  website?: string;
  Website?: string;
  address?: string;
  Address?: string;
  city?: string;
  City?: string;
  province?: string;
  Province?: string;
  description?: string;
  Description?: string;
  membershipType?: string;
  MembershipType?: string;
  memberSince?: string;
  MemberSince?: string;
  avatar?: string;
  Avatar?: string;
  verified?: boolean;
  Verified?: boolean;
  featured?: boolean;
  Featured?: boolean;
  sectors?: string[];
  Sectors?: string[];
  services?: string[];
  Services?: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  SocialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  isActive?: boolean;
  IsActive?: boolean;
}

interface MainContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cell: string;
  jobtitle: string;
  showEmailOnWeb: boolean;
  showCellphoneOnWeb: boolean;
}

interface MembershipFormData {
  membershipTypeId: string;
  membershipPackageId: string;
  emailBilling: string;
  accountName: string;
  address: string;
  cityId: string;
  provinceId: string;
  postalCode: string;
  neq: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  showInfoOnWebsite: boolean;
  showAddressOnWeb: boolean;
  showEmailOnWeb: boolean;
  showPhoneOnWeb: boolean;
  showSocialMediaOnWeb: boolean;
  autoRenewal: boolean;
  mainContact: MainContact;
}

// ===== DONNÉES DE DÉMONSTRATION ENRICHIES =====

const DEMO_DATA = {
  provinces: [
    { ID: 'prov-qc', Name: 'Québec' },
    { ID: 'prov-on', Name: 'Ontario' },
    { ID: 'prov-bc', Name: 'Colombie-Britannique' },
    { ID: 'prov-ab', Name: 'Alberta' },
    { ID: 'prov-mb', Name: 'Manitoba' },
    { ID: 'prov-sk', Name: 'Saskatchewan' },
    { ID: 'prov-ns', Name: 'Nouvelle-Écosse' },
    { ID: 'prov-nb', Name: 'Nouveau-Brunswick' },
    { ID: 'prov-pe', Name: 'Île-du-Prince-Édouard' },
    { ID: 'prov-nl', Name: 'Terre-Neuve-et-Labrador' },
    { ID: 'prov-nt', Name: 'Territoires du Nord-Ouest' },
    { ID: 'prov-nu', Name: 'Nunavut' },
    { ID: 'prov-yt', Name: 'Yukon' }
  ] as MembriCity[],

  cities: [
    { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-qc', Name: 'Québec', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-lav', Name: 'Laval', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-gat', Name: 'Gatineau', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-lng', Name: 'Longueuil', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-she', Name: 'Sherbrooke', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-sag', Name: 'Saguenay', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-lev', Name: 'Lévis', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-trv', Name: 'Trois-Rivières', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-ter', Name: 'Terrebonne', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-sjr', Name: 'Saint-Jean-sur-Richelieu', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-rep', Name: 'Repentigny', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-bro', Name: 'Brossard', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-dru', Name: 'Drummondville', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-jer', Name: 'Saint-Jérôme', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-gra', Name: 'Granby', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-bla', Name: 'Blainville', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-shy', Name: 'Saint-Hyacinthe', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-sha', Name: 'Shawinigan', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-ddo', Name: 'Dollard-des-Ormeaux', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-rim', Name: 'Rimouski', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-chi', Name: 'Chicoutimi', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-jon', Name: 'Jonquière', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-sep', Name: 'Sept-Îles', Province: 'Québec', ProvinceID: 'prov-qc' },
    { ID: 'city-bai', Name: 'Baie-Comeau', Province: 'Québec', ProvinceID: 'prov-qc' }
  ] as MembriCity[],

  membershipTypes: [
    {
      ID: 'type-actif',
      Name: 'Membre Actif',
      Description: 'Exclusive aux armateurs (propriétaires de navires)',
      Packages: [
        { 
          ID: 'pkg-actif-std',
          Name: 'Actif Standard',
          Description: 'Tarification basée sur la flotte, facturée ultérieurement',
          AnnualPrice: 0,
          CanHaveAdditionnalDelegates: true,
          AnnualPriceForAdditionnalDelegate: 0,
          MembershipDuration: 1,
          IncludedOptions: [],
          AdditionnalOptions: []
        }
      ]
    },
    {
      ID: 'type-associe',
      Name: 'Membre Associé',
      Description: 'Pour les entreprises du secteur maritime',
      Packages: [
        { 
          ID: 'pkg-associe-std',
          Name: 'Associé Standard',
          Description: 'Cotisation annuelle fixe',
          AnnualPrice: 1500,
          CanHaveAdditionnalDelegates: true,
          AnnualPriceForAdditionnalDelegate: 250,
          MembershipDuration: 1,
          IncludedOptions: [],
          AdditionnalOptions: []
        }
      ]
    },
    {
      ID: 'type-partenaire',
      Name: 'Grand Partenaire',
      Description: 'Pour les grandes entreprises du secteur',
      Packages: [
        {
          ID: 'pkg-partenaire-premium',
          Name: 'Grand Partenaire Premium',
          Description: 'Partenariat premium avec avantages étendus',
          AnnualPrice: 5000,
          CanHaveAdditionnalDelegates: true,
          AnnualPriceForAdditionnalDelegate: 0,
          NumberOfIncludedDelegates: 5,
          HasIncludedDelegates: true,
          MembershipDuration: 1,
          IncludedOptions: [],
          AdditionnalOptions: []
        }
      ]
    }
  ] as MembriMembershipType[],

  sectors: [
    { ID: 'sect-1', Name: 'Transport maritime' },
    { ID: 'sect-2', Name: 'Logistique portuaire' },
    { ID: 'sect-3', Name: 'Services nautiques' },
    { ID: 'sect-4', Name: 'Assurance maritime' },
    { ID: 'sect-5', Name: 'Technologie maritime' },
    { ID: 'sect-6', Name: 'Énergie maritime' },
    { ID: 'sect-7', Name: 'Construction navale' },
    { ID: 'sect-8', Name: 'Services financiers maritimes' },
    { ID: 'sect-9', Name: 'Environnement maritime' },
    { ID: 'sect-10', Name: 'Formation maritime' },
    { ID: 'sect-11', Name: 'Navigation' },
    { ID: 'sect-12', Name: 'Sécurité maritime' },
    { ID: 'sect-13', Name: 'Innovation' },
    { ID: 'sect-14', Name: 'Technologies vertes' },
    { ID: 'sect-15', Name: 'Réglementation' },
    { ID: 'sect-16', Name: 'Cabotage' },
    { ID: 'sect-17', Name: 'Réparation navale' }
  ] as MembriSectorCategory[],

  events: [
    {
      ID: 'event-1',
      Name: 'Conférence Maritime Annuelle 2024',
      Description: 'La plus grande conférence maritime du Québec réunissant tous les acteurs de l\'industrie maritime. Programme riche en contenu avec des conférenciers de renommée internationale.',
      StartTime: '2024-09-15T09:00:00Z',
      EndTime: '2024-09-15T17:00:00Z',
      Venue: 'Centre des congrès de Québec',
      Address: '1000 Rue René-Lévesque E',
      City: { ID: 'city-qc', Name: 'Québec', Province: 'Québec' },
      PostalCode: 'G1R 5T9',
      ReadyForSale: true,
      OpenToAll: false,
      SoldOut: false,
      ParticipantEmailRequired: true,
      TicketTypes: [
        {
          ID: 'ticket-1-member',
          Name: 'Membre - Accès complet',
          Description: 'Accès à toutes les sessions, déjeuner et pause-café inclus',
          MemberPrice: 195,
          GuestPrice: 295,
          TaxIncluded: false,
          MainTicketType: true
        },
        {
          ID: 'ticket-1-student',
          Name: 'Étudiant',
          Description: 'Tarif réduit pour les étudiants avec preuve d\'inscription',
          MemberPrice: 50,
          GuestPrice: 75,
          TaxIncluded: false,
          MainTicketType: false
        }
      ],
      Activities: [
        {
          ID: 'act-1-1',
          Name: 'Session d\'ouverture',
          Description: 'Présentation des enjeux maritimes 2024',
          StartTime: '2024-09-15T09:00:00Z',
          EndTime: '2024-09-15T10:30:00Z'
        },
        {
          ID: 'act-1-2',
          Name: 'Panel - Innovation technologique',
          Description: 'Table ronde sur les nouvelles technologies',
          StartTime: '2024-09-15T11:00:00Z',
          EndTime: '2024-09-15T12:30:00Z'
        }
      ]
    },
    {
      ID: 'event-2',
      Name: 'Formation Sécurité Maritime',
      Description: 'Formation certifiante sur les dernières normes de sécurité maritime internationale. Certification STCW reconnue.',
      StartTime: '2024-08-22T08:00:00Z',
      EndTime: '2024-08-22T17:00:00Z',
      Venue: 'Centre de formation Port de Montréal',
      Address: '2100 Avenue Pierre-Dupuy',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H3C 3R5',
      ReadyForSale: true,
      OpenToAll: true,
      SoldOut: false,
      ParticipantEmailRequired: true,
      TicketTypes: [
        {
          ID: 'ticket-2-formation',
          Name: 'Formation complète',
          Description: 'Formation d\'une journée avec certification',
          MemberPrice: 350,
          GuestPrice: 450,
          TaxIncluded: false,
          MainTicketType: true
        }
      ]
    },
    {
      ID: 'event-3',
      Name: 'Networking Maritime - Cocktail d\'automne',
      Description: 'Événement de réseautage informel pour les professionnels du secteur maritime. Cocktail dînatoire et activités de réseautage.',
      StartTime: '2024-10-10T17:00:00Z',
      EndTime: '2024-10-10T21:00:00Z',
      Venue: 'Yacht Club de Québec',
      Address: '1100 Chemin Saint-Louis',
      City: { ID: 'city-qc', Name: 'Québec', Province: 'Québec' },
      PostalCode: 'G1S 1E5',
      ReadyForSale: true,
      OpenToAll: false,
      SoldOut: false,
      ParticipantEmailRequired: true,
      TicketTypes: [
        {
          ID: 'ticket-3-cocktail',
          Name: 'Cocktail networking',
          Description: 'Accès au cocktail et activités de réseautage',
          MemberPrice: 75,
          GuestPrice: 125,
          TaxIncluded: true,
          MainTicketType: true
        }
      ]
    },
    {
      ID: 'event-4',
      Name: 'Salon Technologie Maritime',
      Description: 'Exposition des dernières innovations technologiques pour l\'industrie maritime. Plus de 50 exposants attendus.',
      StartTime: '2024-11-05T09:00:00Z',
      EndTime: '2024-11-07T17:00:00Z',
      Venue: 'Palais des congrès de Montréal',
      Address: '1001 Place Jean-Paul-Riopelle',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H2Z 1H5',
      ReadyForSale: true,
      OpenToAll: true,
      SoldOut: false,
      ParticipantEmailRequired: false,
      TicketTypes: [
        {
          ID: 'ticket-4-1day',
          Name: 'Accès 1 jour',
          Description: 'Accès au salon pour une journée',
          MemberPrice: 45,
          GuestPrice: 65,
          TaxIncluded: false,
          MainTicketType: false
        },
        {
          ID: 'ticket-4-3days',
          Name: 'Accès 3 jours',
          Description: 'Accès complet au salon',
          MemberPrice: 125,
          GuestPrice: 175,
          TaxIncluded: false,
          MainTicketType: true
        }
      ]
    },
    {
      ID: 'event-5',
      Name: 'Forum Environnement Maritime',
      Description: 'Discussions sur les enjeux environnementaux et le développement durable dans le secteur maritime.',
      StartTime: '2024-12-03T09:00:00Z',
      EndTime: '2024-12-03T16:00:00Z',
      Venue: 'Pavillon Alphonse-Desjardins, Université Laval',
      Address: '2325 Rue de l\'Université',
      City: { ID: 'city-qc', Name: 'Québec', Province: 'Québec' },
      PostalCode: 'G1V 0A6',
      ReadyForSale: true,
      OpenToAll: false,
      SoldOut: false,
      ParticipantEmailRequired: true,
      TicketTypes: [
        {
          ID: 'ticket-5-forum',
          Name: 'Forum environnement',
          Description: 'Accès au forum avec déjeuner inclus',
          MemberPrice: 165,
          GuestPrice: 215,
          TaxIncluded: false,
          MainTicketType: true
        }
      ]
    }
  ] as MembriEvent[],

  members: [
    {
      ID: 'member-1',
      AccountName: 'Port de Québec',
      Description: 'Premier port en eaux profondes de l\'Est du Canada, le Port de Québec est un acteur clé du commerce international.',
      MainContact: {
        FirstName: 'Marie',
        LastName: 'Tremblay',
        JobTitle: 'Directrice des opérations',
        Email: 'marie.tremblay@portquebec.ca',
        Phone: '(418) 555-0123',
        ShowEmailOnWeb: true,
        ShowCellphoneOnWeb: false
      },
      SectorCategory: { ID: 'sect-2', Name: 'Logistique portuaire' },
      Address: '150 Rue Dalhousie',
      City: { ID: 'city-qc', Name: 'Québec', Province: 'Québec' },
      PostalCode: 'G1K 4C4',
      Phone: '(418) 555-0123',
      Email: 'info@portquebec.ca',
      Website: 'https://portquebec.ca',
      MemberSince: '2019-03-15T00:00:00Z',
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      NbEmployees: 125,
      EnterpriseMission: 'Faciliter les échanges commerciaux maritimes et contribuer au développement économique du Québec.',
      OfferedServices: 'Services portuaires, logistique, entreposage, manutention'
    },
    {
      ID: 'member-2',
      AccountName: 'Armateurs Associés',
      Description: 'Compagnie d\'armateurs spécialisée dans le transport maritime commercial avec une flotte moderne.',
      MainContact: {
        FirstName: 'Jean',
        LastName: 'Leblanc',
        JobTitle: 'Capitaine',
        Email: 'j.leblanc@armateurs.ca',
        Phone: '(514) 555-0156',
        ShowEmailOnWeb: true,
        ShowCellphoneOnWeb: true
      },
      SectorCategory: { ID: 'sect-1', Name: 'Transport maritime' },
      Address: '2100 Avenue Pierre-Dupuy',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H3C 3R5',
      Phone: '(514) 555-0156',
      Email: 'info@armateurs.ca',
      Website: 'https://armateurs-associes.ca',
      LinkedIn: 'armateurs-associes',
      MemberSince: '2020-07-22T00:00:00Z',
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      ShowSocialMediaOnWeb: true,
      NbEmployees: 45,
      EnterpriseMission: 'Transport maritime sécuritaire et efficace pour nos clients.',
      OfferedServices: 'Transport maritime, affrètement, services de navigation'
    }
  ] as MembriMember[]
};

class MembriApiService {
  private readonly isDevelopment: boolean;
  private readonly useDemoMode: boolean;
  private orgId: string;
  private envConfig: any;

  constructor() {
    // Utiliser la nouvelle fonction de configuration d'environnement
    this.envConfig = getEnvironmentConfig();
    this.isDevelopment = this.envConfig.isDevelopment;
    // Force le mode démo temporairement pour éviter les erreurs 400
    this.useDemoMode = this.isDevelopment || this.envConfig.forceDemo;
    this.orgId = this.envConfig.orgId;
    
    console.log('🔧 Service Membri initialisé:', {
      environment: this.isDevelopment ? 'Développement' : 'Production',
      mode: this.useDemoMode ? 'Démonstration (hors ligne)' : 'API (en ligne)',
      hostname: this.envConfig.hostname,
      orgId: this.useDemoMode ? 'demo-org-guid' : this.orgId,
      baseUrl: this.envConfig.apiUrl,
      forcedDemo: this.envConfig.forceDemo ? 'Oui (temporaire)' : 'Non'
    });
  }

  private async simulateLatency(min = 200, max = 600): Promise<void> {
    if (!this.useDemoMode) return;
    const delay = Math.random() * (max - min) + min;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  private async makeApiCall(endpoint: string): Promise<any> {
    // En mode démo, retourner directement les données de démonstration
    if (this.useDemoMode) {
      console.log(`📍 Mode démo: Simulation appel API ${endpoint}`);
      await this.simulateLatency();
      
      // Retourner les données de démonstration selon l'endpoint
      if (endpoint.includes('/Member') || endpoint.includes('/Account')) {
        return DEMO_DATA.members;
      }
      if (endpoint.includes('/Event')) {
        return DEMO_DATA.events;
      }
      if (endpoint.includes('/MembershipType')) {
        return DEMO_DATA.membershipTypes;
      }
      if (endpoint.includes('/SectorCategory')) {
        return DEMO_DATA.sectors;
      }
      if (endpoint.includes('/City')) {
        return DEMO_DATA.cities;
      }
      if (endpoint.includes('/Province')) {
        return DEMO_DATA.provinces;
      }
      
      // Retour par défaut
      return [];
    }

    // Utiliser le système de retry avec circuit breaker pour les appels réels
    const circuitBreakerKey = `membri_api_${endpoint.split('/')[1] || 'general'}`;
    
    return withRetryAndCircuitBreaker(async () => {
      const url = `${this.envConfig.apiUrl}${endpoint}?orgId=${this.orgId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
        signal: AbortSignal.timeout(MEMBRI_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        // Log error with context for better debugging
        logError(error, {
          operation: 'membri_api_call',
          component: 'MembriApiService',
          additionalData: {
            endpoint,
            url,
            status: response.status,
            statusText: response.statusText
          }
        });
        throw error;
      }

      const data = await response.json();
      return data;
    }, circuitBreakerKey, 'standard');
  }

  // ===== MÉTHODES PUBLIQUES DE L'API =====

  // Configuration et environnement
  isInDevelopment(): boolean {
    return this.isDevelopment;
  }

  isUsingDemoMode(): boolean {
    return this.useDemoMode;
  }

  getConfig(): any {
    return {
      mode: this.useDemoMode ? 'demo' : 'api',
      environment: this.isDevelopment ? 'development' : 'production',
      orgId: this.orgId,
      hostname: this.envConfig.hostname,
      apiUrl: this.envConfig.apiUrl,
      forceOffline: this.useDemoMode
    };
  }

  // Méthodes pour récupérer les données de base
  async getProvinces(): Promise<Province[]> {
    try {
      const data = await this.makeApiCall('/Province');
      return data || DEMO_DATA.provinces;
    } catch (error) {
      console.warn('Falling back to demo provinces:', error);
      return DEMO_DATA.provinces;
    }
  }

  async getCities(): Promise<City[]> {
    try {
      const data = await this.makeApiCall('/City');
      return data || DEMO_DATA.cities;
    } catch (error) {
      console.warn('Falling back to demo cities:', error);
      return DEMO_DATA.cities;
    }
  }

  async getMembershipTypes(): Promise<MembershipType[]> {
    try {
      const data = await this.makeApiCall('/MembershipType');
      return data || DEMO_DATA.membershipTypes;
    } catch (error) {
      console.warn('Falling back to demo membership types:', error);
      return DEMO_DATA.membershipTypes;
    }
  }

  async getSectorCategories(): Promise<SectorCategory[]> {
    try {
      const data = await this.makeApiCall('/SectorCategory');
      return data || DEMO_DATA.sectors;
    } catch (error) {
      console.warn('Falling back to demo sectors:', error);
      return DEMO_DATA.sectors;
    }
  }

  async getEvents(): Promise<Event[]> {
    try {
      const data = await this.makeApiCall('/Event');
      const events = data || DEMO_DATA.events;
      
      // Filter to only return active events (ReadyForSale = true)
      return events.filter((event: any) => event.ReadyForSale || event.readyForSale);
    } catch (error) {
      console.warn('Falling back to demo events:', error);
      return DEMO_DATA.events.filter(event => event.ReadyForSale);
    }
  }

  async getMembers(): Promise<Member[]> {
    try {
      // Utiliser l'endpoint Account au lieu de Member selon la doc Membri
      const data = await this.makeApiCall('/Account');
      const members = data || DEMO_DATA.members;
      
      // Filter to only return visible members (ShowOnWeb = true) and sort alphabetically
      return members
        .filter((member: any) => member.ShowOnWeb || member.showOnWeb)
        .sort((a: any, b: any) => {
          const nameA = (a.AccountName || a.accountName || a.name || '').toLowerCase();
          const nameB = (b.AccountName || b.accountName || b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
    } catch (error) {
      console.warn('Falling back to demo members:', error);
      return DEMO_DATA.members
        .filter(member => member.ShowOnWeb)
        .sort((a, b) => a.AccountName.localeCompare(b.AccountName));
    }
  }

  async getMemberById(memberId: string): Promise<Member | null> {
    try {
      if (this.useDemoMode) {
        await this.simulateLatency();
        const member = DEMO_DATA.members.find(m => m.ID === memberId);
        return member || null;
      }

      const data = await this.makeApiCall(`/Account/${memberId}`);
      return data || null;
    } catch (error) {
      console.warn(`Error fetching member ${memberId}:`, error);
      
      // Fallback to demo data
      const member = DEMO_DATA.members.find(m => m.ID === memberId);
      return member || null;
    }
  }

  // Soumission d'adhésion
  async submitMembership(formData: MembershipFormData): Promise<{ success: boolean; accountId?: string; paymentUrl?: string; message?: string }> {
    if (this.useDemoMode) {
      console.log('🎭 Mode démo: Simulation soumission adhésion', formData);
      await this.simulateLatency(1000, 2000);
      
      // Simulate success response
      return {
        success: true,
        accountId: `demo-account-${Date.now()}`,
        message: 'Demande d\'adhésion soumise avec succès (mode démonstration)'
      };
    }

    // Utiliser le système de retry critique pour la soumission d'adhésion
    return withRetryAndCircuitBreaker(async () => {
      try {
        // Transform application data to Membri API format
        const membriRequest: MembriCreateMembershipRequest = {
          MembershipTypeID: formData.membershipTypeId,
          MembershipPackageID: formData.membershipPackageId,
          MainContact: {
            FirstName: formData.mainContact.firstName,
            LastName: formData.mainContact.lastName,
            Email: formData.mainContact.email,
            Phone: formData.mainContact.phone,
            Cell: formData.mainContact.cell,
            JobTitle: formData.mainContact.jobtitle,
            OptInNewsletter: true,
            ShowOnWeb: formData.mainContact.showEmailOnWeb,
            ShowCellphoneOnWeb: formData.mainContact.showCellphoneOnWeb,
            ShowEmailOnWeb: formData.mainContact.showEmailOnWeb
          },
          AccountName: formData.accountName,
          Description: formData.description,
          Address: formData.address,
          CityID: formData.cityId,
          PostalCode: formData.postalCode,
          Email: formData.email,
          EmailBilling: formData.emailBilling,
          Phone: formData.phone,
          Website: formData.website,
          NEQ: formData.neq,
          ShowInfoOnWebsite: formData.showInfoOnWebsite,
          ShowAddressOnWeb: formData.showAddressOnWeb,
          ShowEmailOnWeb: formData.showEmailOnWeb,
          ShowPhoneOnWeb: formData.showPhoneOnWeb,
          ShowSocialMediaOnWeb: formData.showSocialMediaOnWeb,
          AutoRenewal: formData.autoRenewal
        };

        const url = buildSubmissionUrl();
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            ...DEFAULT_HEADERS,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(membriRequest),
          signal: AbortSignal.timeout(MEMBRI_CONFIG.TIMEOUT)
        });

        if (!response.ok) {
          const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
          logError(error, {
            operation: 'membership_submission',
            component: 'MembriApiService',
            additionalData: {
              url,
              status: response.status,
              statusText: response.statusText,
              accountName: formData.accountName
            }
          });
          throw error;
        }

        const result: MembriCreateMembershipResponse = await response.json();
        
        return {
          success: true,
          accountId: result.AccountId,
          paymentUrl: result.PaymentURL,
          message: 'Demande d\'adhésion soumise avec succès'
        };

      } catch (error) {
        console.error('Membership submission error:', error);
        
        // Humanize error for user display
        const { message: errorMessage } = humanizeError(error, {
          operation: 'membership_submission',
          component: 'signup_form',
          additionalData: { accountName: formData.accountName }
        });
        
        throw new Error(errorMessage.description);
      }
    }, 'membri_membership_submission', 'critical').catch(error => {
      return {
        success: false,
        message: error.message || 'Erreur lors de la soumission de votre demande d\'adhésion'
      };
    });
  }

  // Méthodes utilitaires
  async testConnection(): Promise<{ connected: boolean; message: string; mode: string }> {
    if (this.useDemoMode) {
      return {
        connected: false,
        message: 'Mode démonstration actif - aucune connexion API réelle',
        mode: 'demo'
      };
    }

    try {
      await this.makeApiCall('/Province');
      return {
        connected: true,
        message: 'Connexion API Membri 365 établie',
        mode: 'api'
      };
    } catch (error) {
      return {
        connected: false,
        message: `Impossible de se connecter à l'API: ${error.message}`,
        mode: 'fallback'
      };
    }
  }

  async getDiagnosticInfo(): Promise<any> {
    const config = this.getConfig();
    
    return {
      environment: config.environment,
      mode: config.mode,
      hostname: config.hostname,
      userAgent: navigator.userAgent.substring(0, 50),
      demoDataAvailable: true,
      networkCallsBlocked: config.forceOffline
    };
  }
}

// Instance singleton exportée
export const membriApi = new MembriApiService();