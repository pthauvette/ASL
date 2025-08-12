export interface FormData {
  // Organisation info - Base fields
  membershipTypeId: string;
  membershipPackageId: string;
  emailBilling: string;
  accountName: string;
  address: string;
  addressLine2: string;
  cityId: string;
  provinceId: string;
  postalCode: string;
  neq: string;
  email: string;
  phone: string;
  fax: string;
  website: string;
  description: string;

  // Additional business info fields
  employeeCount: string;
  yearFounded: string;
  sectorId: string;

  // Business characteristics
  isNewBusiness: boolean;
  isSelfEmployed: boolean;
  isExporter: boolean;
  isManufacturer: boolean;

  // Privacy/visibility preferences
  showInfoOnWebsite: boolean;
  showAddressOnWeb: boolean;
  showEmailOnWeb: boolean;
  showPhoneOnWeb: boolean;
  showSocialMediaOnWeb: boolean;
  showFaxOnWeb: boolean;
  showWebsiteOnWeb: boolean;
  showDescriptionOnWeb: boolean;

  // Membership options
  autoRenewal: boolean;

  // Social media links
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;

  // Sponsorship options
  bronzeSponsorship: boolean;
  silverSponsorship: boolean;
  goldSponsorship: boolean;
  platinumSponsorship: boolean;

  // Contact information
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

  // Delegates with enhanced info
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

  // Events and activities
  selectedEvents: Array<{
    eventId: string;
    attendeeCount: number;
    specialRequests?: string;
  }>;

  // Billing/Payment info
  paymentMethod: string; // 'cheque' or 'transfert'
  billingContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
  };

  // Final consent and preferences
  finalConsent: boolean;
  marketingConsent: boolean;
  newsletterSubscription: boolean;
}

export type StepStatus = "completed" | "incomplete" | "current" | "upcoming";

export type AppView = 
  | 'website' 
  | 'association' 
  | 'saint-laurent' 
  | 'members' 
  | 'events' 
  | 'contact'
  | 'dossiers'
  | 'privacy-policy'
  | 'terms'
  | 'sitemap'
  | 'signup' 
  | 'login' 
  | 'forgot-password' 
  | 'portal' 
  | 'member-detail';

export interface StepInfo {
  id: number;
  title: string;
  description: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

export const createInitialFormData = (): FormData => ({
  membershipTypeId: "",
  membershipPackageId: "",
  emailBilling: "",
  accountName: "",
  address: "",
  addressLine2: "",
  cityId: "",
  provinceId: "",
  postalCode: "",
  neq: "",
  email: "",
  phone: "",
  fax: "",
  website: "",
  description: "",
  employeeCount: "",
  yearFounded: "",
  sectorId: "",
  isNewBusiness: false,
  isSelfEmployed: false,
  isExporter: false,
  isManufacturer: false,
  showInfoOnWebsite: true,
  showAddressOnWeb: true,
  showEmailOnWeb: true,
  showPhoneOnWeb: true,
  showSocialMediaOnWeb: true,
  showFaxOnWeb: false,
  showWebsiteOnWeb: true,
  showDescriptionOnWeb: true,
  autoRenewal: false,
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  bronzeSponsorship: false,
  silverSponsorship: false,
  goldSponsorship: false,
  platinumSponsorship: false,
  mainContact: {
    civility: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cell: "",
    jobtitle: "",
    department: "",
    showEmailOnWeb: false,
    showPhoneOnWeb: false,
    showCellphoneOnWeb: false,
  },
  delegates: [],
  selectedEvents: [],
  paymentMethod: "",
  billingContact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
  },
  finalConsent: false,
  marketingConsent: false,
  newsletterSubscription: true,
});