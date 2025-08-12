import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Loader2, AlertCircle, X, Check, Users, Building2, Ship, CreditCard, Banknote, Mail, Phone, MapPin, Globe, Calendar, Hash, UserPlus, CalendarDays, Clock, MapPin as MapPinIcon, DollarSign, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { membriApi, type Province, type City, type MembershipType, type MembershipPackage, type SectorCategory, type Event, type MembershipFormData } from '../utils/membriApi';
import { useLanguage } from '../utils/languageContext';
import { toast } from 'sonner';
import type { FormData } from '../utils/form-types';

interface SignupFormProps {
  currentStep: number;
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  onNext: () => void;
  onPrevious: () => void;
  isInitialLoad: boolean;
  canProceed: boolean;
  isLastStep: boolean;
  allStepsCompleted: boolean;
}

export function SignupForm({ 
  currentStep, 
  formData, 
  setFormData, 
  onNext,
  onPrevious,
  isInitialLoad,
  canProceed,
  isLastStep,
  allStepsCompleted
}: SignupFormProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiStatus, setApiStatus] = useState<'testing' | 'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showApiError, setShowApiError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  const [hasTriedAdvance, setHasTriedAdvance] = useState<Record<number, boolean>>({});
  const [hasActiveEvents, setHasActiveEvents] = useState(true);
  
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
      console.log('🔍 Test de connexion API Membri 365...');
      
      // Test the connection first
      const connectionTest = await membriApi.testConnection();
      console.log('Test de connexion:', connectionTest);
      
      // Even if connection test fails, try to load demo data
      const promises = [
        membriApi.fetchProvinces().catch(() => []),
        membriApi.fetchCities().catch(() => []),
        membriApi.fetchMembershipTypes().catch(() => []),
        membriApi.fetchSectorCategories().catch(() => []),
        membriApi.fetchActiveEvents().catch(() => [])
      ];

      const [provincesData, citiesData, membershipTypesData, sectorsData, eventsData] = await Promise.all(promises);
      
      setProvinces(provincesData);
      setCities(citiesData);
      setMembershipTypes(membershipTypesData);
      setSectors(sectorsData);
      setEvents(eventsData);
      
      console.log('📊 Données chargées:', {
        provinces: provincesData.length,
        cities: citiesData.length,
        membershipTypes: membershipTypesData.length,
        sectors: sectorsData.length,
        events: eventsData.length
      });
      
      setApiStatus('success');
      
      if (!connectionTest) {
        setErrorMessage('Mode démonstration activé - données de test utilisées');
        setShowApiError(true);
      }
      
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données:', error);
      setApiStatus('error');
      setErrorMessage('Impossible de charger les données. Mode démonstration activé.');
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

      console.log('🚀 Soumission de la demande d\'adhésion:', membershipData);
      const result = await membriApi.submitMembership(membershipData);
      
      if (typeof result === 'string') {
        if (result.startsWith('http')) {
          console.log('🔗 Redirection vers le paiement:', result);
          window.location.href = result;
        } else if (result === 'success') {
          toast.success('Demande d\'adhésion soumise avec succès!');
        }
      } else {
        toast.success('Demande d\'adhésion soumise avec succès!');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la soumission:', error);
      toast.error('Erreur lors de la soumission. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        if (hasActiveEvents) {
          // Events step is always valid since it's optional
        } else {
          if (!formData.finalConsent) { errors.finalConsent = true; isValid = false; }
        }
        break;
      case 6:
        if (!formData.finalConsent) { errors.finalConsent = true; isValid = false; }
        break;
    }

    return { isValid, errors };
  };

  const goToNextStep = () => {
    const { isValid, errors } = validateCurrentStep();
    
    setHasTriedAdvance(prev => ({ ...prev, [currentStep]: true }));
    
    if (!isValid) {
      setValidationErrors(errors);
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }
    
    setValidationErrors({});
    
    if (isLastStep) {
      handleSubmit();
    } else if (canProceed) {
      onNext();
    }
  };

  const goToPreviousStep = () => {
    onPrevious();
  };

  const shouldShowError = (fieldName: string): boolean => {
    return hasTriedAdvance[currentStep] && validationErrors[fieldName];
  };

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
    
    if (selectedType && isActiveMembershipType(selectedType.name || selectedType.Name || '')) {
      basePrice = 0;
    } else if (selectedPackage) {
      basePrice = selectedPackage.annualPrice || selectedPackage.AnnualPrice || 0;
    }

    let sponsorshipCosts = 0;
    if (formData.bronzeSponsorship) sponsorshipCosts += 500;
    if (formData.silverSponsorship) sponsorshipCosts += 1500;
    if (formData.goldSponsorship) sponsorshipCosts += 3000;
    if (formData.platinumSponsorship) sponsorshipCosts += 5000;

    let total = basePrice + sponsorshipCosts;

    let discount = 0;
    if (formData.autoRenewal && total > 0) {
      discount = total * 0.05;
      total = total * 0.95;
    }

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
        <div className="text-center space-y-2">
          <h3>Chargement des données...</h3>
          <p className="text-sm text-muted-foreground">
            Connexion à l'API Membri 365 en cours
          </p>
        </div>
      </div>
    );
  }

  // Show error state if API connection failed
  if (apiStatus === 'error') {
    return (
      <div className="py-12">
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Mode démonstration activé:</strong><br />
            {errorMessage}
          </AlertDescription>
        </Alert>
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Vous pouvez continuer avec des données de démonstration ou réessayer la connexion.
          </p>
          <Button onClick={loadApiData} variant="outline">
            Réessayer la connexion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {showApiError && apiStatus === 'success' && (
        <Alert className="mb-4 border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between text-orange-800">
            <span>{errorMessage}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiError(false)}
              className="h-auto p-1 ml-2 text-orange-600 hover:text-orange-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Step 1: Informations sur l'organisation */}
      {currentStep === 1 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#000033]">
                <Building2 className="w-5 h-5 mr-2" />
                Informations de l'entreprise
              </CardTitle>
              <CardDescription>
                Renseignements de base sur votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="accountName">Nom de l'entreprise / organisation *</Label>
                <Input
                  id="accountName"
                  value={formData.accountName}
                  onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                  className={shouldShowError('accountName') ? 'border-red-300 focus:border-red-500' : ''}
                  placeholder="Nom complet de votre organisation"
                />
                {shouldShowError('accountName') && (
                  <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                )}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#000033]">
                <MapPin className="w-5 h-5 mr-2" />
                Adresse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className={shouldShowError('address') ? 'border-red-300 focus:border-red-500' : ''}
                  placeholder="Numéro et nom de rue"
                />
                {shouldShowError('address') && (
                  <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Adresse ligne 2 (optionnel)</Label>
                <Input
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={(e) => setFormData(prev => ({ ...prev, addressLine2: e.target.value }))}
                  placeholder="Bureau, suite, étage..."
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
                  {shouldShowError('cityId') && (
                    <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                  )}
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
                  {shouldShowError('provinceId') && (
                    <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className={shouldShowError('postalCode') ? 'border-red-300 focus:border-red-500' : ''}
                    placeholder="G1A 1A1"
                  />
                  {shouldShowError('postalCode') && (
                    <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                  )}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#000033]">
                <Phone className="w-5 h-5 mr-2" />
                Coordonnées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Courriel principal *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={shouldShowError('email') ? 'border-red-300 focus:border-red-500' : ''}
                    placeholder="contact@exemple.com"
                  />
                  {shouldShowError('email') && (
                    <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone principal *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={shouldShowError('phone') ? 'border-red-300 focus:border-red-500' : ''}
                    placeholder="(418) 123-4567"
                  />
                  {shouldShowError('phone') && (
                    <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fax">Télécopieur</Label>
                  <Input
                    id="fax"
                    type="tel"
                    value={formData.fax}
                    onChange={(e) => setFormData(prev => ({ ...prev, fax: e.target.value }))}
                    placeholder="(418) 123-4568"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://www.exemple.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#000033]">
                <Globe className="w-5 h-5 mr-2" />
                Réseaux sociaux
              </CardTitle>
              <CardDescription>
                Liens optionnels vers vos profils de réseaux sociaux
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={formData.facebook}
                    onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                    placeholder="https://facebook.com/votre-page"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter/X</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                    placeholder="https://twitter.com/votre-compte"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    placeholder="https://linkedin.com/company/votre-entreprise"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                    placeholder="https://instagram.com/votre-compte"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Type de membership et paiement */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#000033]">
                <Ship className="w-5 h-5 mr-2" />
                Type d'adhésion
              </CardTitle>
              <CardDescription>
                Sélectionnez le type d'adhésion qui correspond à votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="membershipTypeId">Type d'adhésion *</Label>
                <Select value={formData.membershipTypeId} onValueChange={handleMembershipTypeChange}>
                  <SelectTrigger className={shouldShowError('membershipTypeId') ? 'border-red-300 focus:border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionner un type d'adhésion" />
                  </SelectTrigger>
                  <SelectContent>
                    {membershipTypes.map((type) => (
                      <SelectItem key={type.id || type.ID} value={(type.id || type.ID)?.toString() || ''}>
                        <div className="flex flex-col">
                          <span>{type.name || type.Name}</span>
                          {(type.description || type.Description) && (
                            <span className="text-sm text-muted-foreground">
                              {type.description || type.Description}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {shouldShowError('membershipTypeId') && (
                  <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                )}
              </div>

              {formData.membershipTypeId && membershipPackages.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="membershipPackageId">Forfait d'adhésion *</Label>
                  <Select value={formData.membershipPackageId} onValueChange={(value) => setFormData(prev => ({ ...prev, membershipPackageId: value }))}>
                    <SelectTrigger className={shouldShowError('membershipPackageId') ? 'border-red-300 focus:border-red-500' : ''}>
                      <SelectValue placeholder="Sélectionner un forfait" />
                    </SelectTrigger>
                    <SelectContent>
                      {membershipPackages.map((pkg) => {
                        const price = pkg.annualPrice || pkg.AnnualPrice || 0;
                        return (
                          <SelectItem key={pkg.id || pkg.ID} value={(pkg.id || pkg.ID)?.toString() || ''}>
                            <div className="flex flex-col">
                              <div className="flex items-center justify-between">
                                <span>{pkg.name || pkg.Name}</span>
                                <span className="ml-2 font-medium">
                                  {price === 0 ? 'Sur mesure' : `${price.toLocaleString('fr-CA')} $ / an`}
                                </span>
                              </div>
                              {(pkg.description || pkg.Description) && (
                                <span className="text-sm text-muted-foreground">
                                  {pkg.description || pkg.Description}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {shouldShowError('membershipPackageId') && (
                    <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#000033]">
                <CreditCard className="w-5 h-5 mr-2" />
                Facturation et paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emailBilling">Courriel de facturation *</Label>
                <Input
                  id="emailBilling"
                  type="email"
                  value={formData.emailBilling}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailBilling: e.target.value }))}
                  className={shouldShowError('emailBilling') ? 'border-red-300 focus:border-red-500' : ''}
                  placeholder="facturation@exemple.com"
                />
                {shouldShowError('emailBilling') && (
                  <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Méthode de paiement *</Label>
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                  className={shouldShowError('paymentMethod') ? 'border border-red-300 rounded p-3' : 'space-y-2'}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cheque" id="cheque" />
                    <Label htmlFor="cheque" className="flex items-center cursor-pointer">
                      <Banknote className="w-4 h-4 mr-2" />
                      Chèque
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfert" id="transfert" />
                    <Label htmlFor="transfert" className="flex items-center cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Virement bancaire
                    </Label>
                  </div>
                </RadioGroup>
                {shouldShowError('paymentMethod') && (
                  <p className="text-sm text-red-600">Veuillez sélectionner une méthode de paiement</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoRenewal"
                  checked={formData.autoRenewal}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoRenewal: checked as boolean }))}
                />
                <Label htmlFor="autoRenewal" className="text-sm cursor-pointer">
                  Renouvellement automatique (5% de rabais)
                </Label>
              </div>

              {formData.membershipPackageId && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Résumé des coûts</h4>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const { basePrice, sponsorshipCosts, eventCosts, total, discount } = calculateTotalPrice();
                      return (
                        <>
                          <div className="flex justify-between">
                            <span>Cotisation annuelle:</span>
                            <span>{basePrice === 0 ? 'Sur mesure *' : `${basePrice.toLocaleString('fr-CA')} $`}</span>
                          </div>
                          {sponsorshipCosts > 0 && (
                            <div className="flex justify-between">
                              <span>Commandites:</span>
                              <span>{sponsorshipCosts.toLocaleString('fr-CA')} $</span>
                            </div>
                          )}
                          {eventCosts > 0 && (
                            <div className="flex justify-between">
                              <span>Événements:</span>
                              <span>{eventCosts.toLocaleString('fr-CA')} $</span>
                            </div>
                          )}
                          {discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Rabais renouvellement auto:</span>
                              <span>-{discount.toLocaleString('fr-CA')} $</span>
                            </div>
                          )}
                          <hr className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>{total === 0 ? 'Sur mesure *' : `${total.toLocaleString('fr-CA')} $`}</span>
                          </div>
                          {basePrice === 0 && (
                            <p className="text-xs text-muted-foreground mt-2">
                              * La cotisation pour les membres actifs est calculée selon la taille de la flotte et sera facturée séparément.
                            </p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Contact principal */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[#000033]">
              <Users className="w-5 h-5 mr-2" />
              Contact principal
            </CardTitle>
            <CardDescription>
              Personne-ressource principale pour votre organisation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mainContactCivility">Civilité *</Label>
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
                  <SelectItem value="M.">M.</SelectItem>
                  <SelectItem value="Mme">Mme</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                  <SelectItem value="Prof.">Prof.</SelectItem>
                </SelectContent>
              </Select>
              {shouldShowError('mainContactCivility') && (
                <p className="text-sm text-red-600">Ce champ est obligatoire</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainContactFirstName">Prénom *</Label>
                <Input
                  id="mainContactFirstName"
                  value={formData.mainContact.firstName}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, firstName: e.target.value } 
                  }))}
                  className={shouldShowError('mainContactFirstName') ? 'border-red-300 focus:border-red-500' : ''}
                />
                {shouldShowError('mainContactFirstName') && (
                  <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainContactLastName">Nom de famille *</Label>
                <Input
                  id="mainContactLastName"
                  value={formData.mainContact.lastName}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, lastName: e.target.value } 
                  }))}
                  className={shouldShowError('mainContactLastName') ? 'border-red-300 focus:border-red-500' : ''}
                />
                {shouldShowError('mainContactLastName') && (
                  <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                )}
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
                {shouldShowError('mainContactEmail') && (
                  <p className="text-sm text-red-600">Ce champ est obligatoire</p>
                )}
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
                <Label htmlFor="mainContactJobtitle">Titre / Poste</Label>
                <Input
                  id="mainContactJobtitle"
                  value={formData.mainContact.jobtitle}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    mainContact: { ...prev.mainContact, jobtitle: e.target.value } 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainContactDepartment">Département / Division</Label>
              <Input
                id="mainContactDepartment"
                value={formData.mainContact.department}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  mainContact: { ...prev.mainContact, department: e.target.value } 
                }))}
              />
            </div>

            <div className="space-y-3">
              <Label>Préférences d'affichage sur le site web</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mainContactShowEmailOnWeb"
                    checked={formData.mainContact.showEmailOnWeb}
                    onCheckedChange={(checked) => setFormData(prev => ({ 
                      ...prev, 
                      mainContact: { ...prev.mainContact, showEmailOnWeb: checked as boolean } 
                    }))}
                  />
                  <Label htmlFor="mainContactShowEmailOnWeb" className="text-sm cursor-pointer">
                    Afficher le courriel sur le site web
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mainContactShowPhoneOnWeb"
                    checked={formData.mainContact.showPhoneOnWeb}
                    onCheckedChange={(checked) => setFormData(prev => ({ 
                      ...prev, 
                      mainContact: { ...prev.mainContact, showPhoneOnWeb: checked as boolean } 
                    }))}
                  />
                  <Label htmlFor="mainContactShowPhoneOnWeb" className="text-sm cursor-pointer">
                    Afficher le téléphone sur le site web
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mainContactShowCellphoneOnWeb"
                    checked={formData.mainContact.showCellphoneOnWeb}
                    onCheckedChange={(checked) => setFormData(prev => ({ 
                      ...prev, 
                      mainContact: { ...prev.mainContact, showCellphoneOnWeb: checked as boolean } 
                    }))}
                  />
                  <Label htmlFor="mainContactShowCellphoneOnWeb" className="text-sm cursor-pointer">
                    Afficher le cellulaire sur le site web
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Délégués */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[#000033]">
              <UserPlus className="w-5 h-5 mr-2" />
              Délégués additionnels
            </CardTitle>
            <CardDescription>
              Ajoutez des délégués qui représenteront votre organisation (optionnel)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.delegates.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Aucun délégué ajouté</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Les délégués peuvent participer aux événements et représenter votre organisation.
                </p>
                <Button onClick={addDelegate} variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Ajouter un délégué
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {formData.delegates.map((delegate, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Délégué {index + 1}</h4>
                      <Button
                        onClick={() => removeDelegate(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Civilité</Label>
                          <Select
                            value={delegate.civility}
                            onValueChange={(value) => updateDelegate(index, 'civility', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="M.">M.</SelectItem>
                              <SelectItem value="Mme">Mme</SelectItem>
                              <SelectItem value="Dr.">Dr.</SelectItem>
                              <SelectItem value="Prof.">Prof.</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Prénom</Label>
                          <Input
                            value={delegate.firstName}
                            onChange={(e) => updateDelegate(index, 'firstName', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Nom de famille</Label>
                          <Input
                            value={delegate.lastName}
                            onChange={(e) => updateDelegate(index, 'lastName', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Courriel</Label>
                          <Input
                            type="email"
                            value={delegate.email}
                            onChange={(e) => updateDelegate(index, 'email', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Téléphone</Label>
                          <Input
                            type="tel"
                            value={delegate.phone}
                            onChange={(e) => updateDelegate(index, 'phone', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Cellulaire</Label>
                          <Input
                            type="tel"
                            value={delegate.cell}
                            onChange={(e) => updateDelegate(index, 'cell', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Titre / Poste</Label>
                          <Input
                            value={delegate.jobtitle}
                            onChange={(e) => updateDelegate(index, 'jobtitle', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Département / Division</Label>
                        <Input
                          value={delegate.department}
                          onChange={(e) => updateDelegate(index, 'department', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                
                <div className="text-center">
                  <Button onClick={addDelegate} variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Ajouter un autre délégué
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 5: Événements */}
      {currentStep === 5 && hasActiveEvents && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[#000033]">
              <CalendarDays className="w-5 h-5 mr-2" />
              Événements disponibles
            </CardTitle>
            <CardDescription>
              Sélectionnez les événements auxquels vous souhaitez participer (optionnel)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {events.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Aucun événement disponible</h3>
                <p className="text-sm text-muted-foreground">
                  Il n'y a actuellement aucun événement ouvert aux inscriptions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => {
                  const eventId = (event.id || event.ID)?.toString() || '';
                  const isSelected = isEventSelected(eventId);
                  const selectedEvent = formData.selectedEvents.find(e => e.eventId === eventId);
                  
                  return (
                    <Card key={eventId} className={`p-4 ${isSelected ? 'border-blue-500 bg-blue-50' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addEventSelection(eventId);
                                } else {
                                  removeEventSelection(eventId);
                                }
                              }}
                            />
                            <div>
                              <h4 className="font-medium">{event.name || event.Name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(event.date || event.Date || event.StartTime || '').toLocaleDateString('fr-CA')}
                                </span>
                                <span className="flex items-center">
                                  <MapPinIcon className="w-4 h-4 mr-1" />
                                  {event.venue || event.Venue || event.location || event.Location}
                                </span>
                                {(event.price || event.Price) && (
                                  <span className="flex items-center">
                                    <DollarSign className="w-4 h-4 mr-1" />
                                    {(event.price || event.Price)?.toLocaleString('fr-CA')} $
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {(event.description || event.Description) && (
                            <p className="text-sm text-gray-600 mb-3 ml-6">
                              {event.description || event.Description}
                            </p>
                          )}
                          
                          {isSelected && (
                            <div className="ml-6 space-y-3">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Nombre de participants</Label>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={selectedEvent?.attendeeCount || 1}
                                    onChange={(e) => updateEventSelection(eventId, 'attendeeCount', parseInt(e.target.value) || 1)}
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Demandes spéciales (optionnel)</Label>
                                <Textarea
                                  value={selectedEvent?.specialRequests || ''}
                                  onChange={(e) => updateEventSelection(eventId, 'specialRequests', e.target.value)}
                                  placeholder="Allergies, besoins spéciaux, etc."
                                  rows={2}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 6 ou Step 5 (si pas d'événements): Confirmation finale */}
      {(currentStep === 6 || (currentStep === 5 && !hasActiveEvents)) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[#000033]">
              <Check className="w-5 h-5 mr-2" />
              Confirmation et consentements
            </CardTitle>
            <CardDescription>
              Veuillez confirmer votre demande d'adhésion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Résumé de votre demande</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Organisation:</span>
                  <span className="font-medium">{formData.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type d'adhésion:</span>
                  <span>{membershipTypes.find(t => (t.id || t.ID)?.toString() === formData.membershipTypeId)?.name || membershipTypes.find(t => (t.id || t.ID)?.toString() === formData.membershipTypeId)?.Name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact principal:</span>
                  <span>{formData.mainContact.firstName} {formData.mainContact.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Délégués:</span>
                  <span>{formData.delegates.length}</span>
                </div>
                {formData.selectedEvents.length > 0 && (
                  <div className="flex justify-between">
                    <span>Événements sélectionnés:</span>
                    <span>{formData.selectedEvents.length}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="finalConsent"
                  checked={formData.finalConsent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, finalConsent: checked as boolean }))}
                  className={shouldShowError('finalConsent') ? 'border-red-300' : ''}
                />
                <Label htmlFor="finalConsent" className="text-sm cursor-pointer">
                  Je confirme que toutes les informations fournies sont exactes et complètes. 
                  J'accepte les termes et conditions d'adhésion des Armateurs du Saint-Laurent. *
                </Label>
              </div>
              {shouldShowError('finalConsent') && (
                <p className="text-sm text-red-600 ml-6">Ce consentement est obligatoire</p>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingConsent: checked as boolean }))}
                />
                <Label htmlFor="marketingConsent" className="text-sm cursor-pointer">
                  J'accepte de recevoir des communications marketing de la part des Armateurs du Saint-Laurent
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletterSubscription"
                  checked={formData.newsletterSubscription}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletterSubscription: checked as boolean }))}
                />
                <Label htmlFor="newsletterSubscription" className="text-sm cursor-pointer">
                  Je souhaite m'abonner à l'infolettre des Armateurs du Saint-Laurent
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          onClick={goToPreviousStep}
          variant="outline"
          disabled={currentStep === 1}
        >
          Précédent
        </Button>

        <Button
          onClick={goToNextStep}
          disabled={isSubmitting}
          className="bg-[#000033] hover:bg-[#000033]/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Soumission en cours...
            </>
          ) : isLastStep ? (
            'Finaliser l\'inscription'
          ) : (
            'Suivant'
          )}
        </Button>
      </div>
    </div>
  );
}