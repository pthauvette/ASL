import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Filter, FileText, Download, Eye, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ContentPageLayout } from "./PageLayout";
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

interface DossiersPageProps {
  navigationHandlers: NavigationHandlers;
}

interface Dossier {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  fileSize: string;
  downloadCount: number;
  isPublic: boolean;
}

const MOCK_DOSSIERS: Dossier[] = [
  {
    id: "1",
    title: "Rapport annuel 2023 - Transport maritime sur le Saint-Laurent",
    description: "Analyse complète des activités de transport maritime, statistiques de tonnage, évolution du secteur et perspectives d'avenir.",
    category: "Rapport annuel",
    date: "15 mars 2024",
    author: "ASL - Direction générale",
    tags: ["Statistiques", "Transport", "Économie"],
    fileSize: "12.5 MB",
    downloadCount: 245,
    isPublic: true
  },
  {
    id: "2",
    title: "Étude d'impact environnemental - Voie Maritime",
    description: "Évaluation de l'impact environnemental du transport maritime sur l'écosystème du Saint-Laurent et mesures de mitigation.",
    category: "Étude",
    date: "28 février 2024",
    author: "Comité environnement ASL",
    tags: ["Environnement", "Durabilité", "Impact"],
    fileSize: "8.7 MB",
    downloadCount: 189,
    isPublic: true
  },
  {
    id: "3",
    title: "Guide de sécurité maritime - Édition 2024",
    description: "Manuel complet des procédures de sécurité, protocoles d'urgence et meilleures pratiques pour la navigation commerciale.",
    category: "Guide",
    date: "10 février 2024",
    author: "Comité sécurité ASL",
    tags: ["Sécurité", "Procédures", "Formation"],
    fileSize: "15.2 MB",
    downloadCount: 567,
    isPublic: false
  },
  {
    id: "4",
    title: "Analyse économique - Secteur maritime québécois",
    description: "Évaluation économique du secteur maritime au Québec, contribution au PIB et projections de croissance.",
    category: "Analyse",
    date: "22 janvier 2024",
    author: "Département recherche ASL",
    tags: ["Économie", "Québec", "Croissance"],
    fileSize: "6.3 MB",
    downloadCount: 158,
    isPublic: true
  },
  {
    id: "5",
    title: "Règlementation internationale - Conformité SOLAS",
    description: "Guide de conformité aux règlements SOLAS pour les navires commerciaux opérant sur la Voie Maritime.",
    category: "Réglementation",
    date: "8 janvier 2024",
    author: "Département juridique ASL",
    tags: ["SOLAS", "Conformité", "International"],
    fileSize: "4.1 MB",
    downloadCount: 234,
    isPublic: false
  },
  {
    id: "6",
    title: "Innovation technologique - Navires autonomes",
    description: "Étude prospective sur l'intégration des technologies autonomes dans le transport maritime commercial.",
    category: "Innovation",
    date: "18 décembre 2023",
    author: "Comité innovation ASL",
    tags: ["Innovation", "Technologie", "Autonome"],
    fileSize: "9.8 MB",
    downloadCount: 312,
    isPublic: true
  }
];

const CATEGORIES = [
  "Toutes les catégories",
  "Rapport annuel",
  "Étude",
  "Guide",
  "Analyse", 
  "Réglementation",
  "Innovation"
];

const DossierCard: React.FC<{ dossier: Dossier }> = ({ dossier }) => {
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Rapport annuel": return "bg-blue-600";
      case "Étude": return "bg-green-600";
      case "Guide": return "bg-purple-600";
      case "Analyse": return "bg-orange-600";
      case "Réglementation": return "bg-red-600";
      case "Innovation": return "bg-cyan-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white h-full hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          {/* Header avec catégorie et statut */}
          <div className="flex items-start justify-between mb-4">
            <Badge className={`${getCategoryColor(dossier.category)} text-white text-xs`}>
              {dossier.category}
            </Badge>
            {!dossier.isPublic && (
              <Badge variant="outline" className="text-xs">
                Membres uniquement
              </Badge>
            )}
          </div>

          {/* Titre et description */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {dossier.title}
          </h3>
          
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {dossier.description}
          </p>

          {/* Métadonnées */}
          <div className="space-y-2 mb-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{dossier.date}</span>
            </div>
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span>{dossier.author}</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              <span>{dossier.fileSize} • {dossier.downloadCount} téléchargements</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {dossier.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <Eye className="w-3 h-3 mr-1" />
              Consulter
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const DossiersPage: React.FC<DossiersPageProps> = ({ navigationHandlers }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes les catégories');
  const [filteredDossiers, setFilteredDossiers] = useState<Dossier[]>(MOCK_DOSSIERS);

  // Filtrer les dossiers
  useEffect(() => {
    let filtered = [...MOCK_DOSSIERS];

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(dossier => 
        dossier.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dossier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dossier.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtre par catégorie
    if (selectedCategory && selectedCategory !== 'Toutes les catégories') {
      filtered = filtered.filter(dossier => dossier.category === selectedCategory);
    }

    setFilteredDossiers(filtered);
  }, [searchTerm, selectedCategory]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "Dossiers", current: true }
  ];

  return (
    <ContentPageLayout
      currentView="dossiers"
      navigationHandlers={navigationHandlers}
      breadcrumbItems={breadcrumbItems}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Dossiers et Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accédez à notre bibliothèque de documents, rapports, études et guides 
            sur le transport maritime et la Voie Maritime du Saint-Laurent.
          </p>
        </motion.div>

        {/* Recherche et Filtres */}
        <motion.div 
          className="bg-white rounded-xl p-6 mb-8 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Barre de recherche */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher dans les dossiers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500"
              />
            </div>

            {/* Filtre par catégorie */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64 bg-gray-50 border-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Statistiques */}
            <div className="text-sm text-gray-600">
              {filteredDossiers.length} dossier{filteredDossiers.length > 1 ? 's' : ''} trouvé{filteredDossiers.length > 1 ? 's' : ''}
            </div>
          </div>
        </motion.div>

        {/* Grille des dossiers */}
        {filteredDossiers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDossiers.map((dossier, index) => (
              <motion.div
                key={dossier.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <DossierCard dossier={dossier} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">Aucun dossier trouvé</p>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-12 text-white text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-serif leading-tight mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Accès membre requis
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Certains documents sont réservés aux membres. Rejoignez l'ASL pour accéder 
            à l'ensemble de notre bibliothèque de ressources exclusives.
          </p>
          <div className="flex justify-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg"
                onClick={navigationHandlers.onNavigateToSignup}
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full"
              >
                Devenir membre
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg"
                variant="outline"
                onClick={navigationHandlers.onNavigateToLogin}
                className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full bg-transparent"
              >
                Se connecter
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ContentPageLayout>
  );
};