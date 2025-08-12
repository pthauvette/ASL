import { motion } from "motion/react";
import { Ruler, Ship, Anchor, Globe, Calendar, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ContentPageLayout } from "./PageLayout";
import { ImageWithFallback } from "./figma/ImageWithFallback";
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

interface SaintLaurentPageProps {
  navigationHandlers: NavigationHandlers;
}

// Section Hero
const HeroSection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Image de fond - Fleuve Saint-Laurent */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1600&h=800&fit=crop&auto=format"
          alt="Fleuve Saint-Laurent"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />

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
              Le Saint-Laurent
            </motion.h1>
            
            <motion.h2 
              className="text-3xl font-serif leading-tight mb-8 text-gray-100 font-normal" 
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Artère vitale du commerce nord-américain
            </motion.h2>

            <motion.p 
              className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Le fleuve Saint-Laurent et la Voie Maritime constituent l'une des voies navigables 
              les plus importantes au monde, s'étendant sur plus de 3 700 kilomètres des Grands Lacs 
              à l'Atlantique.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">3 700 km</div>
                <div className="text-white/80">de voies navigables</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">40M+</div>
                <div className="text-white/80">tonnes transportées</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">15</div>
                <div className="text-white/80">écluses</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Section Géographie et Caractéristiques
const GeographySection = () => {
  const characteristics = [
    {
      icon: <Ruler className="w-8 h-8 text-blue-600" />,
      title: "Longueur totale",
      value: "3 700 km",
      description: "Du lac Supérieur à l'océan Atlantique"
    },
    {
      icon: <Ship className="w-8 h-8 text-blue-600" />,
      title: "Taille maximale",
      value: "225.5 m",
      description: "Longueur maximale des navires"
    },
    {
      icon: <Anchor className="w-8 h-8 text-blue-600" />,
      title: "Tirant d'eau",
      value: "8.2 m",
      description: "Profondeur maximale autorisée"
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Saison de navigation",
      value: "8 mois",
      description: "De mars à décembre"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Caractéristiques de la Voie Maritime
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un système de transport maritime unique au monde, reliant les Grands Lacs à l'océan Atlantique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {characteristics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {item.value}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Carte conceptuelle */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
                Une voie navigable historique
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Depuis plus de 65 ans, la Voie Maritime du Saint-Laurent permet aux navires océaniques 
                d'accéder au cœur du continent nord-américain. Cette prouesse d'ingénierie relie 
                8 provinces et états canadiens et américains.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="text-gray-700">15 écluses sur 370 km</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="text-gray-700">Dénivelé total de 168 mètres</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="text-gray-700">Accès à 100 ports commerciaux</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578926288207-a90a5266d50d?w=600&h=400&fit=crop&auto=format"
                alt="Écluse de la Voie Maritime"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Section Impact Économique
const EconomicImpactSection = () => {
  const impacts = [
    {
      title: "Volume de fret",
      value: "40+ millions",
      unit: "de tonnes annuellement",
      trend: "+2.5%",
      description: "Céréales, minerai de fer, sel de voirie, produits pétroliers"
    },
    {
      title: "Valeur économique",
      value: "2.5 milliards",
      unit: "$ d'activité économique",
      trend: "+3.2%",
      description: "Impact direct et indirect sur l'économie canadienne"
    },
    {
      title: "Emplois",
      value: "13 000",
      unit: "emplois directs et indirects",
      trend: "+1.8%",
      description: "Dans les secteurs maritime, portuaire et logistique"
    },
    {
      title: "Efficacité",
      value: "5x",
      unit: "plus économique",
      trend: "stable",
      description: "Comparé au transport terrestre pour le vrac"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Impact Économique
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Le Saint-Laurent joue un rôle crucial dans l'économie nord-américaine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="bg-white h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {impact.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-semibold">
                        {impact.trend}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="text-3xl font-bold text-blue-600">
                      {impact.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {impact.unit}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {impact.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section Environnement et Durabilité
const EnvironmentSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Transport Durable
            </h2>
            <div className="w-24 h-1 bg-gray-400 mb-8" />
            <p className="text-gray-600 leading-relaxed mb-8">
              Le transport maritime sur le Saint-Laurent est l'un des modes de transport 
              les plus respectueux de l'environnement. Un seul navire peut transporter 
              l'équivalent de 500 camions ou 15 trains.
            </p>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Réduction des émissions
                </h4>
                <p className="text-green-700">
                  85% moins d'émissions de CO₂ par tonne transportée comparé au transport routier
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  Efficacité énergétique
                </h4>
                <p className="text-blue-700">
                  6 fois plus efficace énergétiquement que le transport par camion
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format"
                alt="Navire écologique"
                className="w-full h-48 object-cover rounded-xl"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&auto=format"
                alt="Environnement maritime"
                className="w-full h-48 object-cover rounded-xl mt-8"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Section CTA
const CTASection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif leading-tight text-white mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Participez au développement du Saint-Laurent
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Rejoignez les Armateurs du Saint-Laurent et contribuez à l'avenir 
            du transport maritime durable au Canada.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              onClick={onNavigateToSignup}
              className="bg-white text-blue-900 hover:bg-gray-100 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300"
            >
              <ArrowRight className="w-6 h-6 mr-3" />
              Devenir membre
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const SaintLaurentPage = ({ navigationHandlers }: SaintLaurentPageProps) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "Le Saint-Laurent", current: true }
  ];

  return (
    <ContentPageLayout
      currentView="saint-laurent"
      navigationHandlers={navigationHandlers}
      breadcrumbItems={breadcrumbItems}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
        <GeographySection />
        <EconomicImpactSection />
        <EnvironmentSection />
        <CTASection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
      </motion.div>
    </ContentPageLayout>
  );
};