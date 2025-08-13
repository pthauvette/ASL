import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Save,
  Edit,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Briefcase
} from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePageProps {
  user: any;
  membershipInfo: any;
}

export function ProfilePage({ user, membershipInfo }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    // Informations personnelles
    firstName: 'Jean',
    lastName: 'Tremblay',
    email: user.email,
    phone: '(514) 555-0123',
    cellphone: '(514) 555-9876',
    jobTitle: 'Directeur des opérations',
    department: 'Opérations maritimes',

    // Informations de l\'organisation
    organization: user.organization,
    address: '123 Rue du Port',
    city: 'Montréal',
    province: 'Québec',
    postalCode: 'H2Y 2E2',
    website: 'https://exemple-maritime.com',
    
    // Préférences de confidentialité
    showEmailPublic: false,
    showPhonePublic: true,
    showCellphonePublic: false,
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    newsletterSubscription: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      toast.success('Profil mis à jour', {
        description: 'Vos informations ont été sauvegardées avec succès.'
      });
    } catch (error) {
      toast.error('Erreur de sauvegarde', {
        description: 'Impossible de sauvegarder vos modifications. Veuillez réessayer.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Réinitialiser les modifications non sauvegardées
    toast.info('Modifications annulées');
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#000033]">Mon profil</h2>
          <p className="text-[#43464b] mt-1">Gérez vos informations personnelles et préférences</p>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isSaving}
                className="border-[#000033]/20 text-[#000033] hover:bg-[#000033]/5"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#000033] hover:bg-[#000033]/90 text-white"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-[#000033] hover:bg-[#000033]/90 text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
          <TabsTrigger value="organization">Organisation</TabsTrigger>
          <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Informations personnelles */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
              <CardDescription>
                Vos informations de contact et détails professionnels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Prénom
                  </label>
                  <Input
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Nom de famille
                  </label>
                  <Input
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Adresse courriel
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 bg-white border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Téléphone professionnel
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-white border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Téléphone cellulaire
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={profileData.cellphone}
                      onChange={(e) => handleInputChange('cellphone', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-white border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Titre du poste
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={profileData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-white border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Département
                  </label>
                  <Input
                    value={profileData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Informations de l'organisation */}
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informations de l'organisation
              </CardTitle>
              <CardDescription>
                Détails de votre entreprise ou organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Nom de l'organisation
                </label>
                <Input
                  value={profileData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  disabled={!isEditing}
                  className="bg-white border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Adresse
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 bg-white border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Ville
                  </label>
                  <Input
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Province
                  </label>
                  <Input
                    value={profileData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Code postal
                  </label>
                  <Input
                    value={profileData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#43464b] mb-2 block">
                  Site web
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 bg-white border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations d'adhésion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Informations d'adhésion
              </CardTitle>
              <CardDescription>
                Détails de votre adhésion ASL (lecture seule)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Type d'adhésion
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className="text-[#000033] font-medium">{membershipInfo.type}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Numéro de membre
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className="text-[#000033] font-medium">{membershipInfo.memberNumber}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Date d'adhésion
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className="text-[#000033] font-medium">
                      {new Date(membershipInfo.joinDate).toLocaleDateString('fr-CA')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#43464b] mb-2 block">
                    Renouvellement
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className="text-[#000033] font-medium">
                      {new Date(membershipInfo.renewalDate).toLocaleDateString('fr-CA')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Confidentialité */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Paramètres de confidentialité
              </CardTitle>
              <CardDescription>
                Contrôlez quelles informations sont visibles publiquement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000033]">Afficher l'adresse courriel</h4>
                    <p className="text-sm text-[#43464b] mt-1">
                      Votre adresse courriel sera visible dans le répertoire des membres
                    </p>
                  </div>
                  <Switch
                    checked={profileData.showEmailPublic}
                    onCheckedChange={(checked) => handleInputChange('showEmailPublic', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000033]">Afficher le téléphone professionnel</h4>
                    <p className="text-sm text-[#43464b] mt-1">
                      Votre numéro de téléphone professionnel sera visible
                    </p>
                  </div>
                  <Switch
                    checked={profileData.showPhonePublic}
                    onCheckedChange={(checked) => handleInputChange('showPhonePublic', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000033]">Afficher le téléphone cellulaire</h4>
                    <p className="text-sm text-[#43464b] mt-1">
                      Votre numéro de cellulaire sera visible dans le répertoire
                    </p>
                  </div>
                  <Switch
                    checked={profileData.showCellphonePublic}
                    onCheckedChange={(checked) => handleInputChange('showCellphonePublic', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Information sur la confidentialité</h4>
                <p className="text-sm text-blue-700">
                  Ces paramètres contrôlent la visibilité de vos informations dans le répertoire public des membres ASL. 
                  Vos informations restent toujours privées pour les communications internes de l'organisation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Préférences de notification
              </CardTitle>
              <CardDescription>
                Gérez comment vous souhaitez être informé des activités ASL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000033]">Notifications par courriel</h4>
                    <p className="text-sm text-[#43464b] mt-1">
                      Recevez des mises à jour importantes par courriel
                    </p>
                  </div>
                  <Switch
                    checked={profileData.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000033]">Notifications SMS</h4>
                    <p className="text-sm text-[#43464b] mt-1">
                      Recevez des notifications urgentes par SMS
                    </p>
                  </div>
                  <Switch
                    checked={profileData.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000033]">Rappels d'événements</h4>
                    <p className="text-sm text-[#43464b] mt-1">
                      Recevez des rappels avant les événements auxquels vous êtes inscrit
                    </p>
                  </div>
                  <Switch
                    checked={profileData.eventReminders}
                    onCheckedChange={(checked) => handleInputChange('eventReminders', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000033]">Infolettre ASL</h4>
                    <p className="text-sm text-[#43464b] mt-1">
                      Recevez notre infolettre mensuelle avec les actualités de l'industrie
                    </p>
                  </div>
                  <Switch
                    checked={profileData.newsletterSubscription}
                    onCheckedChange={(checked) => handleInputChange('newsletterSubscription', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}