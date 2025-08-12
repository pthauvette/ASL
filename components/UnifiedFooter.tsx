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
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Armateurs Saint-Laurent</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Association représentant les armateurs canadiens depuis 1936. Nous 
              soutenons le développement du transport maritime sur le Saint-Laurent 
              et les Grands Lacs.
            </p>
            <div className="flex space-x-3">
              {[...Array(4)].map((_, index) => (
                <motion.div 
                  key={index}
                  className="w-10 h-10 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: '#374151' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-5 h-5 bg-gray-400 rounded" />
                </motion.div>
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
                    className="text-gray-300 hover:text-white transition-colors text-left"
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
                      className="text-gray-300 hover:text-white transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed">
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
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-gray-300 text-sm">+1 (418) 692-4681</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-gray-300 text-sm">info@armateur.ca</span>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onNavigateToContact}
                className="bg-blue-900 text-white hover:bg-blue-800 rounded-full w-full"
              >
                Nous contacter
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-2">Restez informé</h3>
            <p className="text-gray-300">Recevez nos dernières actualités et mises à jour sur l'industrie maritime</p>
          </motion.div>
          <motion.div 
            className="flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex max-w-md w-full">
              <Input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 rounded-l-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-blue-900 text-white hover:bg-blue-800 rounded-r-full px-6">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Armateurs du Saint-Laurent. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
              {legalLinks.map((item) => (
                <motion.button 
                  key={item.name}
                  onClick={item.onClick}
                  className="hover:text-white transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};