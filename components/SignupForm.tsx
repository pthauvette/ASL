import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Loader2, AlertCircle, X, Check, Users, Building2, Ship, CreditCard, Banknote, Mail, Phone, MapPin, Globe, Calendar, Hash, UserPlus, CalendarDays, Clock, MapPin as MapPinIcon, DollarSign, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { membriApi, Province, City, MembershipType, MembershipPackage, SectorCategory, Event, MembershipFormData } from '../utils/membriApi';
import { useLanguage } from '../utils/languageContext';
import { toast } from 'sonner';
import type { StepStatus } from '../App';

interface FormData {
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

interface SignupFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  allStepsCompleted: boolean;
  getStepStatus: (stepId: number) => StepStatus;
  hasActiveEvents: boolean;
  maxSteps: number;
}

export function SignupForm({ 
  currentStep, 
  setCurrentStep, 
  formData, 
  setFormData, 
  allStepsCompleted,
  getStepStatus,
  hasActiveEvents,
  maxSteps
}: SignupFormProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiStatus, setApiStatus] = useState<'testing' | 'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showApiError, setShowApiError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  const [hasTriedAdvance, setHasTriedAdvance] = useState<Record<number, boolean>>({});
  
  // API Data
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [membershipTypes, setMembershipTypes] = useState<MembershipType[]>([]);
  const [membershipPackages, setMembershipPackages] = useState<MembershipPackage[]>([]);
  const [sectors, setSectors] = useState<SectorCategory[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Load API data on component mount
  useEffect(() => {
    loadApiData();
  }, []);

  const loadApiData = async () => {
    setIsLoading(true);
    setApiStatus('testing');
    setErrorMessage('');
    setShowApiError(false);
    
    try {
      console.log('Testing API connection...');
      console.log('API Configuration:', membriApi.getConfig());
      
      const connectionTest = await membriApi.testConnection();
      if (!connectionTest) {
        throw new Error('Impossible de se connecter à l\'API Membri');
      }

      const promises = [
        membriApi.fetchProvinces(),
        membriApi.fetchCities(),
        membriApi.fetchMembershipTypes(),
        membriApi.fetchSectorCategories()
      ];

      // Only fetch events if there are active events
      if (hasActiveEvents) {
        promises.push(membriApi.fetchActiveEvents());
      }

      const results = await Promise.all(promises);
      
      setProvinces(results[0]);
      setCities(results[1]);
      setMembershipTypes(results[2]);
      setSectors(results[3]);
      
      if (hasActiveEvents && results[4]) {
        setEvents(results[4]);
        console.log('Events loaded in SignupForm:', results[4].length);
      }
      
      setApiStatus('success');
      console.log('API data loaded successfully');
      
    } catch (error) {
      console.error('Error loading API data:', error);
      setApiStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Erreur de connexion API');
      setShowApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMembershipTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, membershipTypeId: value, membershipPackageId: '' }));
    
    const selectedType = membershipTypes.find(type => 
      (type.id?.toString() || type.ID?.toString()) === value
    );
    
    if (selectedType) {
      const packages = selectedType.packages || selectedType.Packages || [];
      setMembershipPackages(packages);
    }
  };

  const addDelegate = () => {
    setFormData(prev => ({
      ...prev,
      delegates: [...prev.delegates, {
        civility: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cell: '',
        jobtitle: '',
        department: '',
      }]
    }));
  };

  const removeDelegate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      delegates: prev.delegates.filter((_, i) => i !== index)
    }));
  };

  const updateDelegate = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      delegates: prev.delegates.map((delegate, i) => 
        i === index ? { ...delegate, [field]: value } : delegate
      )
    }));
  };

  // Event management functions
  const addEventSelection = (eventId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEvents: [...prev.selectedEvents, {
        eventId,
        attendeeCount: 1,
        specialRequests: ''
      }]
    }));
  };

  const removeEventSelection = (eventId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEvents: prev.selectedEvents.filter(event => event.eventId !== eventId)
    }));
  };

  const updateEventSelection = (eventId: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      selectedEvents: prev.selectedEvents.map(event => 
        event.eventId === eventId ? { ...event, [field]: value } : event
      )
    }));
  };

  const isEventSelected = (eventId: string) => {
    return formData.selectedEvents.some(event => event.eventId === eventId);
  };

  const handleSubmit = async () => {
    if (!allStepsCompleted) {
      toast.error('Veuillez compléter toutes les étapes avant de finaliser votre inscription.');
      return;
    }

    setIsSubmitting(true);
    try {
      const membershipData: MembershipFormData = {
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
          showCellphoneOnWeb: formData.mainContact.showCellphoneOnWeb,
        }
      };

      const result = await membriApi.submitMembership(membershipData);
      
      if (typeof result === 'string') {
        if (result.startsWith('http')) {
          window.location.href = result;
        } else if (result === 'success') {
          toast.success('Demande d\'adhésion soumise avec succès!');
        }
      } else {
        toast.success('Demande d\'adhésion soumise avec succès!');
      }
    } catch (error) {
      console.error('Error submitting membership:', error);
      toast.error('Erreur lors de la soumission. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation functions
  const validateCurrentStep = (): { isValid: boolean; errors: Record<string, boolean> } => {
    const errors: Record<string, boolean> = {};
    let isValid = true;

    switch (currentStep) {
      case 1:
        if (!formData.accountName) { errors.accountName = true; isValid = false; }
        if (!formData.address) { errors.address = true; isValid = false; }
        if (!formData.cityId) { errors.cityId = true; isValid = false; }
        if (!formData.provinceId) { errors.provinceId = true; isValid = false; }
        if (!formData.postalCode) { errors.postalCode = true; isValid = false; }
        if (!formData.email) { errors.email = true; isValid = false; }
        if (!formData.phone) { errors.phone = true; isValid = false; }
        break;
      case 2:
        if (!formData.membershipTypeId) { errors.membershipTypeId = true; isValid = false; }
        if (!formData.membershipPackageId) { errors.membershipPackageId = true; isValid = false; }
        if (!formData.emailBilling) { errors.emailBilling = true; isValid = false; }
        if (!formData.paymentMethod) { errors.paymentMethod = true; isValid = false; }
        break;
      case 3:
        if (!formData.mainContact.civility) { errors.mainContactCivility = true; isValid = false; }
        if (!formData.mainContact.firstName) { errors.mainContactFirstName = true; isValid = false; }
        if (!formData.mainContact.lastName) { errors.mainContactLastName = true; isValid = false; }
        if (!formData.mainContact.email) { errors.mainContactEmail = true; isValid = false; }
        break;
      case 5:
        // Events step validation (if it exists)
        if (hasActiveEvents) {
          // Events step is always valid since it's optional
        } else {
          // This is the final step when no events
          if (!formData.finalConsent) { errors.finalConsent = true; isValid = false; }
        }
        break;
      case 6:
        // Final step when events are available
        if (!formData.finalConsent) { errors.finalConsent = true; isValid = false; }
        break;
    }

    return { isValid, errors };
  };

  const goToNextStep = () => {
    const { isValid, errors } = validateCurrentStep();
    
    // Mark that user tried to advance from this step
    setHasTriedAdvance(prev => ({ ...prev, [currentStep]: true }));
    
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }
    
    // Clear validation errors if step is valid
    setValidationErrors({});
    
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const shouldShowError = (fieldName: string): boolean => {
    return hasTriedAdvance[currentStep] && validationErrors[fieldName];
  };

  // Helper function to check if membership type is Actif
  const isActiveMembershipType = (typeName: string): boolean => {
    return typeName && (typeName.toLowerCase().includes('actif') || typeName.toLowerCase().includes('active'));
  };

  const calculateTotalPrice = () => {
    let basePrice = 0;
    const selectedType = membershipTypes.find(type => 
      (type.id?.toString() || type.ID?.toString()) === formData.membershipTypeId
    );
    const selectedPackage = membershipPackages.find(pkg => 
      (pkg.id?.toString() || pkg.ID?.toString()) === formData.membershipPackageId
    );
    
    // If it's Actif membership, price is 0 (billed later based on fleet size)
    if (selectedType && isActiveMembershipType(selectedType.name || selectedType.Name || '')) {
      basePrice = 0;
    } else if (selectedPackage) {
      basePrice = selectedPackage.annualPrice || selectedPackage.AnnualPrice || 0;
    }

    // Add sponsorship costs
    let sponsorshipCosts = 0;
    if (formData.bronzeSponsorship) sponsorshipCosts += 500;
    if (formData.silverSponsorship) sponsorshipCosts += 1500;
    if (formData.goldSponsorship) sponsorshipCosts += 3000;
    if (formData.platinumSponsorship) sponsorshipCosts += 5000;

    let total = basePrice + sponsorshipCosts;

    // Apply auto-renewal discount only if there's a base price
    let discount = 0;
    if (formData.autoRenewal && total > 0) {
      discount = total * 0.05; // 5% discount
      total = total * 0.95;
    }

    // Add event costs
    let eventCosts = 0;
    formData.selectedEvents.forEach(selectedEvent => {
      const event = events.find(e => (e.id?.toString() || e.ID?.toString()) === selectedEvent.eventId);
      if (event) {
        const eventPrice = event.price || event.Price || 0;
        eventCosts += eventPrice * selectedEvent.attendeeCount;
      }
    });

    total += eventCosts;

    return { basePrice, sponsorshipCosts, eventCosts, total, discount };
  };

  // Show loading while API data is being fetched
  if (isLoading || apiStatus === 'testing') {
    return (
      <div className="flex flex-col justify-center items-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#000033]" />
        <span className="text-lg">Chargement...</span>
      </div>
    );
  }

  // Show error state if API connection failed
  if (apiStatus === 'error') {
    return (
      <div className="py-12">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Impossible de charger les données:</strong><br />
            {errorMessage}
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Button onClick={loadApiData} variant="outline">
            Réessayer la connexion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* API Connection Warning */}
      {showApiError && apiStatus === 'success' && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Connexion API instable. Certaines fonctionnalités pourraient être limitées.</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiError(false)}
              className="h-auto p-1 ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Step 1: Informations sur l'organisation - ENRICHIES */}
      {currentStep === 1 && (
        <div className="space-y-8">
          {/* Section 1: Informations de base */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Informations de l'entreprise
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Nom de l'entreprise / organisation *</Label>
                <Input
                  id="accountName"
                  value={formData.accountName}
                  onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                  className={shouldShowError('accountName') ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearFounded">Année de fondation</Label>
                  <Input
                    id="yearFounded"
                    type="number"
                    placeholder="AAAA"
                    value={formData.yearFounded}
                    onChange={(e) => setFormData(prev => ({ ...prev, yearFounded: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Nombre d'employés</Label>
                  <Select value={formData.employeeCount} onValueChange={(value) => setFormData(prev => ({ ...prev, employeeCount: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 employés</SelectItem>
                      <SelectItem value="6-20">6-20 employés</SelectItem>
                      <SelectItem value="21-50">21-50 employés</SelectItem>
                      <SelectItem value="51-100">51-100 employés</SelectItem>
                      <SelectItem value="101-250">101-250 employés</SelectItem>
                      <SelectItem value="250+">Plus de 250 employés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sectorId">Secteur d'activité</Label>
                <Select value={formData.sectorId} onValueChange={(value) => setFormData(prev => ({ ...prev, sectorId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id || sector.ID} value={(sector.id || sector.ID)?.toString() || ''}>
                        {sector.name || sector.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description de l'entreprise</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="Décrivez brièvement votre entreprise et ses activités..."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Adresse */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Adresse
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className={shouldShowError('address') ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Adresse ligne 2 (optionnel)</Label>
                <Input
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={(e) => setFormData(prev => ({ ...prev, addressLine2: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cityId">Ville *</Label>
                  <Select value={formData.cityId} onValueChange={(value) => setFormData(prev => ({ ...prev, cityId: value }))}>
                    <SelectTrigger className={shouldShowError('cityId') ? 'border-red-300 focus:border-red-500' : ''}>
                      <SelectValue placeholder="Sélectionner une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id || city.ID} value={(city.id || city.ID)?.toString() || ''}>
                          {city.name || city.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provinceId">Province *</Label>
                  <Select value={formData.provinceId} onValueChange={(value) => setFormData(prev => ({ ...prev, provinceId: value }))}>
                    <SelectTrigger className={shouldShowError('provinceId') ? 'border-red-300 focus:border-red-500' : ''}>
                      <SelectValue placeholder="Sélectionner une province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id || province.ID} value={(province.id || province.ID)?.toString() || ''}>
                          {province.name || province.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className={shouldShowError('postalCode') ? 'border-red-300 focus:border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="neq">NEQ (Numéro d'entreprise du Québec)</Label>
                <Input
                  id="neq"
                  value={formData.neq}
                  onChange={(e) => setFormData(prev => ({ ...prev, neq: e.target.value }))}
                  placeholder="Ex: 1234567890"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Coordonnées */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Coordonnées
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Courriel principal *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={shouldShowError('email') ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone principal *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={shouldShowError('phone') ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fax">Télécopieur</Label>
                <Input
                  id="fax"
                  type="tel"
                  value={formData.fax}
                  onChange={(e) => setFormData(prev => ({ ...prev, fax: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Réseaux sociaux */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Réseaux sociaux
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                  placeholder="https://facebook.com/votre-page"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/company/votre-entreprise"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="https://twitter.com/votre-compte"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="https://instagram.com/votre-compte"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Caractéristiques de l'entreprise */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg">Caractéristiques de l'entreprise</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isNewBusiness"
                  checked={formData.isNewBusiness}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNewBusiness: checked as boolean }))}
                />
                <Label htmlFor="isNewBusiness">Nouvelle entreprise (moins de 2 ans)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isSelfEmployed"
                  checked={formData.isSelfEmployed}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isSelfEmployed: checked as boolean }))}
                />
                <Label htmlFor="isSelfEmployed">Travailleur autonome</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isExporter"
                  checked={formData.isExporter}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isExporter: checked as boolean }))}
                />
                <Label htmlFor="isExporter">Entreprise exportatrice</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isManufacturer"
                  checked={formData.isManufacturer}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isManufacturer: checked as boolean }))}
                />
                <Label htmlFor="isManufacturer">Entreprise manufacturière</Label>
              </div>
            </div>
          </div>

          {/* Section 6: Préférences d'affichage */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg">Préférences d'affichage web</h3>
            <p className="text-sm text-gray-600">Choisissez quelles informations vous souhaitez afficher sur le site web de l'ASL</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showInfoOnWebsite"
                  checked={formData.showInfoOnWebsite}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showInfoOnWebsite: checked as boolean }))}
                />
                <Label htmlFor="showInfoOnWebsite">Afficher les informations de base</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showAddressOnWeb"
                  checked={formData.showAddressOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showAddressOnWeb: checked as boolean }))}
                />
                <Label htmlFor="showAddressOnWeb">Afficher l'adresse</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showEmailOnWeb"
                  checked={formData.showEmailOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showEmailOnWeb: checked as boolean }))}
                />
                <Label htmlFor="showEmailOnWeb">Afficher le courriel</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showPhoneOnWeb"
                  checked={formData.showPhoneOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showPhoneOnWeb: checked as boolean }))}
                />
                <Label htmlFor="showPhoneOnWeb">Afficher le téléphone</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showFaxOnWeb"
                  checked={formData.showFaxOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showFaxOnWeb: checked as boolean }))}
                />
                <Label htmlFor="showFaxOnWeb">Afficher le télécopieur</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showWebsiteOnWeb"
                  checked={formData.showWebsiteOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showWebsiteOnWeb: checked as boolean }))}
                />
                <Label htmlFor="showWebsiteOnWeb">Afficher le site web</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showDescriptionOnWeb"
                  checked={formData.showDescriptionOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showDescriptionOnWeb: checked as boolean }))}
                />
                <Label htmlFor="showDescriptionOnWeb">Afficher la description</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showSocialMediaOnWeb"
                  checked={formData.showSocialMediaOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showSocialMediaOnWeb: checked as boolean }))}
                />
                <Label htmlFor="showSocialMediaOnWeb">Afficher les réseaux sociaux</Label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Choix de la catégorie d'adhésion - ENRICHI avec contact de facturation */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <p className="text-[#43464b]">
            Sélectionnez la catégorie qui correspond le mieux à votre profil et à vos besoins.
          </p>

          {/* Membership Type Cards (connectées à l'API) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {membershipTypes.map((membershipType, index) => {
              const typeId = (membershipType.id || membershipType.ID)?.toString() || '';
              const typeName = membershipType.name || membershipType.Name || '';
              const typeDescription = membershipType.description || membershipType.Description || '';
              const packages = membershipType.packages || membershipType.Packages || [];
              const isSelected = formData.membershipTypeId === typeId;
              const isActiveType = isActiveMembershipType(typeName);

              // Determine icon based on type name
              const getIcon = () => {
                if (typeName.toLowerCase().includes('associé')) return Users;
                if (typeName.toLowerCase().includes('grand') || typeName.toLowerCase().includes('partenaire')) return Building2;
                if (isActiveType) return Ship;
                return Users; // default
              };
              const Icon = getIcon();

              return (
                <div 
                  key={typeId}
                  className={`relative rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-[#000033] bg-[#000033]/5' 
                      : shouldShowError('membershipTypeId') 
                        ? 'border-red-300' 
                        : 'border-gray-200 hover:border-gray-300'
                  } ${isActiveType && !isSelected ? 'border-[#000033] bg-[#000033]/5' : ''}`}
                  onClick={() => handleMembershipTypeChange(typeId)}
                >

                  <input 
                    type="radio" 
                    className="absolute top-4 right-4 w-4 h-4"
                    checked={isSelected}
                    onChange={() => {}}
                  />
                  
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-[#000033]/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#000033]" />
                    </div>
                    <h3 className="font-bold text-xl text-[#000033] mb-2">{typeName}</h3>
                    <p className="text-[#43464b] text-sm">
                      {isActiveType 
                        ? "Exclusive aux armateurs (propriétaires de navires)" 
                        : typeDescription
                      }
                    </p>
                  </div>
                  
                  {packages.length > 0 && (
                    <div className="mb-6">
                      {isActiveType ? (
                        <>
                          <div className="text-[#000033] font-bold text-2xl">Facturé</div>
                          <span className="text-[#43464b] text-sm">ultérieurement selon la flotte</span>
                        </>
                      ) : (
                        <>
                          <div className="text-[#000033] font-bold text-3xl">
                            ${packages[0].annualPrice || packages[0].AnnualPrice || 0}
                          </div>
                          <span className="text-[#43464b] text-sm">/année</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Feature list based on membership type */}
                  <ul className="space-y-3 mb-6">
                    {typeName.toLowerCase().includes('associé') && (
                      <>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Réseautage professionnel
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Accès aux événements
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Bulletins d'information
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Opportunités de partenariat
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Répertoire des membres
                        </li>
                      </>
                    )}

                    {typeName.toLowerCase().includes('grand') && (
                      <>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Tous les avantages Associé
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Visibilité premium
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Commandite d'événements
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Accès aux dirigeants
                        </li>
                        <li className="flex items-start text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                          Gestionnaire de compte dédié
                        </li>
                      </>
                    )}

                    {isActiveType && (
                      <>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Droits de vote aux assemblées
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Participation au conseil d'administration
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Influence sur les décisions sectorielles
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0" />
                          Représentation exclusive armateurs
                        </li>
                        <li className="flex items-start text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                          Cotisation basée sur la taille de flotte
                        </li>
                      </>
                    )}
                  </ul>

                  <Button 
                    variant={isSelected ? "default" : "outline"} 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMembershipTypeChange(typeId);
                    }}
                  >
                    {isSelected ? 'Sélectionné' : 'Choisir cette catégorie'}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Package Selection */}
          {formData.membershipTypeId && membershipPackages.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-[#000033]">Sélectionner un forfait</h3>
              <Select 
                value={formData.membershipPackageId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, membershipPackageId: value }))}
              >
                <SelectTrigger className={shouldShowError('membershipPackageId') ? 'border-red-300 focus:border-red-500' : ''}>
                  <SelectValue placeholder="Choisir un forfait" />
                </SelectTrigger>
                <SelectContent>
                  {membershipPackages.map((pkg) => (
                    <SelectItem key={pkg.id || pkg.ID} value={(pkg.id || pkg.ID)?.toString() || ''}>
                      {pkg.name || pkg.Name} - ${pkg.annualPrice || pkg.AnnualPrice || 0}/année
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Email for billing */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#000033]">Courriel de facturation</h3>
            <div className="space-y-2">
              <Label htmlFor="emailBilling">Adresse courriel pour la facturation *</Label>
              <Input
                id="emailBilling"
                type="email"
                value={formData.emailBilling}
                onChange={(e) => setFormData(prev => ({ ...prev, emailBilling: e.target.value }))}
                className={shouldShowError('emailBilling') ? 'border-red-300 focus:border-red-500' : ''}
                placeholder="facturation@votre-entreprise.com"
              />
              <p className="text-xs text-gray-500">Cette adresse recevra les factures et rappels de paiement.</p>
            </div>
          </div>

          {/* Separate Billing Contact */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg">Contact pour la facturation (optionnel)</h3>
            <p className="text-sm text-gray-600">Si différent du contact principal, veuillez indiquer les coordonnées du responsable de la facturation.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billingContactFirstName">Prénom</Label>
                <Input
                  id="billingContactFirstName"
                  value={formData.billingContact.firstName}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    billingContact: { ...prev.billingContact, firstName: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingContactLastName">Nom</Label>
                <Input
                  id="billingContactLastName"
                  value={formData.billingContact.lastName}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    billingContact: { ...prev.billingContact, lastName: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingContactEmail">Courriel</Label>
                <Input
                  id="billingContactEmail"
                  type="email"
                  value={formData.billingContact.email}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    billingContact: { ...prev.billingContact, email: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingContactPhone">Téléphone</Label>
                <Input
                  id="billingContactPhone"
                  type="tel"
                  value={formData.billingContact.phone}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    billingContact: { ...prev.billingContact, phone: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="billingContactDepartment">Département</Label>
                <Input
                  id="billingContactDepartment"
                  value={formData.billingContact.department}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    billingContact: { ...prev.billingContact, department: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033]">Options supplémentaires</h3>
            
            {/* Auto-renewal option */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoRenewal"
                checked={formData.autoRenewal}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoRenewal: checked as boolean }))}
              />
              <Label htmlFor="autoRenewal">Renouvellement automatique (5% de rabais)</Label>
            </div>

            {/* Sponsorship Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-[#43464b]">Options de commandite</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bronzeSponsorship"
                    checked={formData.bronzeSponsorship}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, bronzeSponsorship: checked as boolean }))}
                  />
                  <Label htmlFor="bronzeSponsorship">Commandite Bronze (+$500)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="silverSponsorship"
                    checked={formData.silverSponsorship}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, silverSponsorship: checked as boolean }))}
                  />
                  <Label htmlFor="silverSponsorship">Commandite Argent (+$1,500)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="goldSponsorship"
                    checked={formData.goldSponsorship}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, goldSponsorship: checked as boolean }))}
                  />
                  <Label htmlFor="goldSponsorship">Commandite Or (+$3,000)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="platinumSponsorship"
                    checked={formData.platinumSponsorship}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, platinumSponsorship: checked as boolean }))}
                  />
                  <Label htmlFor="platinumSponsorship">Commandite Platine (+$5,000)</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#43464b] text-lg">Méthode de paiement</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cheque Payment Option */}
              <div 
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                  formData.paymentMethod === 'cheque' 
                    ? 'border-[#000033] bg-[#000033]/5' 
                    : shouldShowError('paymentMethod') 
                      ? 'border-red-300' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cheque' }))}
              >
                <div className="flex items-start space-x-4">
                  <input 
                    type="radio" 
                    className="mt-1 w-4 h-4"
                    checked={formData.paymentMethod === 'cheque'}
                    onChange={() => {}}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-[#000033]/10 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#000033]" />
                      </div>
                      <h4 className="font-semibold text-[#000033]">Paiement par chèque</h4>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Envoyez votre chèque à l'ordre de l'ASL aux coordonnées suivantes :
                    </p>
                    
                    <div className="bg-white rounded border p-4 space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <Building2 className="w-4 h-4 text-[#000033] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Association de la Sécurité Logistique</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-[#000033] mt-0.5 flex-shrink-0" />
                        <div>
                          <p>1234 Rue du Port</p>
                          <p>Montréal, QC H3C 2A1</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-[#000033] flex-shrink-0" />
                        <p>(514) 123-4567</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-[#000033] flex-shrink-0" />
                        <p>facturation@asl.org</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Transfer Option */}
              <div 
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                  formData.paymentMethod === 'transfert' 
                    ? 'border-[#000033] bg-[#000033]/5' 
                    : shouldShowError('paymentMethod') 
                      ? 'border-red-300' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'transfert' }))}
              >
                <div className="flex items-start space-x-4">
                  <input 
                    type="radio" 
                    className="mt-1 w-4 h-4"
                    checked={formData.paymentMethod === 'transfert'}
                    onChange={() => {}}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-[#000033]/10 rounded-full flex items-center justify-center">
                        <Banknote className="w-5 h-5 text-[#000033]" />
                      </div>
                      <h4 className="font-semibold text-[#000033]">Transfert bancaire</h4>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Effectuez votre transfert avec les coordonnées bancaires suivantes :
                    </p>
                    
                    <div className="bg-white rounded border p-4 space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-600">Banque</p>
                          <p>Banque Royale du Canada</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Institution</p>
                          <p>003</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Transit</p>
                          <p>02471</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Compte</p>
                          <p>1234567</p>
                        </div>
                      </div>
                      <hr className="my-3" />
                      <div>
                        <p className="font-medium text-gray-600">Bénéficiaire</p>
                        <p>Association de la Sécurité Logistique</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Référence</p>
                        <p>Adhésion - {formData.accountName || '[Nom de l\'entreprise]'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          {formData.membershipTypeId && formData.membershipPackageId && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#43464b] mb-4">Résumé de paiement</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Adhésion {membershipTypes.find(t => (t.id?.toString() || t.ID?.toString()) === formData.membershipTypeId)?.name || membershipTypes.find(t => (t.id?.toString() || t.ID?.toString()) === formData.membershipTypeId)?.Name}</span>
                  <span>
                    {calculateTotalPrice().basePrice === 0 
                      ? 'Facturé ultérieurement selon la flotte' 
                      : `$${calculateTotalPrice().basePrice.toFixed(2)}`}
                  </span>
                </div>
                
                {calculateTotalPrice().sponsorshipCosts > 0 && (
                  <div className="flex justify-between">
                    <span>Options de commandite</span>
                    <span>+${calculateTotalPrice().sponsorshipCosts.toFixed(2)}</span>
                  </div>
                )}
                
                {formData.autoRenewal && calculateTotalPrice().discount > 0 && (
                  <div className="flex justify-between">
                    <span>Rabais renouvellement automatique (5%)</span>
                    <span className="text-green-600">-${calculateTotalPrice().discount.toFixed(2)}</span>
                  </div>
                )}
                
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total à payer</span>
                  <span>
                    {calculateTotalPrice().basePrice === 0 && calculateTotalPrice().sponsorshipCosts === 0
                      ? 'Facturé ultérieurement selon la flotte' 
                      : `$${calculateTotalPrice().total.toFixed(2)} CAD`}
                  </span>
                </div>
                
                {/* Payment instructions */}
                <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>Important :</strong> 
                    {calculateTotalPrice().basePrice === 0 && calculateTotalPrice().sponsorshipCosts === 0
                      ? ' Pour les membres Actifs, la facturation sera effectuée ultérieurement selon la taille de votre flotte.'
                      : ` Une facture sera émise suite à votre inscription. Aucun paiement n'est requis maintenant.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Contact principal - ENRICHI */}
      {currentStep === 3 && (
        <div className="space-y-8">
          <p className="text-[#43464b]">
            Renseignez les informations du contact principal de votre organisation.
          </p>

          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Informations du contact principal
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="civility">Civilité *</Label>
                <Select 
                  value={formData.mainContact.civility} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, civility: value }
                  }))}
                >
                  <SelectTrigger className={shouldShowError('mainContactCivility') ? 'border-red-300 focus:border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monsieur">Monsieur</SelectItem>
                    <SelectItem value="madame">Madame</SelectItem>
                    <SelectItem value="docteur">Docteur</SelectItem>
                    <SelectItem value="professeur">Professeur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.mainContact.firstName}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, firstName: e.target.value }
                  }))}
                  className={shouldShowError('mainContactFirstName') ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.mainContact.lastName}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, lastName: e.target.value }
                  }))}
                  className={shouldShowError('mainContactLastName') ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainContactEmail">Courriel *</Label>
                <Input
                  id="mainContactEmail"
                  type="email"
                  value={formData.mainContact.email}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, email: e.target.value }
                  }))}
                  className={shouldShowError('mainContactEmail') ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainContactPhone">Téléphone</Label>
                <Input
                  id="mainContactPhone"
                  type="tel"
                  value={formData.mainContact.phone}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, phone: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainContactCell">Cellulaire</Label>
                <Input
                  id="mainContactCell"
                  type="tel"
                  value={formData.mainContact.cell}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, cell: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainContactJobtitle">Titre du poste</Label>
                <Input
                  id="mainContactJobtitle"
                  value={formData.mainContact.jobtitle}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, jobtitle: e.target.value }
                  }))}
                  placeholder="Ex: Directeur général, Président, etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainContactDepartment">Département</Label>
              <Input
                id="mainContactDepartment"
                value={formData.mainContact.department}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  mainContact: { ...prev.mainContact, department: e.target.value }
                }))}
                placeholder="Ex: Direction générale, Ressources humaines, etc."
              />
            </div>
          </div>

          {/* Contact Display Preferences */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg">Préférences d'affichage du contact</h3>
            <p className="text-sm text-gray-600">Choisissez quelles informations du contact principal afficher sur le site web</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showContactEmailOnWeb"
                  checked={formData.mainContact.showEmailOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, showEmailOnWeb: checked as boolean }
                  }))}
                />
                <Label htmlFor="showContactEmailOnWeb">Afficher le courriel du contact</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showContactPhoneOnWeb"
                  checked={formData.mainContact.showPhoneOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, showPhoneOnWeb: checked as boolean }
                  }))}
                />
                <Label htmlFor="showContactPhoneOnWeb">Afficher le téléphone du contact</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showContactCellphoneOnWeb"
                  checked={formData.mainContact.showCellphoneOnWeb}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, showCellphoneOnWeb: checked as boolean }
                  }))}
                />
                <Label htmlFor="showContactCellphoneOnWeb">Afficher le cellulaire du contact</Label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Délégués supplémentaires - ENRICHI */}
      {currentStep === 4 && (
        <div className="space-y-8">
          <div>
            <p className="text-[#43464b] mb-6">
              Ajoutez des délégués qui représenteront votre organisation aux événements et activités de l'ASL.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Facultatif :</strong> Vous pouvez ajouter des délégués maintenant ou plus tard depuis votre espace membre.
              </p>
            </div>
          </div>

          {/* Delegates List */}
          {formData.delegates.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-medium text-[#000033] text-lg flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Délégués ajoutés ({formData.delegates.length})
              </h3>
              
              {formData.delegates.map((delegate, index) => (
                <div key={index} className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-[#000033]">Délégué {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeDelegate(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`delegate-civility-${index}`}>Civilité</Label>
                      <Select 
                        value={delegate.civility} 
                        onValueChange={(value) => updateDelegate(index, 'civility', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monsieur">Monsieur</SelectItem>
                          <SelectItem value="madame">Madame</SelectItem>
                          <SelectItem value="docteur">Docteur</SelectItem>
                          <SelectItem value="professeur">Professeur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`delegate-firstName-${index}`}>Prénom</Label>
                      <Input
                        id={`delegate-firstName-${index}`}
                        value={delegate.firstName}
                        onChange={(e) => updateDelegate(index, 'firstName', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`delegate-lastName-${index}`}>Nom</Label>
                      <Input
                        id={`delegate-lastName-${index}`}
                        value={delegate.lastName}
                        onChange={(e) => updateDelegate(index, 'lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`delegate-email-${index}`}>Courriel</Label>
                      <Input
                        id={`delegate-email-${index}`}
                        type="email"
                        value={delegate.email}
                        onChange={(e) => updateDelegate(index, 'email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`delegate-phone-${index}`}>Téléphone</Label>
                      <Input
                        id={`delegate-phone-${index}`}
                        type="tel"
                        value={delegate.phone}
                        onChange={(e) => updateDelegate(index, 'phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`delegate-cell-${index}`}>Cellulaire</Label>
                      <Input
                        id={`delegate-cell-${index}`}
                        type="tel"
                        value={delegate.cell}
                        onChange={(e) => updateDelegate(index, 'cell', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`delegate-jobtitle-${index}`}>Titre du poste</Label>
                      <Input
                        id={`delegate-jobtitle-${index}`}
                        value={delegate.jobtitle}
                        onChange={(e) => updateDelegate(index, 'jobtitle', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`delegate-department-${index}`}>Département</Label>
                    <Input
                      id={`delegate-department-${index}`}
                      value={delegate.department}
                      onChange={(e) => updateDelegate(index, 'department', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Delegate Button */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={addDelegate}
              className="w-full lg:w-auto"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un délégué
            </Button>
          </div>

          {formData.delegates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun délégué ajouté pour le moment</p>
              <p className="text-sm">Cliquez sur le bouton ci-dessus pour ajouter votre premier délégué</p>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Événements et activités - NOUVELLE ÉTAPE */}
      {currentStep === 5 && hasActiveEvents && (
        <div className="space-y-8">
          <div>
            <p className="text-[#43464b] mb-6">
              Découvrez les événements et activités à venir de l'ASL. Inscrivez-vous dès maintenant pour réserver vos places.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Optionnel :</strong> L'inscription aux événements est facultative. Vous pourrez également vous inscrire plus tard depuis votre espace membre.
              </p>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg flex items-center">
              <CalendarDays className="w-5 h-5 mr-2" />
              Événements disponibles ({events.length})
            </h3>
            
            {events.length > 0 ? (
              <div>
                <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>Événements chargés via l'API Membri 365 :</strong> {events.length} événement{events.length > 1 ? 's' : ''} disponible{events.length > 1 ? 's' : ''}.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {events.map((event) => {
                    const eventId = (event.id || event.ID)?.toString() || '';
                    const eventName = event.name || event.Name || '';
                    const eventDescription = event.description || event.Description || '';
                    const eventDate = event.date || event.Date || '';
                    const eventLocation = event.location || event.Location || '';
                    const eventPrice = event.price || event.Price || 0;
                    const eventCapacity = event.capacity || event.Capacity || 0;
                    const registeredCount = event.registeredCount || event.RegisteredCount || 0;
                    const category = event.category || event.Category || 'Événement';
                    const isSelected = isEventSelected(eventId);
                    const selectedEvent = formData.selectedEvents.find(e => e.eventId === eventId);
                    const spotsLeft = eventCapacity - registeredCount;

                    return (
                      <div 
                        key={eventId}
                        className={`relative rounded-lg border-2 p-6 transition-all duration-200 ${
                          isSelected 
                            ? 'border-[#000033] bg-[#000033]/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {/* Event Category Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#000033] text-white">
                            {category}
                          </span>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-bold text-xl text-[#000033] mb-2 pr-20">{eventName}</h4>
                          <p className="text-[#43464b] text-sm mb-4">{eventDescription}</p>
                          
                          {/* Event Details */}
                          <div className="space-y-2 text-sm">
                            {eventDate && (
                              <div className="flex items-center text-gray-600">
                                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{new Date(eventDate).toLocaleDateString('fr-CA', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</span>
                              </div>
                            )}
                            
                            {eventLocation && (
                              <div className="flex items-center text-gray-600">
                                <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{eventLocation}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center text-gray-600">
                              <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>{eventPrice > 0 ? `${eventPrice} $ CAD par personne` : 'Gratuit'}</span>
                            </div>
                            
                            {eventCapacity > 0 && (
                              <div className="flex items-center text-gray-600">
                                <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>
                                  {spotsLeft > 0 
                                    ? `${spotsLeft} places disponibles sur ${eventCapacity}`
                                    : 'Complet'
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Selection Controls */}
                        <div className="space-y-4">
                          {!isSelected ? (
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => addEventSelection(eventId)}
                              disabled={spotsLeft <= 0}
                            >
                              {spotsLeft <= 0 ? 'Complet' : 'S\'inscrire à cet événement'}
                            </Button>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center">
                                  <Check className="w-4 h-4 text-green-600 mr-2" />
                                  <span className="text-sm font-medium text-green-800">Inscrit à cet événement</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEventSelection(eventId)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Attendee Count */}
                              <div className="space-y-2">
                                <Label htmlFor={`attendees-${eventId}`}>Nombre de participants</Label>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    id={`attendees-${eventId}`}
                                    type="number"
                                    min="1"
                                    max={spotsLeft + (selectedEvent?.attendeeCount || 0)}
                                    value={selectedEvent?.attendeeCount || 1}
                                    onChange={(e) => updateEventSelection(eventId, 'attendeeCount', parseInt(e.target.value) || 1)}
                                    className="w-20"
                                  />
                                  <span className="text-sm text-gray-500">
                                    participant{(selectedEvent?.attendeeCount || 1) > 1 ? 's' : ''}
                                  </span>
                                </div>
                                {eventPrice > 0 && (
                                  <p className="text-xs text-gray-600">
                                    Coût total: {eventPrice * (selectedEvent?.attendeeCount || 1)} $ CAD
                                  </p>
                                )}
                              </div>

                              {/* Special Requests */}
                              <div className="space-y-2">
                                <Label htmlFor={`requests-${eventId}`}>Demandes spéciales (optionnel)</Label>
                                <Textarea
                                  id={`requests-${eventId}`}
                                  value={selectedEvent?.specialRequests || ''}
                                  onChange={(e) => updateEventSelection(eventId, 'specialRequests', e.target.value)}
                                  rows={2}
                                  placeholder="Allergies alimentaires, besoins d'accessibilité, etc."
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun événement disponible pour le moment</p>
                <p className="text-sm">De nouveaux événements seront ajoutés régulièrement</p>
              </div>
            )}
          </div>

          {/* Selected Events Summary */}
          {formData.selectedEvents.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#000033] mb-4">
                Résumé de vos inscriptions ({formData.selectedEvents.length})
              </h3>
              <div className="space-y-3">
                {formData.selectedEvents.map((selectedEvent) => {
                  const event = events.find(e => (e.id?.toString() || e.ID?.toString()) === selectedEvent.eventId);
                  if (!event) return null;
                  
                  const eventName = event.name || event.Name || '';
                  const eventPrice = event.price || event.Price || 0;
                  const totalCost = eventPrice * selectedEvent.attendeeCount;

                  return (
                    <div key={selectedEvent.eventId} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{eventName}</p>
                        <p className="text-sm text-gray-600">
                          {selectedEvent.attendeeCount} participant{selectedEvent.attendeeCount > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {totalCost > 0 ? `${totalCost} $ CAD` : 'Gratuit'}
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                <hr className="my-3" />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total événements:</span>
                  <span>
                    {calculateTotalPrice().eventCosts > 0 
                      ? `${calculateTotalPrice().eventCosts} $ CAD` 
                      : 'Gratuit'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 6: Revue et soumission - ENRICHI (ou Step 5 si pas d'événements) */}
      {((currentStep === 6 && hasActiveEvents) || (currentStep === 5 && !hasActiveEvents)) && (
        <div className="space-y-8">
          <p className="text-[#43464b]">
            Vérifiez vos informations et finalisez votre demande d'adhésion.
          </p>

          {/* Organization Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-[#000033] mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Informations de l'organisation
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Nom:</strong> {formData.accountName}</p>
                <p><strong>Adresse:</strong> {formData.address}</p>
                {formData.addressLine2 && <p><strong>Adresse 2:</strong> {formData.addressLine2}</p>}
                <p><strong>Ville:</strong> {cities.find(c => (c.id?.toString() || c.ID?.toString()) === formData.cityId)?.name || cities.find(c => (c.id?.toString() || c.ID?.toString()) === formData.cityId)?.Name}</p>
                <p><strong>Province:</strong> {provinces.find(p => (p.id?.toString() || p.ID?.toString()) === formData.provinceId)?.name || provinces.find(p => (p.id?.toString() || p.ID?.toString()) === formData.provinceId)?.Name}</p>
                <p><strong>Code postal:</strong> {formData.postalCode}</p>
                {formData.neq && <p><strong>NEQ:</strong> {formData.neq}</p>}
              </div>
              <div>
                <p><strong>Courriel:</strong> {formData.email}</p>
                <p><strong>Téléphone:</strong> {formData.phone}</p>
                {formData.fax && <p><strong>Télécopieur:</strong> {formData.fax}</p>}
                {formData.website && <p><strong>Site web:</strong> {formData.website}</p>}
                {formData.yearFounded && <p><strong>Année de fondation:</strong> {formData.yearFounded}</p>}
                {formData.employeeCount && <p><strong>Nombre d'employés:</strong> {formData.employeeCount}</p>}
                {formData.sectorId && <p><strong>Secteur:</strong> {sectors.find(s => (s.id?.toString() || s.ID?.toString()) === formData.sectorId)?.name || sectors.find(s => (s.id?.toString() || s.ID?.toString()) === formData.sectorId)?.Name}</p>}
              </div>
            </div>
            {formData.description && (
              <div className="mt-4">
                <p><strong>Description:</strong></p>
                <p className="text-gray-600 mt-1">{formData.description}</p>
              </div>
            )}
          </div>

          {/* Social Media Summary */}
          {(formData.facebook || formData.linkedin || formData.twitter || formData.instagram) && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#000033] mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Réseaux sociaux
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm">
                {formData.facebook && <p><strong>Facebook:</strong> {formData.facebook}</p>}
                {formData.linkedin && <p><strong>LinkedIn:</strong> {formData.linkedin}</p>}
                {formData.twitter && <p><strong>Twitter:</strong> {formData.twitter}</p>}
                {formData.instagram && <p><strong>Instagram:</strong> {formData.instagram}</p>}
              </div>
            </div>
          )}

          {/* Contact Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-[#000033] mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Contact principal
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Nom complet:</strong> {formData.mainContact.civility} {formData.mainContact.firstName} {formData.mainContact.lastName}</p>
                <p><strong>Courriel:</strong> {formData.mainContact.email}</p>
                {formData.mainContact.phone && <p><strong>Téléphone:</strong> {formData.mainContact.phone}</p>}
                {formData.mainContact.cell && <p><strong>Cellulaire:</strong> {formData.mainContact.cell}</p>}
              </div>
              <div>
                {formData.mainContact.jobtitle && <p><strong>Titre:</strong> {formData.mainContact.jobtitle}</p>}
                {formData.mainContact.department && <p><strong>Département:</strong> {formData.mainContact.department}</p>}
              </div>
            </div>
          </div>

          {/* Billing Contact Summary */}
          {(formData.billingContact.firstName || formData.billingContact.lastName || formData.billingContact.email) && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#000033] mb-4">Contact de facturation</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                <div>
                  {(formData.billingContact.firstName || formData.billingContact.lastName) && (
                    <p><strong>Nom:</strong> {formData.billingContact.firstName} {formData.billingContact.lastName}</p>
                  )}
                  {formData.billingContact.email && <p><strong>Courriel:</strong> {formData.billingContact.email}</p>}
                </div>
                <div>
                  {formData.billingContact.phone && <p><strong>Téléphone:</strong> {formData.billingContact.phone}</p>}
                  {formData.billingContact.department && <p><strong>Département:</strong> {formData.billingContact.department}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Delegates Summary */}
          {formData.delegates.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#000033] mb-4">Délégués ({formData.delegates.length})</h3>
              <div className="space-y-3">
                {formData.delegates.map((delegate, index) => (
                  <div key={index} className="bg-white rounded p-3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm">
                      <div>
                        <p><strong>Nom:</strong> {delegate.civility} {delegate.firstName} {delegate.lastName}</p>
                        <p><strong>Courriel:</strong> {delegate.email}</p>
                      </div>
                      <div>
                        {delegate.jobtitle && <p><strong>Titre:</strong> {delegate.jobtitle}</p>}
                        {delegate.department && <p><strong>Département:</strong> {delegate.department}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Events Summary (if any) */}
          {hasActiveEvents && formData.selectedEvents.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#000033] mb-4 flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Événements sélectionnés ({formData.selectedEvents.length})
              </h3>
              <div className="space-y-3">
                {formData.selectedEvents.map((selectedEvent) => {
                  const event = events.find(e => (e.id?.toString() || e.ID?.toString()) === selectedEvent.eventId);
                  if (!event) return null;
                  
                  const eventName = event.name || event.Name || '';
                  const eventPrice = event.price || event.Price || 0;
                  const totalCost = eventPrice * selectedEvent.attendeeCount;

                  return (
                    <div key={selectedEvent.eventId} className="bg-white rounded p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium">{eventName}</p>
                          <p className="text-sm text-gray-600">
                            {selectedEvent.attendeeCount} participant{selectedEvent.attendeeCount > 1 ? 's' : ''}
                          </p>
                          {selectedEvent.specialRequests && (
                            <p className="text-xs text-gray-500 mt-1">
                              <strong>Demandes spéciales:</strong> {selectedEvent.specialRequests}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {totalCost > 0 ? `${totalCost} $ CAD` : 'Gratuit'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Membership Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-3">
              <h4 className="font-medium text-[#000033]">Adhésion sélectionnée</h4>
              <div className="flex justify-between">
                <span>Type d'adhésion:</span>
                <span className="font-medium">
                  {membershipTypes.find(t => (t.id?.toString() || t.ID?.toString()) === formData.membershipTypeId)?.name || membershipTypes.find(t => (t.id?.toString() || t.ID?.toString()) === formData.membershipTypeId)?.Name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Méthode de paiement:</span>
                <span className="font-medium">
                  {formData.paymentMethod === 'cheque' ? 'Chèque' : formData.paymentMethod === 'transfert' ? 'Transfert bancaire' : 'Non sélectionnée'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Courriel de facturation:</span>
                <span className="font-medium">{formData.emailBilling}</span>
              </div>
              
              {/* Detailed breakdown */}
              <hr />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Adhésion annuelle:</span>
                  <span>
                    {calculateTotalPrice().basePrice === 0 
                      ? 'Facturé selon flotte' 
                      : `${calculateTotalPrice().basePrice.toFixed(2)} $ CAD`}
                  </span>
                </div>
                
                {calculateTotalPrice().sponsorshipCosts > 0 && (
                  <div className="flex justify-between">
                    <span>Commandites:</span>
                    <span>+${calculateTotalPrice().sponsorshipCosts.toFixed(2)} $ CAD</span>
                  </div>
                )}
                
                {hasActiveEvents && calculateTotalPrice().eventCosts > 0 && (
                  <div className="flex justify-between">
                    <span>Événements:</span>
                    <span>+${calculateTotalPrice().eventCosts.toFixed(2)} $ CAD</span>
                  </div>
                )}
                
                {formData.autoRenewal && calculateTotalPrice().discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Rabais auto-renouvellement (5%):</span>
                    <span>-${calculateTotalPrice().discount.toFixed(2)} $ CAD</span>
                  </div>
                )}
              </div>
              
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total à payer:</span>
                <span className="text-[#000033]">
                  {calculateTotalPrice().basePrice === 0 && calculateTotalPrice().sponsorshipCosts === 0 && calculateTotalPrice().eventCosts === 0
                    ? 'Facturé ultérieurement selon la flotte' 
                    : `${calculateTotalPrice().total.toFixed(2)} $ CAD`}
                </span>
              </div>
            </div>
          </div>

          {/* Final Consent and Preferences */}
          <div className="space-y-6">
            <h3 className="font-medium text-[#000033] text-lg">Consentements et préférences</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="finalConsent"
                  checked={formData.finalConsent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, finalConsent: checked as boolean }))}
                  className={shouldShowError('finalConsent') ? 'border-red-300' : ''}
                />
                <div className="space-y-1">
                  <Label 
                    htmlFor="finalConsent" 
                    className={`text-sm leading-relaxed ${shouldShowError('finalConsent') ? 'text-red-600' : ''}`}
                  >
                    J'accepte les termes et conditions d'adhésion à l'ASL et je confirme l'exactitude des informations fournies. *
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingConsent: checked as boolean }))}
                />
                <div className="space-y-1">
                  <Label htmlFor="marketingConsent" className="text-sm leading-relaxed">
                    J'accepte de recevoir des communications marketing de l'ASL (événements, promotions, nouvelles)
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletterSubscription"
                  checked={formData.newsletterSubscription}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletterSubscription: checked as boolean }))}
                />
                <div className="space-y-1">
                  <Label htmlFor="newsletterSubscription" className="text-sm leading-relaxed">
                    Je souhaite m'abonner au bulletin d'information de l'ASL
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
        >
          Étape précédente
        </Button>

        <Button 
          onClick={goToNextStep}
          disabled={isSubmitting}
          className="min-w-[150px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Traitement...
            </>
          ) : currentStep === maxSteps ? (
            'Finaliser l\'inscription'
          ) : (
            'Étape suivante'
          )}
        </Button>
      </div>
    </div>
  );
}