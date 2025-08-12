import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, Filter, MapPin, Globe, Mail, Phone, Loader2, Grid, List } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { membriApi } from "../utils/membriApi";

// Import des SVG et assets
import svgPaths from "../imports/svg-xevomu9hph";

// Images des membres du Figma
import imgMemberCSL from "figma:asset/9223fea86145e6dfbb549fa5928c67909467f2cd.png";
import imgMemberAlgoma from "figma:asset/c92c7f2328b345106c14a5fa435dd017c4af9f8c.png";
import imgMemberLowerLakes from "figma:asset/9fb4a6e1053e905ce9ea6f07407f88df6ff41652.png";
import imgMemberMcKeil from "figma:asset/7fddb0fa231bcf8173fc8f5cefa9238927f45a3e.png";

interface MembersPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigateToWebsite: () => void;
  onNavigateToMemberDetail?: (memberId: string) => void;
}

const MEMBER_IMAGES = [
  imgMemberCSL, imgMemberAlgoma, imgMemberLowerLakes, imgMemberMcKeil,
  imgMemberCSL, imgMemberAlgoma, imgMemberLowerLakes, imgMemberMcKeil,
  imgMemberCSL, imgMemberAlgoma, imgMemberLowerLakes, imgMemberMcKeil,
  imgMemberCSL, imgMemberAlgoma, imgMemberLowerLakes, imgMemberMcKeil,
  imgMemberCSL, imgMemberAlgoma
];

const MEMBER_COLORS = [
  "bg-blue-100", "bg-cyan-100", "bg-green-100", "bg-yellow-100", "bg-orange-100",
  "bg-red-100", "bg-purple-100", "bg-pink-100", "bg-indigo-100", "bg-teal-100",
  "bg-emerald-100", "bg-lime-100", "bg-amber-100", "bg-rose-100", "bg-violet-100",
  "bg-sky-100", "bg-stone-100", "bg-gray-100"
];

