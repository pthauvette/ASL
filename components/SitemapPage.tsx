import { motion } from "motion/react";
import { Home, Building, Waves, Users, Calendar, Mail, FileText, Shield, Scale, Map } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
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

interface SitemapPageProps {
  navigationHandlers: NavigationHandlers;
}

interface SiteSection {
  title: string;
  icon: React.ReactNode;
  description: string;
  pages: Array<{
    name: string;
    onClick?: () => void;
    isImplemented: boolean;
  }>;
}

export const SitemapPage = ({ navigationHandlers }: SitemapPageProps) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "Plan du site", current: true }
  ];

  const siteSections: SiteSection[] = [
    {
      title: "Pages principales",
      icon: <Home className="w-6 h-6 text-blue-600" />,
      description: "Pages principales accessibles au public",
      pages: [
        { name: "Accueil", onClick: navigationHandlers.onNavigateToWebsite, isImplemented: true },
        { name: "L'Association", onClick: navigationHandlers.onNavigateToAssociation, isImplemented: true },
        { name: "Le Saint-Laurent", onClick: navigationHandlers.onNavigateToSaintLaurent, isImplemented: true },
        { name: "Nos membres", onClick: navigationHandlers.onNavigateToMembers, isImplemented: true },
        { name: "Dossiers", onClick: navigationHandlers.onNavigateToDossiers, isImplemented: true },
        { name: "Événements", onClick: navigationHandlers.onNavigateToEvents, isImplemented: true },
        { name: "Contact", onClick: navigationHandlers.onNavigateToContact, isImplemented: true }
      ]
    },
    {
      title: "Espace membre",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      description: "Pages réservées aux membres connectés",
      pages: [
        { name: "Connexion", onClick: navigationHandlers.onNavigateToLogin, isImplemented: true },
        { name: "Inscription", onClick: navigationHandlers.onNavigateToSignup, isImplemented: true },
        { name: "Tableau de bord", onClick: undefined, isImplemented: true },
        { name: "Profil membre", onClick: undefined, isImplemented: true },
        { name: "Répertoire des membres", onClick: undefined, isImplemented: true },
        { name: "Messagerie", onClick: undefined, isImplemented: true },
        { name: "Calendrier", onClick: undefined, isImplemented: true },
        { name: "Ressources", onClick: undefined, isImplemented: true },
        { name: "Connexions réseau", onClick: undefined, isImplemented: true }
      ]
    },
    {
      title: "Association",
      icon: <Building className="w-6 h-6 text-blue-600" />,
      description: "Informations sur l'organisation",
      pages: [
        { name: "Histoire de l'ASL", onClick: navigationHandlers.onNavigateToAssociation, isImplemented: true },
        { name: "Mission et vision", onClick: navigationHandlers.onNavigateToAssociation, isImplemented: true },
        { name: "Équipe dirigeante", onClick: navigationHandlers.onNavigateToAssociation, isImplemented: true },
        { name: "Gouvernance", onClick: undefined, isImplemented: false },
        { name: "Rapports annuels", onClick: undefined, isImplemented: false },
        { name: "Statuts et règlements", onClick: undefined, isImplemented: false }
      ]
    },
    {
      title: "Transport maritime",
      icon: <Waves className="w-6 h-6 text-blue-600" />,
      description: "Informations sur le Saint-Laurent et le transport maritime",
      pages: [
        { name: "La Voie Maritime", onClick: navigationHandlers.onNavigateToSaintLaurent, isImplemented: true },
        { name: "Statistiques de transport", onClick: navigationHandlers.onNavigateToSaintLaurent, isImplemented: true },
        { name: "Impact économique", onClick: navigationHandlers.onNavigateToSaintLaurent, isImplemented: true },
        { name: "Environnement", onClick: navigationHandlers.onNavigateToSaintLaurent, isImplemented: true },
        { name: "Réglementation", onClick: undefined, isImplemented: false },
        { name: "Sécurité maritime", onClick: undefined, isImplemented: false }
      ]
    },
    {
      title: "Ressources",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      description: "Documents et publications",
      pages: [
        { name: "Bibliothèque de documents", onClick: navigationHandlers.onNavigateToDossiers, isImplemented: true },
        { name: "Rapports et études", onClick: navigationHandlers.onNavigateToDossiers, isImplemented: true },
        { name: "Guides et manuels", onClick: navigationHandlers.onNavigateToDossiers, isImplemented: true },
        { name: "Actualités", onClick: undefined, isImplemented: false },
        { name: "Communiqués de presse", onClick: undefined, isImplemented: false },
        { name: "Centre de presse", onClick: undefined, isImplemented: false }
      ]
    },
    {
      title: "Événements",
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      description: "Événements et activités",
      pages: [
        { name: "Calendrier des événements", onClick: navigationHandlers.onNavigateToEvents, isImplemented: true },
        { name: "Conférences", onClick: navigationHandlers.onNavigateToEvents, isImplemented: true },
        { name: "Formations", onClick: navigationHandlers.onNavigateToEvents, isImplemented: true },
        { name: "Networking", onClick: navigationHandlers.onNavigateToEvents, isImplemented: true },
        { name: "Salons professionnels", onClick: undefined, isImplemented: false },
        { name: "Webinaires", onClick: undefined, isImplemented: false }
      ]
    },
    {
      title: "Informations légales",
      icon: <Scale className="w-6 h-6 text-blue-600" />,
      description: "Mentions légales et politiques",
      pages: [
        { name: "Politique de confidentialité", onClick: navigationHandlers.onNavigateToPrivacyPolicy, isImplemented: true },
        { name: "Conditions d'utilisation", onClick: navigationHandlers.onNavigateToTerms, isImplemented: true },
        { name: "Plan du site", onClick: navigationHandlers.onNavigateToSitemap, isImplemented: true },
        { name: "Mentions légales", onClick: undefined, isImplemented: false },
        { name: "Cookies", onClick: undefined, isImplemented: false },
        { name: "Accessibilité", onClick: undefined, isImplemented: false }
      ]
    }
  ];

  const SectionCard = ({ section, index }: { section: SiteSection; index: number }) => (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              {section.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-600">{section.description}</p>
            </div>
          </div>
          
          <ul className="space-y-2">
            {section.pages.map((page, pageIndex) => (
              <li key={pageIndex} className="flex items-center justify-between">
                {page.onClick && page.isImplemented ? (
                  <motion.button
                    onClick={page.onClick}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left flex-1"
                    whileHover={{ x: 5 }}
                  >
                    {page.name}
                  </motion.button>
                ) : (
                  <span className={`flex-1 ${page.isImplemented ? 'text-gray-700' : 'text-gray-400'}`}>
                    {page.name}
                  </span>
                )}
                
                {!page.isImplemented && (
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    Bientôt
                  </span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );

  const implementedPages = siteSections.reduce((total, section) => 
    total + section.pages.filter(page => page.isImplemented).length, 0
  );
  
  const totalPages = siteSections.reduce((total, section) => 
    total + section.pages.length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedHeader 
        currentView="sitemap"
        navigationHandlers={navigationHandlers}
        variant="white"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Plan du site
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigation complète de toutes les pages et sections du site des Armateurs du Saint-Laurent
          </p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="bg-blue-50 rounded-xl p-8 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{implementedPages}</div>
              <div className="text-blue-700">Pages disponibles</div>
            </div>
            <div className="w-px h-12 bg-blue-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{siteSections.length}</div>
              <div className="text-blue-700">Sections principales</div>
            </div>
            <div className="w-px h-12 bg-blue-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{totalPages - implementedPages}</div>
              <div className="text-blue-700">Pages à venir</div>
            </div>
          </div>
        </motion.div>

        {/* Sections du site */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {siteSections.map((section, index) => (
            <SectionCard key={index} section={section} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-12 text-white text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Map className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h2 className="text-3xl font-serif leading-tight mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Besoin d'aide pour naviguer ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Notre équipe est disponible pour vous aider à trouver l'information 
            que vous recherchez sur notre site.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              onClick={navigationHandlers.onNavigateToContact}
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full"
            >
              <Mail className="w-5 h-5 mr-2" />
              Nous contacter
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <UnifiedFooter 
        currentView="sitemap"
        navigationHandlers={navigationHandlers}
      />
    </div>
  );
};