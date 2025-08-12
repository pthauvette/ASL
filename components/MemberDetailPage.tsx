import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, Mail, Phone, MapPin, Calendar, Users, Building, Globe, Award, Star, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { PageLayout } from "./PageLayout";
import { membriApi } from "../utils/membriApi";
import type { AppView } from "../utils/form-types";

// Images des membres du Figma
import imgMemberCSL from "figma:asset/9223fea86145e6dfbb549fa5928c67909467f2cd.png";
import imgMemberAlgoma from "figma:asset/c92c7f2328b345106c14a5fa435dd017c4af9f8c.png";
import imgMemberLowerLakes from "figma:asset/9fb4a6e1053e905ce9ea6f07407f88df6ff41652.png";
import imgMemberMcKeil from "figma:asset/7fddb0fa231bcf8173fc8f5cefa9238927f45a3e.png";

interface NavigationHandlers {
  onNavigateToWebsite: () => void;
  onNavigateToAssociation: () => void;
  onNavigateToSaintLaurent: () => void;
  onNavigateToMembers: () => void;
  onNavigateToEvents: () => void;
  onNavigateToContact: () => void;
  onNavigateToDossiers: () => void;
  onNavigateToPrivacyPolicy: () => void;
  onNavigateToTerms: () => void;
  onNavigateToSitemap: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

interface MemberDetailPageProps {
  memberId: string;
  navigationHandlers: NavigationHandlers;
  onNavigateBack: () => void;
}

interface MemberDetail {
  id: string;
  name: string;
  organization: string;
  description: string;
  contactName: string;
  title: string;
  sector: string;
  membershipType: string;
  memberSince: string;
  email: string;
  website: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  logoImage: string;
  heroImage: string;
  color: string;
  employeeCount?: string;
  yearFounded?: string;
  services?: string[];
  achievements?: string[];
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const MEMBER_IMAGES = [
  imgMemberCSL,
  imgMemberAlgoma,
  imgMemberLowerLakes,
  imgMemberMcKeil,
];

const MEMBER_COLORS = [
  "bg-blue-100",
  "bg-cyan-100", 
  "bg-green-100",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-red-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-teal-100"
];

// Section Hero du membre
const MemberHeroSection = ({ member }: { member: MemberDetail }) => {
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${member.heroImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center space-x-4 mb-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20">
                  {member.membershipType}
                </Badge>
                <Badge className="bg-green-600 text-white">
                  Membre depuis {new Date(member.memberSince).getFullYear()}
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-5xl font-bold text-primary-foreground mb-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {member.organization}
              </motion.h1>

              <motion.p 
                className="text-xl text-primary-foreground/90 mb-6 leading-relaxed max-w-3xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {member.description || `Membre actif des Armateurs du Saint-Laurent spécialisé en ${member.sector.toLowerCase()}.`}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {member.website && (
                  <Button 
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    asChild
                  >
                    <a href={member.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-5 h-5 mr-2" />
                      Site web
                    </a>
                  </Button>
                )}
                {member.email && (
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    asChild
                  >
                    <a href={`mailto:${member.email}`}>
                      <Mail className="w-5 h-5 mr-2" />
                      Contact
                    </a>
                  </Button>
                )}
              </motion.div>
            </div>

            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="w-48 h-48 rounded-full border-4 border-primary-foreground/20 overflow-hidden bg-primary-foreground/10 backdrop-blur-sm">
                <img 
                  src={member.logoImage}
                  alt={`Logo ${member.organization}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Informations détaillées
const MemberInfoSection = ({ member }: { member: MemberDetail }) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                À propos de {member.organization}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  {member.description || `${member.organization} est un membre actif des Armateurs du Saint-Laurent, spécialisé dans le secteur ${member.sector.toLowerCase()}.`}
                </p>
                <p>
                  En tant que membre depuis {new Date(member.memberSince).getFullYear()}, l'entreprise contribue activement au développement du transport maritime sur le Saint-Laurent et participe à la promotion des priorités des armateurs canadiens.
                </p>
              </div>
            </div>

            {/* Services proposés */}
            {member.services && member.services.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {member.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Réalisations */}
            {member.achievements && member.achievements.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Réalisations</h3>
                <div className="space-y-3">
                  {member.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar avec informations de contact */}
          <div className="space-y-6">
            {/* Contact principal */}
            {member.contactName && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact principal</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{member.contactName}</p>
                        {member.title && <p className="text-sm text-muted-foreground">{member.title}</p>}
                      </div>
                    </div>
                    {member.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <a href={`mailto:${member.email}`} className="text-primary hover:text-primary/80">
                          {member.email}
                        </a>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <a href={`tel:${member.phone}`} className="text-primary hover:text-primary/80">
                          {member.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations de l'entreprise */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Informations</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{member.sector}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Membre depuis {new Date(member.memberSince).getFullYear()}</span>
                  </div>
                  {member.yearFounded && (
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Fondée en {member.yearFounded}</span>
                    </div>
                  )}
                  {member.employeeCount && (
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.employeeCount} employés</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Adresse */}
            {(member.address || member.city) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Adresse</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div className="text-muted-foreground">
                      {member.address && <p>{member.address}</p>}
                      <p>
                        {member.city}
                        {member.province && `, ${member.province}`}
                        {member.postalCode && ` ${member.postalCode}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Liens utiles */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Liens utiles</h3>
                <div className="space-y-3">
                  {member.website && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={member.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Site web officiel
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    </Button>
                  )}
                  {member.socialMedia?.linkedin && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                        <span className="w-4 h-4 mr-2">💼</span>
                        LinkedIn
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section CTA pour devenir membre
const CTASection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
          Rejoignez les Armateurs du Saint-Laurent
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
          Devenez membre d'une association qui représente et promeut les intérêts des armateurs canadiens depuis 1936.
        </p>
        <Button 
          size="lg"
          onClick={onNavigateToSignup}
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Commencer ma demande d'adhésion
        </Button>
      </div>
    </section>
  );
};

export const MemberDetailPage = ({ memberId, navigationHandlers, onNavigateBack }: MemberDetailPageProps) => {
  const [member, setMember] = useState<MemberDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMemberDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Charger les données du membre depuis l'API
        const members = await membriApi.getMembers();
        const apiMember = members.find((m: any) => (m.id || m.ID) === memberId);
        
        if (!apiMember) {
          setError('Membre non trouvé');
          return;
        }

        // Générer un index basé sur l'ID pour la cohérence des images
        const memberIndex = parseInt(memberId.replace(/\D/g, '')) || 0;
        
        // Traitement des données du membre
        const mainContact = apiMember.mainContact || apiMember.MainContact;
        const sectorCategory = apiMember.sectorCategory || apiMember.SectorCategory;
        
        const memberDetail: MemberDetail = {
          id: memberId,
          name: apiMember.accountName || apiMember.AccountName || apiMember.name || apiMember.Name || 'Organisation',
          organization: apiMember.accountName || apiMember.AccountName || apiMember.name || apiMember.Name || 'Organisation',
          description: apiMember.description || apiMember.Description || '',
          contactName: mainContact ? 
            `${mainContact.firstName || mainContact.FirstName || ''} ${mainContact.lastName || mainContact.LastName || ''}`.trim() : '',
          title: mainContact?.jobTitle || mainContact?.JobTitle || '',
          sector: sectorCategory?.name || sectorCategory?.Name || 'Transport maritime',
          membershipType: apiMember.membershipType || apiMember.MembershipType || 'Actif',
          memberSince: apiMember.memberSince || apiMember.MemberSince || new Date().toISOString(),
          email: apiMember.email || apiMember.Email || '',
          website: apiMember.website || apiMember.Website || '',
          phone: apiMember.phone || apiMember.Phone || '',
          address: apiMember.address || apiMember.Address || '',
          city: apiMember.city?.name || apiMember.City?.name || '',
          province: apiMember.province?.name || apiMember.Province?.name || 'Québec',
          postalCode: apiMember.postalCode || apiMember.PostalCode || '',
          logoImage: memberIndex < MEMBER_IMAGES.length ? MEMBER_IMAGES[memberIndex % MEMBER_IMAGES.length] : MEMBER_IMAGES[0],
          heroImage: memberIndex < MEMBER_IMAGES.length ? MEMBER_IMAGES[memberIndex % MEMBER_IMAGES.length] : `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&auto=format`,
          color: MEMBER_COLORS[memberIndex % MEMBER_COLORS.length],
          employeeCount: apiMember.employeeCount || apiMember.EmployeeCount,
          yearFounded: apiMember.yearFounded || apiMember.YearFounded,
          services: [
            'Transport maritime en vrac',
            'Transport de marchandises',
            'Services de remorquage',
            'Maintenance navale',
            'Logistique portuaire'
          ],
          achievements: [
            'Leader du transport maritime sur les Grands Lacs',
            'Plus de 125 ans d\'expérience',
            'Flotte moderne et écologique',
            'Certification ISO 14001'
          ],
          socialMedia: {
            linkedin: apiMember.linkedin || apiMember.LinkedIn,
            facebook: apiMember.facebook || apiMember.Facebook,
            twitter: apiMember.twitter || apiMember.Twitter,
            instagram: apiMember.instagram || apiMember.Instagram,
          }
        };

        setMember(memberDetail);
      } catch (err) {
        console.error('Erreur lors du chargement du membre:', err);
        setError('Erreur lors du chargement des informations du membre');
      } finally {
        setIsLoading(false);
      }
    };

    loadMemberDetail();
  }, [memberId]);

  if (isLoading) {
    return (
      <PageLayout
        currentView="member-detail"
        navigationHandlers={navigationHandlers}
        className="bg-background"
      >
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Chargement des informations du membre...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !member) {
    return (
      <PageLayout
        currentView="member-detail"
        navigationHandlers={navigationHandlers}
        className="bg-background"
      >
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-destructive mb-4">{error || 'Membre non trouvé'}</p>
            <Button onClick={onNavigateBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste des membres
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      currentView="member-detail"
      navigationHandlers={navigationHandlers}
      className="bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Bouton retour dans le contenu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            onClick={onNavigateBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste des membres
          </Button>
        </div>
        
        <MemberHeroSection member={member} />
        <MemberInfoSection member={member} />
        <CTASection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
      </motion.div>
    </PageLayout>
  );
};