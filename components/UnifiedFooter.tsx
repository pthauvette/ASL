import { motion } from "motion/react";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { AppView } from "../utils/form-types";

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
  onNavigateToSignup: () => void;
}

interface UnifiedFooterProps {
  currentView: AppView;
  navigationHandlers: NavigationHandlers;
}

export const UnifiedFooter = ({ currentView, navigationHandlers }: UnifiedFooterProps) => {
  const {
    onNavigateToWebsite,
    onNavigateToAssociation,
    onNavigateToSaintLaurent,
    onNavigateToMembers,
    onNavigateToEvents,
    onNavigateToContact,
    onNavigateToDossiers,
    onNavigateToPrivacyPolicy,
    onNavigateToTerms,
    onNavigateToSitemap,
    onNavigateToSignup
  } = navigationHandlers;

  const navigationLinks = [
    { name: "Accueil", onClick: onNavigateToWebsite },
    { name: "À propos d'ASL", onClick: onNavigateToAssociation },
    { name: "Nos membres", onClick: onNavigateToMembers },
    { name: "Le Saint-Laurent", onClick: onNavigateToSaintLaurent },
    { name: "Dossiers", onClick: onNavigateToDossiers },
    { name: "Événements", onClick: onNavigateToEvents }
  ];

  const serviceLinks = [
    { name: "Représentation", onClick: undefined },
    { name: "Promotion", onClick: undefined },
    { name: "Formation", onClick: undefined },
    { name: "Sécurité maritime", onClick: undefined },
    { name: "Réglementation", onClick: undefined },
    { name: "Devenir membre", onClick: onNavigateToSignup }
  ];

  const legalLinks = [
    { name: "Politique de confidentialité", onClick: onNavigateToPrivacyPolicy },
    { name: "Conditions d'utilisation", onClick: onNavigateToTerms },
    { name: "Plan du site", onClick: onNavigateToSitemap }
  ];

  return (
    <motion.footer 
      className="bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            className="sm:col-span-2 lg:col-span-1"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Armateurs Saint-Laurent</h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              Association représentant les armateurs canadiens depuis 1936. Nous 
              soutenons le développement du transport maritime sur le Saint-Laurent 
              et les Grands Lacs.
            </p>
            <div className="flex space-x-3">
              {[...Array(4)].map((_, index) => (
                <motion.button 
                  key={index}
                  className="w-10 h-10 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center touch-manipulation hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Réseau social ${index + 1}`}
                >
                  <div className="w-5 h-5 bg-gray-400 rounded" />
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((item) => (
                <motion.li key={item.name} whileHover={{ x: 5 }}>
                  <button 
                    onClick={item.onClick}
                    className="text-gray-300 hover:text-white transition-colors text-left text-sm sm:text-base py-1 touch-manipulation"
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <motion.li key={item.name} whileHover={{ x: 5 }}>
                  {item.onClick ? (
                    <button 
                      onClick={item.onClick}
                      className="text-gray-300 hover:text-white transition-colors text-left text-sm sm:text-base py-1 touch-manipulation"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed text-sm sm:text-base">
                      {item.name}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  101 Rue Saint-Paul<br />
                  Québec, QC G1K 3V8<br />
                  Canada
                </span>
              </div>
              <button className="flex items-center text-left touch-manipulation hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (418) 692-4681</span>
              </button>
              <button className="flex items-center text-left touch-manipulation hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@armateur.ca</span>
              </button>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={onNavigateToContact}
                className="bg-blue-900 text-white hover:bg-blue-800 rounded-xl w-full py-3 touch-manipulation min-h-[48px]"
              >
                Nous contacter
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">Restez informé</h3>
            <p className="text-gray-300 text-sm sm:text-base">Recevez nos dernières actualités et mises à jour sur l'industrie maritime</p>
          </motion.div>
          <motion.div 
            className="flex justify-center px-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row max-w-md w-full space-y-3 sm:space-y-0">
              <Input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 sm:rounded-l-xl sm:rounded-r-none rounded-xl bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500 min-h-[48px] touch-manipulation"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-shrink-0">
                <Button className="bg-blue-900 text-white hover:bg-blue-800 sm:rounded-r-xl sm:rounded-l-none rounded-xl px-6 w-full sm:w-auto min-h-[48px] touch-manipulation">
                  <ArrowRight className="w-4 h-4 sm:mr-0 mr-2" />
                  <span className="sm:hidden">S'abonner</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 Armateurs du Saint-Laurent. Tous droits réservés.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-end space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              {legalLinks.map((item) => (
                <motion.button 
                  key={item.name}
                  onClick={item.onClick}
                  className="hover:text-white transition-colors py-1 touch-manipulation text-center"
                  whileHover={{ y: -1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Espacement pour les appareils avec encoche */}
        <div className="h-4 sm:h-0"></div>
      </div>
    </motion.footer>
  );
};