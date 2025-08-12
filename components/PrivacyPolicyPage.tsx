import { motion } from "motion/react";
import { Shield, Eye, Users, Lock, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { UnifiedHeader } from "./UnifiedHeader";
import { UnifiedFooter } from "./UnifiedFooter";
import { Breadcrumb } from "./ui/breadcrumb";
import type { BreadcrumbItem } from "../utils/form-types";

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

interface PrivacyPolicyPageProps {
  navigationHandlers: NavigationHandlers;
}

const PolicySection = ({ icon, title, children }: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode; 
}) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="prose prose-gray max-w-none">
          {children}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const PrivacyPolicyPage = ({ navigationHandlers }: PrivacyPolicyPageProps) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "Politique de confidentialité", current: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedHeader 
        currentView="privacy-policy"
        navigationHandlers={navigationHandlers}
        variant="white"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Politique de confidentialité
          </h1>
          <p className="text-xl text-gray-600">
            Dernière mise à jour : 8 janvier 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="bg-blue-50 rounded-xl p-8 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start">
            <Shield className="w-8 h-8 text-blue-600 mr-4 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-3">Notre engagement</h2>
              <p className="text-blue-800 leading-relaxed">
                Les Armateurs du Saint-Laurent (ASL) s'engagent à protéger votre vie privée et 
                vos données personnelles. Cette politique explique comment nous collectons, 
                utilisons et protégeons vos informations conformément aux lois canadiennes 
                sur la protection des données.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sections de la politique */}
        <PolicySection 
          icon={<Eye className="w-6 h-6 text-blue-600" />}
          title="Informations que nous collectons"
        >
          <p className="mb-4">Nous pouvons collecter les types d'informations suivants :</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Informations d'identification :</strong> nom, prénom, titre professionnel</li>
            <li><strong>Coordonnées :</strong> adresse email, numéro de téléphone, adresse postale</li>
            <li><strong>Informations professionnelles :</strong> entreprise, poste, secteur d'activité</li>
            <li><strong>Données de navigation :</strong> pages visitées, temps passé sur le site</li>
            <li><strong>Préférences :</strong> choix de communication, intérêts sectoriels</li>
          </ul>
          <p>
            Ces informations sont collectées lorsque vous vous inscrivez à nos services, 
            participez à nos événements ou naviguez sur notre site web.
          </p>
        </PolicySection>

        <PolicySection 
          icon={<Users className="w-6 h-6 text-blue-600" />}
          title="Utilisation de vos informations"
        >
          <p className="mb-4">Nous utilisons vos informations pour :</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Gérer votre adhésion et votre compte membre</li>
            <li>Vous informer de nos événements et activités</li>
            <li>Faciliter le réseautage entre membres</li>
            <li>Améliorer nos services et notre site web</li>
            <li>Respecter nos obligations légales et réglementaires</li>
            <li>Communiquer avec vous concernant nos services</li>
          </ul>
          <p>
            Nous ne vendons jamais vos données personnelles à des tiers et nous limitons 
            leur utilisation aux fins décrites dans cette politique.
          </p>
        </PolicySection>

        <PolicySection 
          icon={<Lock className="w-6 h-6 text-blue-600" />}
          title="Protection de vos données"
        >
          <p className="mb-4">
            Nous mettons en place des mesures de sécurité appropriées pour protéger 
            vos informations personnelles :
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Chiffrement des données sensibles en transit et au repos</li>
            <li>Accès restreint aux données personnelles selon le principe du besoin de savoir</li>
            <li>Authentification forte pour l'accès aux systèmes</li>
            <li>Surveillance et détection des tentatives d'accès non autorisées</li>
            <li>Sauvegardes régulières et plan de récupération des données</li>
          </ul>
          <p>
            Malgré ces mesures, aucune transmission de données sur Internet n'est 
            totalement sécurisée. Nous nous efforçons de protéger vos informations 
            mais ne pouvons garantir une sécurité absolue.
          </p>
        </PolicySection>

        <PolicySection 
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          title="Partage et divulgation"
        >
          <p className="mb-4">
            Nous ne partageons vos informations personnelles qu'avec :
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Autres membres :</strong> selon vos préférences de visibilité</li>
            <li><strong>Prestataires de services :</strong> qui nous aident à fournir nos services</li>
            <li><strong>Autorités légales :</strong> si requis par la loi ou pour protéger nos droits</li>
            <li><strong>Partenaires approuvés :</strong> avec votre consentement explicite</li>
          </ul>
          <p>
            Tous nos prestataires sont tenus par des accords de confidentialité 
            et ne peuvent utiliser vos données que pour les services qu'ils nous fournissent.
          </p>
        </PolicySection>

        <PolicySection 
          icon={<AlertCircle className="w-6 h-6 text-blue-600" />}
          title="Vos droits"
        >
          <p className="mb-4">Conformément aux lois canadiennes, vous avez le droit de :</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Accès :</strong> demander une copie de vos données personnelles</li>
            <li><strong>Rectification :</strong> corriger les informations inexactes</li>
            <li><strong>Suppression :</strong> demander l'effacement de vos données</li>
            <li><strong>Limitation :</strong> restreindre le traitement de vos données</li>
            <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Opposition :</strong> vous opposer au traitement de vos données</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à privacy@armateur.ca. 
            Nous répondrons à votre demande dans un délai maximum de 30 jours.
          </p>
        </PolicySection>

        {/* Contact */}
        <motion.div
          className="bg-gray-100 rounded-xl p-8 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions sur cette politique ?</h2>
          <p className="text-gray-600 mb-6">
            Si vous avez des questions concernant cette politique de confidentialité 
            ou le traitement de vos données personnelles, n'hésitez pas à nous contacter.
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Email :</strong> privacy@armateur.ca</p>
            <p><strong>Téléphone :</strong> +1 (418) 692-4681</p>
            <p><strong>Adresse :</strong> 101 Rue Saint-Paul, Québec, QC G1K 3V8</p>
          </div>
        </motion.div>
      </div>

      <UnifiedFooter 
        currentView="privacy-policy"
        navigationHandlers={navigationHandlers}
      />
    </div>
  );
};