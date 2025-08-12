import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, ArrowRight, MapPin, Clock, Calendar, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HeroPageLayout } from "./PageLayout";
import { membriApi } from "../utils/membriApi";

// Import des composants et assets Figma
import svgPaths from "../imports/svg-xevomu9hph";
import imgImg from "figma:asset/570243f23da77d6a1ac7b15077f8a3eaba1fc3ec.png";
import imgImg1 from "figma:asset/410c340aa057242400c608368f918307cdd72438.png";
import imgImg2 from "figma:asset/1d5ad8aaf12fd61a75197f707f6ef40c7edd6e1f.png";
import imgImg3 from "figma:asset/bec21fc75386a86210d32bec8ca98fcb2380d21e.png";
import imgImg4 from "figma:asset/382cb0e384baa64e73f058ab42b836d40983c4f4.png";
import imgImg5 from "figma:asset/9223fea86145e6dfbb549fa5928c67909467f2cd.png";
import imgImg6 from "figma:asset/01b744838454c6116265a9cad1508e071ab33771.png";
import imgImg7 from "figma:asset/c92c7f2328b345106c14a5fa435dd017c4af9f8c.png";
import imgImg8 from "figma:asset/9fb4a6e1053e905ce9ea6f07407f88df6ff41652.png";
import imgImg9 from "figma:asset/7fddb0fa231bcf8173fc8f5cefa9238927f45a3e.png";
import imgImg10 from "figma:asset/17dce852e7706a209d9e005f3e680b0d7635c2f5.png";
import imgImg11 from "figma:asset/b78d96077ca34f268b76ab0867289e57a1f5444a.png";
import imgImg12 from "figma:asset/767bbaca3d9ea2d5b6d15214584ef251906aeb78.png";
import imgImg13 from "figma:asset/7e7eb144f8dafa6aedf68d7568c72c0167501bbe.png";
import imgImg14 from "figma:asset/96d3a5a3d5ae393695c5900b87832ffbc94aed96.png";
import imgImg15 from "figma:asset/775c6b23f8192911e00982ed3e2fe52e1b269024.png";
import imgImg16 from "figma:asset/c19e09b34768e8b7f4a78306b56d02b9fa5bdd6f.png";
import imgImg17 from "figma:asset/c7dfdc218a4c7531465868b7e6b3bb2402d3b6e8.png";
import imgImg18 from "figma:asset/e5b568c924ce1f3eccd749df3feea96aaedec6dd.png";

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
  onNavigateToMemberDetail?: (memberId: string) => void;
}

interface WebsitePageProps {
  navigationHandlers: NavigationHandlers;
}

// Pool de 20 photos temporaires pour les membres
const MEMBER_PHOTOS_POOL = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1554727242-741c14fa561c?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1541752171745-4176eee47556?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1613952119411-99e46753d851?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1618641986254-7c2e181b7c7e?w=150&h=150&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&h=150&fit=crop&crop=face&auto=format"
];

// Images pour les logos des membres
const MEMBER_IMAGES = [
  imgImg5, imgImg6, imgImg7, imgImg8, imgImg9, imgImg10, imgImg11, imgImg12,
  imgImg13, imgImg14, imgImg15, imgImg16, imgImg17, imgImg18, imgImg5, imgImg6,
  imgImg7, imgImg8
];

// Couleurs pour les cartes des membres
const MEMBER_COLORS = [
  "bg-blue-100", "bg-cyan-100", "bg-green-100", "bg-yellow-100", "bg-orange-100",
  "bg-red-100", "bg-purple-100", "bg-pink-100", "bg-indigo-100", "bg-teal-100",
  "bg-emerald-100", "bg-lime-100", "bg-amber-100", "bg-rose-100", "bg-violet-100",
  "bg-sky-100", "bg-stone-100", "bg-gray-100"
];