// Header complet du site avec navigation
const SiteHeader = ({ onNavigateToLogin, onNavigateToSignup, onNavigateToWebsite }: {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigateToWebsite: () => void;
}) => {
  return (
    <motion.header 
      className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 h-[110px]"
      initial={{ y: -110, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-[110px]">
          {/* Logo et bouton retour */}
          <motion.div 
            className="flex items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Bouton retour */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNavigateToWebsite}
              className="text-blue-900 hover:text-blue-700 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Accueil
            </Button>
            
            {/* Logo */}
            <div className="w-8 h-8 mr-3">
              <svg className="w-full h-full" viewBox="0 0 39 21" fill="none">
                <path d={svgPaths.p3d807000} fill="#1e40af" />
                <path d={svgPaths.p31e6aa00} fill="#1e40af" />
                <path d={svgPaths.p33541480} fill="#1e40af" />
                <path d={svgPaths.p34b29d80} fill="#1e40af" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-blue-900">
              Armateurs Saint-Laurent
            </h1>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            className="hidden md:flex space-x-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {["L'Association", "Le Saint-Laurent", "Dossiers", "Événements", "Contact"].map((item, index) => (
              <motion.button
                key={item}
                className="text-gray-700 text-base hover:text-blue-900 transition-colors"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                {item}
              </motion.button>
            ))}
          </motion.nav>

          {/* Portail Membre Button */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              onClick={onNavigateToLogin}
              className="border border-blue-900 text-blue-900 hover:bg-blue-50 bg-transparent rounded-full px-6 py-2 transition-all duration-300 hover:scale-105"
            >
              Portail Membre
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

// Section Hero
const HeroSection = ({ totalMembers }: { totalMembers: number }) => {
  return (
    <section className="relative h-96 overflow-hidden mt-[110px]">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=600&fit=crop&auto=format')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80" />

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="max-w-4xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl font-serif leading-tight text-white mb-6 font-normal" 
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Nos Membres
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Découvrez les {totalMembers} entreprises qui façonnent l'avenir du transport maritime 
              sur le Saint-Laurent et contribuent au développement économique du Canada.
            </motion.p>

            <motion.div 
              className="flex items-center space-x-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{totalMembers}</div>
                <div className="text-white/80">membres actifs</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-white/80">secteurs d'activité</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">1936</div>
                <div className="text-white/80">depuis</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Section Recherche et Filtres
const SearchAndFiltersSection = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedSector, 
  setSelectedSector,
  viewMode,
  setViewMode 
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}) => {
  const sectors = [
    "Tous les secteurs",
    "Transport maritime",
    "Logistique portuaire", 
    "Services nautiques",
    "Assurance maritime",
    "Technologie maritime",
    "Construction navale",
    "Environnement maritime"
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col lg:flex-row gap-6 items-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Barre de recherche */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Filtre par secteur */}
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-64 bg-gray-50 border-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer par secteur" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mode d'affichage */}
          <div className="flex rounded-lg border border-gray-200 bg-gray-50">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Section Liste des Membres
const MembersListSection = ({ 
  members, 
  isLoading, 
  viewMode, 
  onNavigateToMemberDetail 
}: {
  members: any[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  onNavigateToMemberDetail?: (memberId: string) => void;
}) => {
  if (isLoading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-900" />
            <p className="text-gray-600">Chargement des membres...</p>
          </div>
        </div>
      </section>
    );
  }

  const handleMemberClick = (memberId: string) => {
    if (onNavigateToMemberDetail) {
      onNavigateToMemberDetail(memberId);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member.ID || member.id || index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card 
                  className={`${MEMBER_COLORS[index % MEMBER_COLORS.length]} h-full cursor-pointer hover:shadow-xl transition-all duration-300`}
                  onClick={() => handleMemberClick(member.ID || member.id || `member-${index}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <div 
                        className="absolute inset-0 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url('${MEMBER_IMAGES[index % MEMBER_IMAGES.length]}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-lg" />
                      <Button className="absolute bottom-4 right-4 bg-white/90 text-black hover:bg-white text-sm rounded-full px-4 shadow-lg">
                        Voir le profil
                      </Button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div 
                          className="w-12 h-12 rounded-full bg-cover bg-center shadow-md mr-4"
                          style={{ backgroundImage: `url('${MEMBER_IMAGES[index % MEMBER_IMAGES.length]}')` }}
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                            {member.AccountName || member.accountName || member.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Membre depuis {new Date(member.MemberSince || member.memberSince).getFullYear()}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
                        {member.Description || member.description || 'Membre des Armateurs du Saint-Laurent'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className="bg-white/50 text-gray-700 text-xs">
                          {member.SectorCategory?.Name || member.sectorCategory?.name || 'Transport maritime'}
                        </Badge>
                        
                        <div className="flex space-x-2">
                          {member.Website && (
                            <Globe className="w-4 h-4 text-gray-500" />
                          )}
                          {member.Email && (
                            <Mail className="w-4 h-4 text-gray-500" />
                          )}
                          {member.Phone && (
                            <Phone className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {members.map((member, index) => (
              <motion.div
                key={member.ID || member.id || index}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <Card 
                  className="bg-white cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => handleMemberClick(member.ID || member.id || `member-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div 
                        className="w-16 h-16 rounded-lg bg-cover bg-center shadow-md flex-shrink-0"
                        style={{ backgroundImage: `url('${MEMBER_IMAGES[index % MEMBER_IMAGES.length]}')` }}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {member.AccountName || member.accountName || member.name}
                            </h3>
                            <p className="text-gray-600 mb-2">
                              {member.SectorCategory?.Name || member.sectorCategory?.name || 'Transport maritime'} • 
                              Membre depuis {new Date(member.MemberSince || member.memberSince).getFullYear()}
                            </p>
                            <p className="text-gray-700 line-clamp-2">
                              {member.Description || member.description || 'Membre des Armateurs du Saint-Laurent'}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex space-x-2">
                              {member.Website && (
                                <Globe className="w-5 h-5 text-gray-500" />
                              )}
                              {member.Email && (
                                <Mail className="w-5 h-5 text-gray-500" />
                              )}
                              {member.Phone && (
                                <Phone className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                            <Button size="sm" className="rounded-full">
                              Voir le profil
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {members.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-gray-600 mb-4">Aucun membre trouvé</p>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export const MembersPage = ({ onNavigateToLogin, onNavigateToSignup, onNavigateToWebsite, onNavigateToMemberDetail }: MembersPageProps) => {
  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tous les secteurs');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Charger les membres
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const membersData = await membriApi.fetchMembers();
        
        // Enrichir les données avec images et couleurs
        const enrichedMembers = membersData.map((member: any, index: number) => ({
          ...member,
          image: MEMBER_IMAGES[index % MEMBER_IMAGES.length],
          color: MEMBER_COLORS[index % MEMBER_COLORS.length]
        }));
        
        setMembers(enrichedMembers);
        setFilteredMembers(enrichedMembers);
      } catch (error) {
        console.error('Erreur lors du chargement des membres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filtrer les membres
  useEffect(() => {
    let filtered = members;

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(member => 
        (member.AccountName || member.accountName || member.name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (member.Description || member.description || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par secteur
    if (selectedSector && selectedSector !== 'Tous les secteurs') {
      filtered = filtered.filter(member => 
        (member.SectorCategory?.Name || member.sectorCategory?.name || '') === selectedSector
      );
    }

    setFilteredMembers(filtered);
  }, [members, searchTerm, selectedSector]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <SiteHeader 
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToSignup={onNavigateToSignup}
        onNavigateToWebsite={onNavigateToWebsite}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection totalMembers={members.length} />
        <SearchAndFiltersSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <MembersListSection 
          members={filteredMembers}
          isLoading={isLoading}
          viewMode={viewMode}
          onNavigateToMemberDetail={onNavigateToMemberDetail}
        />
      </motion.div>
    </div>
  );
};