import { motion } from "motion/react";
import { Users, Target, Award, Calendar, ArrowRight, User, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
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

interface AssociationPageProps {
  navigationHandlers: NavigationHandlers;
}

// Section Hero
const HeroSection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&h=800&fit=crop&auto=format"
          alt="Association des Armateurs du Saint-Laurent"
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
              L'Association
            </motion.h1>
            
            <motion.h2 
              className="text-3xl font-serif leading-tight mb-8 text-gray-100 font-normal" 
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Représenter et promouvoir le transport maritime canadien depuis 1936
            </motion.h2>

            <motion.p 
              className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Les Armateurs du Saint-Laurent unissent les propriétaires et opérateurs de navires 
              pour défendre leurs intérêts et promouvoir l'excellence du transport maritime canadien.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">87+</div>
                <div className="text-white/80">années d'expérience</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">18</div>
                <div className="text-white/80">membres actifs</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-white/80">navires représentés</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Section Mission & Vision
const MissionVisionSection = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Notre Mission",
      description: "Représenter et promouvoir les intérêts des armateurs canadiens opérant sur la Voie Maritime du Saint-Laurent et les Grands Lacs."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Notre Vision",
      description: "Être la voix unifiée du transport maritime canadien et développer un secteur durable et prospère pour les générations futures."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Nos Valeurs",
      description: "Excellence opérationnelle, sécurité maritime, responsabilité environnementale et collaboration entre tous les acteurs du secteur."
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
            Mission, Vision & Valeurs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guidés par nos principes fondamentaux, nous œuvrons pour l'avenir du transport maritime canadien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
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
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
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

// Section Histoire
const HistorySection = () => {
  const milestones = [
    {
      year: "1936",
      title: "Fondation de l'ASL",
      description: "Création de l'association pour représenter les armateurs canadiens sur les Grands Lacs.",
    },
    {
      year: "1959",
      title: "Ouverture de la Voie Maritime",
      description: "Inauguration de la Voie Maritime du Saint-Laurent, révolutionnant le transport maritime.",
    },
    {
      year: "1980",
      title: "Expansion des services",
      description: "Élargissement des activités de représentation et de promotion du secteur maritime.",
    },
    {
      year: "2000",
      title: "Ère numérique",
      description: "Modernisation des opérations et adoption des nouvelles technologies maritimes.",
    },
    {
      year: "2020",
      title: "Développement durable",
      description: "Engagement vers un transport maritime plus vert et respectueux de l'environnement.",
    },
    {
      year: "2024",
      title: "Innovation continue",
      description: "Leadership dans l'adoption de solutions innovantes pour l'avenir du secteur.",
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
            Notre Histoire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plus de 85 ans d'engagement au service du transport maritime canadien
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <Badge className="bg-blue-600 text-white mb-3">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Équipe dirigeante
const LeadershipSection = () => {
  const leaders = [
    {
      name: "Pierre Leblanc",
      position: "Président-directeur général",
      bio: "Expert en transport maritime avec plus de 20 ans d'expérience dans le secteur des Grands Lacs.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format"
    },
    {
      name: "Marie Tremblay",
      position: "Directrice des opérations",
      bio: "Spécialiste en logistique maritime et gestion des relations avec les membres depuis 15 ans.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face&auto=format"
    },
    {
      name: "Jean-François Roy",
      position: "Directeur des affaires réglementaires",
      bio: "Avocat maritime expérimenté, expert en réglementation internationale et canadienne.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face&auto=format"
    },
    {
      name: "Sophie Dubois",
      position: "Directrice du développement durable",
      bio: "Ingénieure environnementale dédiée à l'innovation verte dans le transport maritime.",
      image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=300&h=300&fit=crop&crop=face&auto=format"
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
            Équipe Dirigeante
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des leaders expérimentés au service de l'excellence maritime
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <ImageWithFallback
                      src={leader.image}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {leader.position}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {leader.bio}
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

// Section Avantages d'adhésion
const BenefitsSection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  const benefits = [
    "Représentation auprès des gouvernements et organismes de réglementation",
    "Accès exclusif aux données de l'industrie et analyses de marché",
    "Participation aux événements de réseautage et conférences sectorielles",
    "Services de veille réglementaire et juridique spécialisés",
    "Programmes de formation et de développement professionnel",
    "Plateforme de collaboration entre membres de l'industrie"
  ];

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
            Pourquoi rejoindre l'ASL ?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Bénéficiez de tous les avantages d'une adhésion à l'association leader 
            du transport maritime canadien.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 text-left"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{benefit}</span>
              </motion.div>
            ))}
          </div>
          
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

export const AssociationPage = ({ navigationHandlers }: AssociationPageProps) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "L'Association", current: true }
  ];

  return (
    <ContentPageLayout
      currentView="association"
      navigationHandlers={navigationHandlers}
      breadcrumbItems={breadcrumbItems}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
        <MissionVisionSection />
        <HistorySection />
        <LeadershipSection />
        <BenefitsSection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
      </motion.div>
    </ContentPageLayout>
  );
};