// Fonction pour obtenir 3 photos aléatoires de membres (change à chaque refresh)
const getRandomMemberPhotos = (): string[] => {
  const shuffled = [...MEMBER_PHOTOS_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

// Hero Section avec photos aléatoires et animations
const HeroSection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  // 3 photos aléatoires qui changent à chaque refresh
  const [randomMemberPhotos] = useState(() => getRandomMemberPhotos());

  return (
    <section className="relative h-[800px] flex items-center overflow-hidden">
      {/* Background avec animation */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imgImg}')` }}
        />
        <motion.div 
          className="absolute inset-0 bg-blue-900/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-5xl">
            {/* Title avec photos de membres */}
            <div className="mb-8">
              <div className="flex items-center gap-8 mb-6">
                <motion.h1 
                  className="text-8xl font-serif leading-none text-white font-normal" 
                  style={{ fontFamily: 'Playfair Display' }}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  La Force
                </motion.h1>
                
                {/* 3 photos de membres avec animations */}
                <motion.div 
                  className="flex -space-x-4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {randomMemberPhotos.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="w-20 h-20 rounded-full border-2 border-white bg-cover bg-center shadow-xl"
                      style={{ backgroundImage: `url('${photo}')` }}
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 1 + index * 0.15, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <motion.h2 
                className="text-8xl font-serif leading-none mb-4 text-white font-normal" 
                style={{ fontFamily: 'Playfair Display' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
              >
                du transport maritime
              </motion.h2>
              
              <motion.h3 
                className="text-5xl font-serif leading-none mb-8 text-gray-100 font-normal" 
                style={{ fontFamily: 'Playfair Display' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, type: "spring", stiffness: 100 }}
              >
                sur le Saint-Laurent et au-delà
              </motion.h3>
            </div>

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-200 leading-relaxed max-w-4xl mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Soutenir la croissance de nos membres et le transport maritime sur le
              Fleuve Saint-Laurent en assurant la représentation et la promotion des
              priorités des Armateurs canadiens.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={onNavigateToSignup}
                  className="bg-white text-blue-900 hover:bg-gray-100 px-10 py-6 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Devenir membre
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-10 py-6 text-xl font-semibold rounded-full bg-transparent backdrop-blur-sm shadow-2xl transition-all duration-300"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Découvrir les Armateurs
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <motion.div 
          className="flex flex-col items-center text-white/70"
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-xs uppercase tracking-wider mb-2 font-medium">Défiler</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-white/50 rounded-full mt-1.5"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Partners Section avec animations
const PartnersSection = () => {
  const partners = [
    "Transport Canada",
    "Corporation de Gestion de la Voie Maritime", 
    "Ports du Saint-Laurent",
    "Association Maritime du Québec",
    "Chambre de Commerce Maritime"
  ];

  return (
    <motion.section 
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-gray-600">
            Partenaires officiels des Armateurs du Saint-Laurent
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div 
              key={partner} 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center h-16 mb-4">
                <div className="w-8 h-8 bg-gray-400 rounded" />
              </div>
              <h3 className="text-xl font-bold text-gray-700">{partner}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Stats Marquee avec animation
const StatsMarquee = () => {
  const stats = [
    "3 700 km de voies navigables",
    "40+ millions de tonnes transportées annuellement",
    "15 écluses sur la Voie Maritime", 
    "225 mètres de longueur maximale",
    "Navigation 8 mois par année",
    "2,5 milliards $ d'activité économique",
    "200+ navires en opération",
    "13 000 emplois directs et indirects"
  ];

  return (
    <div className="bg-gray-100 py-6 overflow-hidden">
      <motion.div 
        className="flex space-x-16 whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...stats, ...stats].map((stat, index) => (
          <div key={index} className="flex items-center space-x-2 text-gray-700">
            <span className="text-blue-600">•</span>
            <span className="text-lg font-semibold">{stat}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// About Section avec animations
const AboutSection = ({ navigationHandlers }: { navigationHandlers: NavigationHandlers }) => {
  return (
    <motion.section 
      className="py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Depuis 1936
            </h2>
            <div className="w-24 h-1 bg-blue-600 mb-8" />
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Acteur incontournable du transport maritime depuis 1936, les Armateurs du Saint-Laurent 
              (ASL) représentent les propriétaires et opérateurs de navires domestiques qui transportent 
              des marchandises et des passagers sur les eaux du Saint-Laurent, les Grands Lacs, 
              dans l'Arctique et dans les provinces maritimes.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Notre mission est de soutenir la croissance de nos membres et du transport maritime 
              en assurant la représentation et la promotion des priorités des armateurs canadiens 
              auprès des instances gouvernementales et des partenaires de l'industrie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={navigationHandlers.onNavigateToAssociation}
                  className="bg-blue-900 text-white hover:bg-blue-800 rounded-full px-8 w-full sm:w-auto"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  L'organisation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={navigationHandlers.onNavigateToMembers}
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50 rounded-full px-8 w-full sm:w-auto"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Nos membres
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div 
                className="w-full h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url('${imgImg4}')` }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Members Section avec appels API et tri alphabétique
const MembersSection = ({ onNavigateToMemberDetail }: { onNavigateToMemberDetail?: (memberId: string) => void }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Configuration responsive du carousel
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Responsive update
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Charger les membres depuis l'API Membri 365
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        console.log("🔄 Chargement des membres actifs depuis l'API Membri 365...");
        
        // Récupérer les membres actifs pour l'org ID spécifique
        const membersData = await membriApi.getActiveMembers();
        console.log("✅ Membres récupérés:", membersData.length);
        
        // Trier alphabétiquement et prendre les 18 premiers
        const sortedMembers = membersData
          .sort((a, b) => {
            const nameA = (a.AccountName || a.accountName || a.Name || a.name || '').toLowerCase();
            const nameB = (b.AccountName || b.accountName || b.Name || b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
          })
          .slice(0, 18);
        
        // Enrichir les données membres avec images et couleurs
        const enrichedMembers = sortedMembers.map((member: any, index: number) => ({
          ...member,
          image: MEMBER_IMAGES[index] || MEMBER_IMAGES[0],
          color: MEMBER_COLORS[index] || MEMBER_COLORS[0],
          displayName: member.AccountName || member.accountName || member.Name || member.name || 'Membre ASL',
          shortDescription: member.Description || member.description || 'Membre des Armateurs du Saint-Laurent',
          sector: member.SectorCategory?.Name || member.sectorCategory?.name || 'Transport maritime'
        }));
        
        setMembers(enrichedMembers);
        console.log("✅ Membres enrichis et triés:", enrichedMembers.length);
      } catch (error) {
        console.warn('⚠️ Erreur lors du chargement des membres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || members.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, members.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, members.length, itemsPerView]);

  const maxIndex = Math.max(0, members.length - itemsPerView);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleMemberClick = (memberId: string) => {
    if (onNavigateToMemberDetail) {
      onNavigateToMemberDetail(memberId);
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-900" />
            <p className="text-gray-600">Chargement des membres actifs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      className="py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Header avec contrainte de largeur */}
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="flex items-center justify-between mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-5xl font-serif leading-tight text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Membres actifs
            </h2>
            <p className="text-xl text-gray-600">{members.length} armateurs du Saint-Laurent</p>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full w-12 h-12 bg-blue-900 text-white border-blue-900 hover:bg-blue-800"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full w-12 h-12 bg-blue-900 text-white border-blue-900 hover:bg-blue-800"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Carousel full width */}
      <div className="w-full">
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex transition-transform duration-500 ease-in-out gap-8 px-8"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            onHoverStart={() => setIsAutoPlaying(false)}
            onHoverEnd={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence>
              {members.map((member, index) => (
                <motion.div 
                  key={member.ID || member.id || index} 
                  className={`flex-none ${itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-1/2' : 'w-1/3'} px-2`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card 
                    className={`${member.color} h-[450px] rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300`}
                    onClick={() => handleMemberClick(member.ID || member.id || `member-${index}`)}
                  >
                    <CardContent className="p-0 h-full">
                      <div className="relative h-[225px]">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${member.image}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button className="absolute bottom-4 right-4 bg-white/90 text-black hover:bg-white text-sm rounded-full px-4 shadow-lg">
                            En savoir plus
                          </Button>
                        </motion.div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div 
                            className="w-12 h-12 rounded-full bg-cover bg-center shadow-md"
                            style={{ backgroundImage: `url('${member.image}')` }}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-1">
                          {member.displayName}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                          {member.shortDescription}
                        </p>
                        <div className="mt-3">
                          <Badge className="bg-white/50 text-gray-700 text-xs">
                            {member.sector}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Featured Event Section avec animations
const FeaturedEventSection = () => {
  return (
    <motion.section 
      className="py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-12 text-white"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-white/20 text-white mb-4">ÉVÉNEMENT À VENIR</Badge>
              <h2 className="text-4xl font-serif leading-tight mb-4" style={{ fontFamily: 'Playfair Display' }}>
                Assemblée Générale Annuelle 2024
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Joignez-vous à nous pour notre assemblée annuelle et découvrez les dernières 
                avancées du transport maritime sur le Saint-Laurent.
              </p>
              
              <div className="flex items-center space-x-8 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>15 novembre 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>9h00 - 17h00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Montréal, QC</span>
                </div>
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 font-semibold rounded-full">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  S'inscrire maintenant
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// CTA Section finale
const CTASection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  return (
    <motion.section 
      className="py-24 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-8 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Rejoignez l'avenir du transport maritime
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Devenez membre des Armateurs du Saint-Laurent et participez au développement 
            durable du transport maritime canadien.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={onNavigateToSignup}
              className="bg-blue-900 text-white hover:bg-blue-800 px-10 py-4 text-lg font-semibold rounded-full shadow-xl"
            >
              <ArrowRight className="w-5 h-5 mr-3" />
              Commencer l'inscription
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export function WebsitePage({ navigationHandlers }: WebsitePageProps) {
  return (
    <HeroPageLayout navigationHandlers={navigationHandlers}>
      <HeroSection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
      <PartnersSection />
      <StatsMarquee />
      <AboutSection navigationHandlers={navigationHandlers} />
      <MembersSection onNavigateToMemberDetail={navigationHandlers.onNavigateToMemberDetail} />
      <FeaturedEventSection />
      <CTASection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
    </HeroPageLayout>
  );
}