import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import type { AppView } from "../utils/form-types";

// Import des SVG et assets
import svgPaths from "../imports/svg-xevomu9hph";

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

interface UnifiedHeaderProps {
  currentView: AppView;
  navigationHandlers: NavigationHandlers;
  variant?: 'transparent' | 'white';
}

export const UnifiedHeader = ({ 
  currentView, 
  navigationHandlers,
  variant = 'white'
}: UnifiedHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    onNavigateToWebsite,
    onNavigateToAssociation,
    onNavigateToSaintLaurent,
    onNavigateToMembers,
    onNavigateToEvents,
    onNavigateToContact,
    onNavigateToDossiers,
    onNavigateToLogin,
    onNavigateToSignup
  } = navigationHandlers;

  // Navigation principale - ordre logique et complet - MÊME MENU POUR TOUTES LES PAGES
  const navigationItems = [
    { 
      name: "L'Association", 
      view: 'association' as AppView,
      onClick: onNavigateToAssociation,
      description: "Notre histoire et mission"
    },
    { 
      name: "Le Saint-Laurent", 
      view: 'saint-laurent' as AppView,
      onClick: onNavigateToSaintLaurent,
      description: "La voie maritime"
    },
    { 
      name: "Dossiers", 
      view: 'dossiers' as AppView,
      onClick: onNavigateToDossiers,
      description: "Documents et publications"
    },
    { 
      name: "Événements", 
      view: 'events' as AppView,
      onClick: onNavigateToEvents,
      description: "Calendrier et conférences"
    },
    { 
      name: "Contact", 
      view: 'contact' as AppView,
      onClick: onNavigateToContact,
      description: "Nous joindre"
    }
  ];

  const isTransparent = variant === 'transparent';
  const headerBg = isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200';
  const logoColor = isTransparent ? 'white' : '#1e40af';
  const titleColor = isTransparent ? 'text-white' : 'text-blue-900';
  const navItemBaseColor = isTransparent ? 'text-white/90' : 'text-gray-700';
  const navItemActiveColor = isTransparent ? 'text-white font-semibold border-b-2 border-white/50' : 'text-blue-900 font-semibold border-b-2 border-blue-900';
  const navItemHoverColor = isTransparent ? 'hover:text-white' : 'hover:text-blue-900';
  const buttonVariant = isTransparent 
    ? 'border border-white text-white hover:bg-white/10 bg-transparent' 
    : 'border border-blue-900 text-blue-900 hover:bg-blue-50 bg-transparent';

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (onClick: () => void) => {
    onClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        className={`${isTransparent ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-50 ${headerBg}`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px] lg:h-[110px]">
            {/* Logo */}
            <motion.div 
              className="flex items-center cursor-pointer"
              onClick={onNavigateToWebsite}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="w-8 h-8 mr-3">
                <svg className="w-full h-full" viewBox="0 0 39 21" fill="none">
                  <path d={svgPaths.p3d807000} fill={logoColor} />
                  <path d={svgPaths.p31e6aa00} fill={logoColor} />
                  <path d={svgPaths.p33541480} fill={logoColor} />
                  <path d={svgPaths.p34b29d80} fill={logoColor} />
                </svg>
              </div>
              <div>
                <h1 className={`text-xl lg:text-2xl font-bold ${titleColor} leading-tight`}>
                  Armateurs Saint-Laurent
                </h1>
                <p className={`text-xs ${isTransparent ? 'text-white/70' : 'text-gray-500'} hidden sm:block`}>
                  Depuis 1936
                </p>
              </div>
            </motion.div>

            {/* Navigation Desktop */}
            <motion.nav 
              className="hidden lg:flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {navigationItems.map((item, index) => {
                const isActive = currentView === item.view;
                
                return (
                  <motion.button
                    key={item.name}
                    onClick={item.onClick}
                    className={`relative text-base transition-all duration-200 py-2 px-1 ${
                      isActive
                        ? navItemActiveColor
                        : `${navItemBaseColor} ${navItemHoverColor}`
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          isTransparent ? 'bg-white' : 'bg-blue-900'
                        }`}
                        layoutId="activeNavIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-4">
              {/* Portail Membre - Desktop */}
              <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <Button 
                  onClick={onNavigateToLogin}
                  className={`${buttonVariant} rounded-full px-6 py-2 transition-all duration-200`}
                >
                  Portail Membre
                </Button>
              </motion.div>

              {/* Menu Mobile Toggle */}
              <motion.button
                className={`lg:hidden p-2 rounded-md ${
                  isTransparent ? 'text-white' : 'text-gray-700'
                } hover:bg-white/10 transition-colors`}
                onClick={handleMobileMenuToggle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile Fixe */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            
            {/* Menu Panel - Position fixe depuis le haut */}
            <motion.div
              className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 lg:hidden"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ 
                paddingTop: isTransparent ? '80px' : '80px',
                minHeight: '100vh'
              }}
            >
              {/* Header mobile dans le menu pour continuité */}
              <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo dans le menu mobile */}
                  <div className="flex items-center cursor-pointer" onClick={onNavigateToWebsite}>
                    <div className="w-6 h-6 mr-2">
                      <svg className="w-full h-full" viewBox="0 0 39 21" fill="none">
                        <path d={svgPaths.p3d807000} fill="#1e40af" />
                        <path d={svgPaths.p31e6aa00} fill="#1e40af" />
                        <path d={svgPaths.p33541480} fill="#1e40af" />
                        <path d={svgPaths.p34b29d80} fill="#1e40af" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-blue-900 leading-tight">
                        Armateurs Saint-Laurent
                      </h1>
                      <p className="text-xs text-gray-500">
                        Depuis 1936
                      </p>
                    </div>
                  </div>
                  
                  {/* Bouton fermer */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Navigation Links */}
                <div className="space-y-4 mb-6">
                  {navigationItems.map((item, index) => {
                    const isActive = currentView === item.view;
                    
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleMobileNavClick(item.onClick)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-900 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-semibold ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                              {item.name}
                            </div>
                            <div className={`text-sm ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                              {item.description}
                            </div>
                          </div>
                          {isActive && (
                            <motion.div 
                              className="w-2 h-2 bg-blue-600 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Actions Mobile */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Button 
                      onClick={() => handleMobileNavClick(onNavigateToLogin)}
                      className="w-full bg-blue-900 text-white hover:bg-blue-800 rounded-lg py-3"
                    >
                      Portail Membre
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                  >
                    <Button 
                      onClick={() => handleMobileNavClick(onNavigateToSignup)}
                      variant="outline"
                      className="w-full border-blue-900 text-blue-900 hover:bg-blue-50 rounded-lg py-3"
                    >
                      Devenir Membre
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};