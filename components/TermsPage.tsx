import { motion } from "motion/react";
import { Scale, AlertTriangle, UserCheck, FileText, Gavel, Shield } from "lucide-react";
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

interface TermsPageProps {
  navigationHandlers: NavigationHandlers;
}

const TermsSection = ({ icon, title, children }: { 
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

export const TermsPage = ({ navigationHandlers }: TermsPageProps) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "Conditions d'utilisation", current: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedHeader 
        currentView="terms"
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
            Conditions d'utilisation
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
            <Scale className="w-8 h-8 text-blue-600 mr-4 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-3">Acceptation des conditions</h2>
              <p className="text-blue-800 leading-relaxed">
                En accédant et en utilisant le site web et les services des Armateurs du Saint-Laurent, 
                vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez 
                pas ces conditions, veuillez ne pas utiliser nos services.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sections des conditions */}
        <TermsSection 
          icon={<UserCheck className="w-6 h-6 text-blue-600" />}
          title="Utilisation des services"
        >
          <p className="mb-4">En utilisant nos services, vous vous engagez à :</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Fournir des informations exactes et à jour lors de votre inscription</li>
            <li>Utiliser nos services de manière légale et conforme à ces conditions</li>
            <li>Ne pas perturber ou interférer avec le fonctionnement de nos services</li>
            <li>Respecter les droits de propriété intellectuelle d'ASL et de tiers</li>
            <li>Ne pas utiliser nos services à des fins illégales ou non autorisées</li>
            <li>Maintenir la confidentialité de vos informations de connexion</li>
          </ul>
          <p>
            Nous nous réservons le droit de suspendre ou de résilier votre accès 
            en cas de violation de ces conditions.
          </p>
        </TermsSection>

        <TermsSection 
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          title="Propriété intellectuelle"
        >
          <p className="mb-4">
            Tous les contenus présents sur notre site web et nos services, incluant mais 
            non limités aux textes, graphiques, logos, images, et logiciels, sont la 
            propriété des Armateurs du Saint-Laurent ou de ses concédants de licence.
          </p>
          <p className="mb-4">Vous ne pouvez pas :</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Reproduire, distribuer ou modifier notre contenu sans autorisation écrite</li>
            <li>Utiliser nos marques de commerce ou logos sans permission</li>
            <li>Créer des œuvres dérivées basées sur notre contenu</li>
            <li>Retirer ou modifier les mentions de droits d'auteur</li>
          </ul>
          <p>
            Une utilisation limitée du contenu public est autorisée à des fins 
            personnelles et non commerciales.
          </p>
        </TermsSection>

        <TermsSection 
          icon={<Shield className="w-6 h-6 text-blue-600" />}
          title="Responsabilité et garanties"
        >
          <p className="mb-4">
            Nos services sont fournis "en l'état" sans garantie d'aucune sorte. 
            Nous déclinons toute responsabilité concernant :
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>L'exactitude, la fiabilité ou l'exhaustivité des informations</li>
            <li>Les interruptions de service ou les problèmes techniques</li>
            <li>Les dommages directs, indirects ou consécutifs</li>
            <li>La perte de données ou de revenus</li>
            <li>Les actions de tiers utilisant nos services</li>
          </ul>
          <p>
            Notre responsabilité totale ne saurait excéder le montant des frais 
            payés pour nos services au cours des 12 derniers mois.
          </p>
        </TermsSection>

        <TermsSection 
          icon={<Gavel className="w-6 h-6 text-blue-600" />}
          title="Droit applicable"
        >
          <p className="mb-4">
            Ces conditions d'utilisation sont régies par les lois de la province 
            de Québec et les lois fédérales du Canada qui s'y appliquent.
          </p>
          <p className="mb-4">
            Tout litige découlant de ces conditions sera soumis à la compétence 
            exclusive des tribunaux du Québec.
          </p>
          <p>
            Si une disposition de ces conditions est jugée invalide ou inapplicable, 
            les autres dispositions demeureront en vigueur.
          </p>
        </TermsSection>

        <TermsSection 
          icon={<AlertTriangle className="w-6 h-6 text-blue-600" />}
          title="Modifications et résiliation"
        >
          <p className="mb-4">
            Nous nous réservons le droit de modifier ces conditions d'utilisation 
            à tout moment. Les modifications prendront effet immédiatement après 
            leur publication sur notre site web.
          </p>
          <p className="mb-4">
            Votre utilisation continue de nos services après la publication de 
            modifications constitue votre acceptation des nouvelles conditions.
          </p>
          <p className="mb-4">
            Nous pouvons suspendre ou résilier votre accès à nos services :
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>En cas de violation de ces conditions</li>
            <li>Pour des raisons de sécurité ou de maintenance</li>
            <li>Si requis par la loi ou les autorités compétentes</li>
            <li>À votre demande de suppression de compte</li>
          </ul>
        </TermsSection>

        {/* Contact */}
        <motion.div
          className="bg-gray-100 rounded-xl p-8 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions juridiques ?</h2>
          <p className="text-gray-600 mb-6">
            Pour toute question concernant ces conditions d'utilisation ou 
            nos services, contactez notre équipe juridique.
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Email :</strong> legal@armateur.ca</p>
            <p><strong>Téléphone :</strong> +1 (418) 692-4681</p>
            <p><strong>Adresse :</strong> 101 Rue Saint-Paul, Québec, QC G1K 3V8</p>
          </div>
        </motion.div>
      </div>

      <UnifiedFooter 
        currentView="terms"
        navigationHandlers={navigationHandlers}
      />
    </div>
  );
};