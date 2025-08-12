import { MEMBRI_CONFIG, buildApiUrl, buildSubmissionUrl, DEFAULT_HEADERS, getEnvironmentConfig } from './config';

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
      ParticipantEmailRequired: true
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
      ParticipantEmailRequired: true
    }
  ] as MembriEvent[],

  members: [
    {
      ID: 'member-csl',
      AccountName: 'Canada Steamship Lines',
      Description: 'Leader du transport maritime au Canada depuis plus d\'un siècle, CSL opère une flotte moderne de vraquiers autovideurs et de navires de charge générale sur les Grands Lacs et le fleuve Saint-Laurent.',
      MemberSince: '1936-01-01',
      Address: '759 Victoria Square',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H2Y 2J7',
      Phone: '514-982-3800',
      Email: 'info@cslships.com',
      Website: 'https://www.cslships.com',
      SectorCategory: { ID: 'sect-1', Name: 'Transport maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-algoma',
      AccountName: 'Algoma Central Corporation',
      Description: 'Propriétaire et exploitant de la plus grande flotte de vraquiers des Grands Lacs au Canada. Algoma transporte des matières premières essentielles à l\'économie canadienne.',
      MemberSince: '1945-03-15',
      Address: '63 Church Street',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H9S 4L2',
      Phone: '705-649-2411',
      Email: 'info@algonet.com',
      Website: 'https://www.algonet.com',
      SectorCategory: { ID: 'sect-1', Name: 'Transport maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-lowerlakes',
      AccountName: 'Lower Lakes Towing Ltd.',
      Description: 'Spécialisé dans le transport de vrac sec sur les Grands Lacs et la Voie maritime du Saint-Laurent, avec une flotte de navires modernes et efficaces.',
      MemberSince: '1962-07-10',
      Address: '185 Ouellette Ave',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'N9A 6Z4',
      Phone: '519-256-5681',
      Email: 'info@lowerlakes.com',
      Website: 'https://www.lowerlakes.com',
      SectorCategory: { ID: 'sect-1', Name: 'Transport maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-mckeil',
      AccountName: 'McKeil Marine Limited',
      Description: 'Entreprise familiale offrant des services de transport maritime, de remorquage et de services portuaires sur les Grands Lacs et la Voie maritime.',
      MemberSince: '1980-11-22',
      Address: '234 Main Street W',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'L8N 1H8',
      Phone: '905-549-5002',
      Email: 'info@mckeilmarine.com',
      Website: 'https://www.mckeilmarine.com',
      SectorCategory: { ID: 'sect-3', Name: 'Services nautiques' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-fednav',
      AccountName: 'Fednav Limited',
      Description: 'Armateur international spécialisé dans le transport de vrac sec, opérant une flotte mondiale avec une forte expertise dans la navigation arctique.',
      MemberSince: '1944-05-08',
      Address: '1000 Sherbrooke St W',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H3A 3G4',
      Phone: '514-878-6500',
      Email: 'info@fednav.com',
      Website: 'https://www.fednav.com',
      SectorCategory: { ID: 'sect-1', Name: 'Transport maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-oceanex',
      AccountName: 'Oceanex Inc.',
      Description: 'Service de transport maritime régulier entre le Canada atlantique et Terre-Neuve, transportant marchandises et véhicules.',
      MemberSince: '1993-09-12',
      Address: '4 Dundas Street',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'B3L 4S1',
      Phone: '709-570-0626',
      Email: 'info@oceanex.com',
      Website: 'https://www.oceanex.com',
      SectorCategory: { ID: 'sect-1', Name: 'Transport maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-servmarine',
      AccountName: 'Servmarine Inc.',
      Description: 'Services maritimes spécialisés incluant la manutention portuaire, l\'arrimage et les services aux navires dans les ports du Saint-Laurent.',
      MemberSince: '1971-03-18',
      Address: '850 Place D\'Youville',
      City: { ID: 'city-qc', Name: 'Québec', Province: 'Québec' },
      PostalCode: 'G1R 3P4',
      Phone: '418-648-9100',
      Email: 'info@servmarine.com',
      Website: 'https://www.servmarine.com',
      SectorCategory: { ID: 'sect-2', Name: 'Logistique portuaire' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-logistecplus',
      AccountName: 'Logistec Plus Inc.',
      Description: 'Services logistiques intégrés et manutention portuaire spécialisée dans les produits forestiers et les marchandises diverses.',
      MemberSince: '1985-06-30',
      Address: '360 Saint-Jacques Street',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H2Y 1P5',
      Phone: '514-985-2345',
      Email: 'info@logistec.com',
      Website: 'https://www.logistec.com',
      SectorCategory: { ID: 'sect-2', Name: 'Logistique portuaire' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-marimarine',
      AccountName: 'Marimarine Services Ltd.',
      Description: 'Services aux navires et expertise maritime incluant l\'inspection, la consultation et les services techniques spécialisés.',
      MemberSince: '1992-12-05',
      Address: '55 Place Charles Le Moyne',
      City: { ID: 'city-lng', Name: 'Longueuil', Province: 'Québec' },
      PostalCode: 'J4K 0A7',
      Phone: '450-646-2000',
      Email: 'info@marimarine.ca',
      Website: 'https://www.marimarine.ca',
      SectorCategory: { ID: 'sect-3', Name: 'Services nautiques' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-technav',
      AccountName: 'Technav Marine Solutions',
      Description: 'Solutions technologiques innovantes pour l\'industrie maritime, incluant systèmes de navigation, télécommunications et automatisation.',
      MemberSince: '2001-04-15',
      Address: '125 Rue Saint-Paul',
      City: { ID: 'city-qc', Name: 'Québec', Province: 'Québec' },
      PostalCode: 'G1K 3W2',
      Phone: '418-692-1234',
      Email: 'info@technav.ca',
      Website: 'https://www.technav.ca',
      SectorCategory: { ID: 'sect-5', Name: 'Technologie maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-assurmar',
      AccountName: 'AssurMar Maritime Insurance',
      Description: 'Courtier spécialisé en assurance maritime offrant une couverture complète pour navires, cargaisons et responsabilité maritime.',
      MemberSince: '1998-08-20',
      Address: '2000 McGill College',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H3A 3H3',
      Phone: '514-287-9595',
      Email: 'info@assurmar.ca',
      Website: 'https://www.assurmar.ca',
      SectorCategory: { ID: 'sect-4', Name: 'Assurance maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-navcan',
      AccountName: 'Navigation Canadienne Ltd.',
      Description: 'Services de pilotage maritime et expertise nautique pour la navigation sécuritaire sur le fleuve Saint-Laurent.',
      MemberSince: '1954-02-28',
      Address: '475 Rue de la Gauchetière O',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H2Z 1X6',
      Phone: '514-496-8500',
      Email: 'info@navcan.ca',
      Website: 'https://www.navcan.ca',
      SectorCategory: { ID: 'sect-11', Name: 'Navigation' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-ecomar',
      AccountName: 'EcoMarine Environmental',
      Description: 'Solutions environnementales maritimes, gestion des déchets de navires et services de protection environnementale portuaire.',
      MemberSince: '2005-11-10',
      Address: '750 Marcel-Laurin',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H4M 2M4',
      Phone: '514-336-8877',
      Email: 'info@ecomarine.ca',
      Website: 'https://www.ecomarine.ca',
      SectorCategory: { ID: 'sect-9', Name: 'Environnement maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-formations',
      AccountName: 'Institut Maritime du Québec',
      Description: 'Formation maritime professionnelle, certification STCW et programmes spécialisés pour l\'industrie du transport maritime.',
      MemberSince: '1967-09-01',
      Address: '53 Rue Saint-Germain E',
      City: { ID: 'city-rim', Name: 'Rimouski', Province: 'Québec' },
      PostalCode: 'G5L 1A1',
      Phone: '418-724-2822',
      Email: 'info@imq.ca',
      Website: 'https://www.imq.ca',
      SectorCategory: { ID: 'sect-10', Name: 'Formation maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-securimar',
      AccountName: 'SecuriMar Safety Systems',
      Description: 'Équipements de sécurité maritime, systèmes de sauvetage et services d\'inspection de conformité aux normes internationales.',
      MemberSince: '1995-05-25',
      Address: '1200 Avenue Papineau',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H2K 4R5',
      Phone: '514-522-6789',
      Email: 'info@securimar.ca',
      Website: 'https://www.securimar.ca',
      SectorCategory: { ID: 'sect-12', Name: 'Sécurité maritime' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-innov',
      AccountName: 'InnovMarine Technologies',
      Description: 'Recherche et développement en technologies marines, solutions IoT pour navires et systèmes de surveillance maritime intelligents.',
      MemberSince: '2010-03-12',
      Address: '3333 Université Street',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H3A 2A5',
      Phone: '514-398-4455',
      Email: 'info@innovmarine.ca',
      Website: 'https://www.innovmarine.ca',
      SectorCategory: { ID: 'sect-13', Name: 'Innovation' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-greenships',
      AccountName: 'GreenShips Solutions',
      Description: 'Technologies vertes pour l\'industrie maritime, systèmes de propulsion écologiques et solutions de réduction des émissions.',
      MemberSince: '2015-07-08',
      Address: '600 Rue de la Montagne',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H3G 1Y5',
      Phone: '514-845-3333',
      Email: 'info@greenships.ca',
      Website: 'https://www.greenships.ca',
      SectorCategory: { ID: 'sect-14', Name: 'Technologies vertes' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    },
    {
      ID: 'member-regulatory',
      AccountName: 'Regulatory Marine Consulting',
      Description: 'Conseil en réglementation maritime, aide à la conformité internationale et représentation auprès des organismes gouvernementaux.',
      MemberSince: '2003-12-01',
      Address: '1010 Sherbrooke Street W',
      City: { ID: 'city-mtl', Name: 'Montréal', Province: 'Québec' },
      PostalCode: 'H3A 2R7',
      Phone: '514-934-1934',
      Email: 'info@regmarine.ca',
      Website: 'https://www.regmarine.ca',
      SectorCategory: { ID: 'sect-15', Name: 'Réglementation' },
      ShowOnWeb: true,
      ShowEmailOnWeb: true,
      ShowAddressOnWeb: true,
      ShowPhoneFaxOnWeb: true,
      isActive: true
    }
  ] as MembriMember[]
};

// ===== CLASSE API MEMBRI =====

class MembriApiService {
  private config: any;
  private isDemoMode: boolean = false;

  constructor() {
    this.config = getEnvironmentConfig();
    console.log('🔧 MembriApiService initialized:', this.config);
  }

  // Getter pour la configuration
  getConfig() {
    return {
      ...this.config,
      baseUrl: MEMBRI_CONFIG.BASE_URL,
      orgId: MEMBRI_CONFIG.ORG_ID,
      mode: this.isDemoMode ? 'demo' : 'production',
      endpoints: MEMBRI_CONFIG.ENDPOINTS
    };
  }

  // Méthode pour déterminer si on est en développement
  isInDevelopment(): boolean {
    return this.config.isDevelopment;
  }

  // Test de connexion à l'API
  async testConnection(): Promise<boolean> {
    // En mode développement, forcer le mode démo pour éviter les erreurs réseau
    if (this.config.isDevelopment || this.config.forceOffline || this.config.forceDemo) {
      console.log('🔧 Development/Demo mode detected, using demo data');
      this.isDemoMode = true;
      return false;
    }

    try {
      console.log('🔍 Testing API connection...');
      
      // Test simple avec timeout réduit et gestion d'erreur robuste
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500); // Timeout encore plus court
      
      const testUrl = buildApiUrl(MEMBRI_CONFIG.ENDPOINTS.CITIES, { limit: '1' });
      console.log('🌐 Test URL:', testUrl);
      
      // Utiliser une approche plus robuste pour éviter les "Failed to fetch"
      const response = await Promise.race([
        fetch(testUrl, {
          method: 'GET',
          headers: DEFAULT_HEADERS,
          signal: controller.signal,
          mode: 'cors', // Explicitement définir le mode CORS
          cache: 'no-cache'
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 1500)
        )
      ]);
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log('✅ API connection successful');
        this.isDemoMode = false;
        return true;
      } else {
        console.warn(`⚠️ API responded with status ${response.status}, switching to demo mode`);
        this.isDemoMode = true;
        return false;
      }
    } catch (error) {
      const errorMessage = error?.message || 'Unknown error';
      
      if (error?.name === 'AbortError' || errorMessage.includes('timeout')) {
        console.warn('⏱️ API connection timeout, switching to demo mode');
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        console.warn('🌐 Network error detected, switching to demo mode');
      } else {
        console.warn('⚠️ API connection failed, switching to demo mode:', errorMessage);
      }
      
      this.isDemoMode = true;
      return false;
    }
  }

  // Utilitaire pour les appels API avec fallback
  private async apiCall<T>(
    endpoint: string,
    options: RequestInit = {},
    demoData: T
  ): Promise<T> {
    try {
      // Si déjà en mode démo ou forcé offline, utiliser les données de démo
      if (this.isDemoMode || this.config.forceOffline) {
        console.log(`📊 Using demo data for ${endpoint} (demo mode: ${this.isDemoMode}, offline: ${this.config.forceOffline})`);
        return demoData;
      }

      const url = buildApiUrl(endpoint);
      console.log(`🌐 Fetching from ${url}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), MEMBRI_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
        signal: controller.signal,
        ...options
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`✅ API call successful for ${endpoint}`);
      return data;
      
    } catch (error) {
      const errorName = error?.name || 'UnknownError';
      const errorMessage = error?.message || 'Unknown error occurred';
      
      if (errorName === 'AbortError') {
        console.warn(`⏱️ API call timeout for ${endpoint}, using demo data`);
      } else if (errorName === 'TypeError' && errorMessage.includes('fetch')) {
        console.warn(`🌐 Network error for ${endpoint}, using demo data`);
      } else {
        console.warn(`⚠️ API call failed for ${endpoint}, using demo data:`, errorMessage);
      }
      
      // Basculer en mode démo après une erreur
      this.isDemoMode = true;
      return demoData;
    }
  }

  // Récupération des provinces
  async fetchProvinces(): Promise<Province[]> {
    return this.apiCall(
      MEMBRI_CONFIG.ENDPOINTS.CITIES,
      {},
      DEMO_DATA.provinces
    );
  }

  // Récupération des villes
  async fetchCities(): Promise<City[]> {
    return this.apiCall(
      MEMBRI_CONFIG.ENDPOINTS.CITIES,
      {},
      DEMO_DATA.cities
    );
  }

  // Récupération des types d'adhésion
  async fetchMembershipTypes(): Promise<MembershipType[]> {
    return this.apiCall(
      MEMBRI_CONFIG.ENDPOINTS.MEMBERSHIP_TYPES,
      {},
      DEMO_DATA.membershipTypes
    );
  }

  // Récupération des catégories de secteurs
  async fetchSectorCategories(): Promise<SectorCategory[]> {
    return this.apiCall(
      MEMBRI_CONFIG.ENDPOINTS.SECTOR_CATEGORIES,
      {},
      DEMO_DATA.sectors
    );
  }

  // Récupération des événements actifs
  async fetchActiveEvents(): Promise<Event[]> {
    return this.apiCall(
      MEMBRI_CONFIG.ENDPOINTS.EVENTS,
      {},
      DEMO_DATA.events
    );
  }

  // Récupération des membres
  async fetchMembers(): Promise<Member[]> {
    return this.apiCall(
      MEMBRI_CONFIG.ENDPOINTS.MEMBERS,
      {},
      DEMO_DATA.members
    );
  }

  // Alias pour la compatibilité
  async getActiveMembers(): Promise<Member[]> {
    return this.fetchMembers();
  }

  // Alias supplémentaires pour la compatibilité
  async getMembers(): Promise<Member[]> {
    return this.fetchMembers();
  }

  // Alias pour les événements
  async getEvents(): Promise<Event[]> {
    return this.fetchActiveEvents();
  }

  async getActiveEvents(): Promise<Event[]> {
    return this.fetchActiveEvents();
  }

  // Soumission d'une demande d'adhésion
  async submitMembership(membershipData: MembershipFormData): Promise<string | MembriCreateMembershipResponse> {
    try {
      if (this.isDemoMode) {
        console.log('📊 Demo mode: simulating membership submission');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation d'attente
        return 'success';
      }

      // Mapper les données vers le format Membri
      const membriData: MembriCreateMembershipRequest = {
        MembershipTypeID: membershipData.membershipTypeId,
        MembershipPackageID: membershipData.membershipPackageId,
        AccountName: membershipData.accountName,
        Description: membershipData.description,
        Address: membershipData.address,
        CityID: membershipData.cityId,
        PostalCode: membershipData.postalCode,
        Email: membershipData.email,
        EmailBilling: membershipData.emailBilling,
        Phone: membershipData.phone,
        Website: membershipData.website,
        NEQ: membershipData.neq,
        ShowInfoOnWebsite: membershipData.showInfoOnWebsite,
        ShowAddressOnWeb: membershipData.showAddressOnWeb,
        ShowEmailOnWeb: membershipData.showEmailOnWeb,
        ShowPhoneOnWeb: membershipData.showPhoneOnWeb,
        ShowSocialMediaOnWeb: membershipData.showSocialMediaOnWeb,
        AutoRenewal: membershipData.autoRenewal,
        MainContact: {
          FirstName: membershipData.mainContact.firstName,
          LastName: membershipData.mainContact.lastName,
          Email: membershipData.mainContact.email,
          Phone: membershipData.mainContact.phone,
          Cell: membershipData.mainContact.cell,
          JobTitle: membershipData.mainContact.jobtitle,
          ShowEmailOnWeb: membershipData.mainContact.showEmailOnWeb,
          ShowCellphoneOnWeb: membershipData.mainContact.showCellphoneOnWeb,
          OptInNewsletter: true
        }
      };

      const response = await fetch(buildSubmissionUrl(MEMBRI_CONFIG.ENDPOINTS.MEMBERSHIP_CREATE), {
        method: 'POST',
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(membriData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('❌ Error submitting membership:', error);
      throw error;
    }
  }
}

// Instance singleton de l'API
export const membriApi = new MembriApiService();

// Exports des types
export type {
  Province,
  City,
  MembershipType,
  MembershipPackage,
  SectorCategory,
  Event,
  Member,
  MembershipFormData,
  MainContact
};