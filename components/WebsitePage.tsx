import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play, ArrowRight, MapPin, Clock, Calendar, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HeroPageLayout } from "./PageLayout";
import { membriApi } from "../utils/membriApi";
import { toast } from "sonner@2.0.3";

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
  imgImg5, imgImg6, imgImg7, imgImg8, imgImg9, imgImg10, imgImg11, imgImg12,
  imgImg5, imgImg6
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
    <section className="relative min-h-[100vh] sm:min-h-[80vh] lg:h-[800px] flex items-center overflow-hidden">
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
      <div className="relative z-10 w-full pt-20 sm:pt-24 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            {/* Title avec photos de membres */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-8 mb-4 sm:mb-6">
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-tight lg:leading-none text-white font-normal flex-shrink-0" 
                  style={{ fontFamily: 'Playfair Display' }}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
                >
                La Force
                </motion.h1>
             
    <motion.div 
                  className="flex -space-x-2 sm:-space-x-4 flex-shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {randomMemberPhotos.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-white bg-cover bg-center shadow-xl"
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-tight lg:leading-none mb-2 sm:mb-4 text-white font-normal whitespace-nowrap" 
                style={{ fontFamily: 'Playfair Display' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
              >
                du transport maritime
              </motion.h2>
              
              <motion.h3 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight mb-6 sm:mb-8 text-gray-100 font-normal" 
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
              className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mb-8 sm:mb-12"
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
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  onClick={onNavigateToSignup}
                  className="bg-white text-blue-900 hover:bg-gray-100 w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-7 text-lg sm:text-xl lg:text-2xl font-semibold rounded-full shadow-2xl transition-all duration-300 min-h-[56px]"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Devenir membre
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-7 text-lg sm:text-xl lg:text-2xl font-semibold rounded-full bg-transparent backdrop-blur-sm shadow-2xl transition-all duration-300 min-h-[56px]"
                >
                  <Play className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Découvrir les Armateurs</span>
                  <span className="sm:hidden">Découvrir</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - masqué sur mobile */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:block"
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
      className="py-12 sm:py-16 lg:py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-base text-gray-600">
            Partenaires officiels des Armateurs du Saint-Laurent
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div 
              key={partner} 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center h-12 sm:h-16 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-700 leading-tight">
                {partner}
              </h3>
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
const AboutSection = () => {
  return (
    <motion.section 
      className="py-12 sm:py-16 lg:py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Depuis 1936
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gray-400 mb-6 sm:mb-8" />
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
              Acteur incontournable du transport maritime depuis 1936, ASL est une association 
              représentant 12 propriétaires et opérateurs de navires domestiques, qui transportent 
              des marchandises et des passagers sur les eaux du Saint-Laurent, mais également sur 
              les Grands Lacs, dans l'Arctique et dans les provinces maritimes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 sm:px-8 w-full sm:w-auto min-h-[48px] touch-manipulation">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  L'organisation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 sm:px-8 w-full sm:w-auto min-h-[48px] touch-manipulation">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  L'équipe
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative order-first lg:order-last"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <div 
                className="w-full h-64 sm:h-80 lg:h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url('${imgImg4}')` }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Members Section avec appels API rétablis
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

  // Charger les membres depuis l'API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const membersData = await membriApi.getMembers();
        
        // Enrichir les données membres avec images et couleurs
        const enrichedMembers = membersData.slice(0, 18).map((member: any, index: number) => ({
          ...member,
          image: MEMBER_IMAGES[index] || MEMBER_IMAGES[0],
          color: MEMBER_COLORS[index] || MEMBER_COLORS[0],
          displayName: member.AccountName || member.accountName || member.Name || member.name,
          shortDescription: member.Description || member.description || 'Membre des Armateurs du Saint-Laurent',
          sector: member.SectorCategory?.Name || member.sectorCategory?.name || 'Transport maritime'
        }));
        
        setMembers(enrichedMembers);
      } catch (error) {
        console.warn('Erreur lors du chargement des membres:', error);
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
          
          {/* Navigation arrows seulement */}
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
              <span className="text-base text-white/80 ml-4">15 FÉVRIER 2024</span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl font-serif leading-tight mb-6 mt-8" 
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Conférence Maritime 2025
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Forum annuel sur l'avenir du transport maritime sur les Grands Lacs et la 
              Voie Maritime du Saint-Laurent. Rejoignez les leaders de l'industrie pour 
              discuter des innovations et défis du secteur.
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-8 mb-12"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Centre des congrès de Québec</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>9h00 - 17h00</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-blue-900 hover:bg-gray-100 rounded-full px-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  Billeterie
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 bg-transparent">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  En savoir plus
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// News Section avec animations
const NewsSection = () => {
  const newsArticles = [
    {
      id: '1',
      title: 'Investissements de 250M$ pour moderniser la Voie Maritime',
      excerpt: 'Le gouvernement annonce des investissements majeurs pour améliorer l\'infrastructure de la Voie Maritime du Saint-Laurent.',
      date: '8 janvier 2024',
      category: 'COMMUNIQUÉ',
      categoryColor: 'bg-blue-900',
      image: imgImg13
    },
    {
      id: '2',
      title: 'Initiative Verte: Réduction des émissions de 30%',
      excerpt: 'Lancement d\'un programme collaboratif pour réduire l\'empreinte carbone du transport maritime sur le Saint-Laurent.',
      date: '5 janvier 2024',
      category: 'PROJET',
      categoryColor: 'bg-green-600',
      image: imgImg14
    },
    {
      id: '3',
      title: 'Bilan 2023: Record de tonnage transporté',
      excerpt: 'Les membres d\'ASL ont transporté plus de 42 millions de tonnes en 2023, un record historique pour l\'association.',
      date: '2 janvier 2024',
      category: 'ÉVÉNEMENT',
      categoryColor: 'bg-orange-500',
      image: imgImg15
    },
    {
      id: '4',
      title: 'Programme de formation en sécurité maritime',
      excerpt: 'Nouveau programme de certification pour les équipages naviguant sur la Voie Maritime du Saint-Laurent.',
      date: '28 décembre 2023',
      category: 'FORMATION',
      categoryColor: 'bg-blue-600',
      image: imgImg16
    },
    {
      id: '5',
      title: 'Digitalisation des opérations portuaires',
      excerpt: 'Mise en place de systèmes de suivi en temps réel pour optimiser les opérations de chargement et déchargement.',
      date: '22 décembre 2023',
      category: 'INNOVATION',
      categoryColor: 'bg-purple-600',
      image: imgImg17
    },
    {
      id: '6',
      title: 'Accord de coopération avec les ports européens',
      excerpt: 'Signature d\'un protocole d\'entente pour faciliter les échanges commerciaux entre le Saint-Laurent et l\'Europe.',
      date: '18 décembre 2023',
      category: 'PARTENARIAT',
      categoryColor: 'bg-red-600',
      image: imgImg18
    }
  ];

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
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif leading-tight text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
            Dernières actualités
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Badge className={`${article.categoryColor} text-white text-xs`}>
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-500 ml-2">{article.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    
                    <motion.div whileHover={{ x: 5 }}>
                      <Button variant="link" className="text-blue-900 p-0 h-auto">
                        Lire la suite <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-blue-900 text-white hover:bg-blue-800 rounded-full px-12 py-4 text-lg">
              Voir toutes les actualités
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export function WebsitePage({ navigationHandlers }: WebsitePageProps) {
  return (
    <HeroPageLayout
      currentView="website"
      navigationHandlers={navigationHandlers}
    >
      <HeroSection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
      <PartnersSection />
      <StatsMarquee />
      <AboutSection />
      <MembersSection onNavigateToMemberDetail={navigationHandlers.onNavigateToMemberDetail} />
      <FeaturedEventSection />
      <NewsSection />
    </HeroPageLayout>
  );
}