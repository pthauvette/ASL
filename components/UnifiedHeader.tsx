import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import type { AppView } from "../utils/form-types";

// Import du nouveau logo
import Logo17893Copy1 from "../imports/Logo17893Copy1";

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
      <header 
        className={`${isTransparent ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-50 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px] sm:h-[80px] lg:h-[110px]">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer py-2 rounded-lg hover:bg-black/5 transition-colors touch-manipulation"
              onClick={onNavigateToWebsite}
            >
              <div className="w-12 h-7 sm:w-14 sm:h-8 lg:w-16 lg:h-10 mr-3 flex-shrink-0">
                <Logo17893Copy1 color={isTransparent ? "white" : "#1e40af"} />
              </div>
              <div className="min-w-0">
                <h1 className={`text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold ${titleColor} leading-tight truncate`}>
                  Armateurs Saint-Laurent
                </h1>
                <p className={`text-xs ${isTransparent ? 'text-white/70' : 'text-gray-500'} hidden sm:block`}>
                  Depuis 1936
                </p>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav 
              className="hidden lg:flex items-center space-x-8"
            >
              {navigationItems.map((item, index) => {
                const isActive = currentView === item.view;
                
                return (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className={`relative text-base transition-all duration-200 py-2 px-1 ${
                      isActive
                        ? navItemActiveColor
                        : `${navItemBaseColor} ${navItemHoverColor}`
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          isTransparent ? 'bg-white' : 'bg-blue-900'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Portail Membre - Desktop */}
              <div
                className="hidden sm:block"
              >
                <Button 
                  onClick={onNavigateToLogin}
                  className={`${buttonVariant} rounded-full px-4 sm:px-6 py-2 transition-all duration-300 hover:scale-105 touch-manipulation`}
                >
                  Portail Membre
                </Button>
              </div>

              {/* Menu Mobile Toggle */}
              <motion.button
                className={`lg:hidden p-3 rounded-lg ${
                  isTransparent ? 'text-white' : 'text-gray-700'
                } hover:bg-black/10 transition-colors touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center`}
                onClick={handleMobileMenuToggle}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7 sm:w-6 sm:h-6" /> : <Menu className="w-7 h-7 sm:w-6 sm:h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-[70px] sm:top-[80px] left-0 right-0 bg-white border-b border-gray-200 z-50 lg:hidden max-h-[calc(100vh-70px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Navigation Links */}
                <div className="space-y-2 mb-6">
                  {navigationItems.map((item, index) => {
                    const isActive = currentView === item.view;
                    
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleMobileNavClick(item.onClick)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 touch-manipulation min-h-[56px] flex items-center ${
                          isActive
                            ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex-1">
                            <div className={`font-semibold text-base ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                              {item.name}
                            </div>
                            <div className={`text-sm mt-1 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                              {item.description}
                            </div>
                          </div>
                          {isActive && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full ml-3 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Actions Mobile */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <Button 
                    onClick={() => handleMobileNavClick(onNavigateToLogin)}
                    className="w-full bg-blue-900 text-white hover:bg-blue-800 active:bg-blue-950 rounded-xl py-4 touch-manipulation min-h-[52px] text-base font-semibold"
                  >
                    Portail Membre
                  </Button>
                  <Button 
                    onClick={() => handleMobileNavClick(onNavigateToSignup)}
                    variant="outline"
                    className="w-full border-2 border-blue-900 text-blue-900 hover:bg-blue-50 active:bg-blue-100 rounded-xl py-4 touch-manipulation min-h-[52px] text-base font-semibold"
                  >
                    Devenir Membre
                  </Button>
                </div>
                
                {/* Espacement inférieur pour les appareils avec encoche */}
                <div className="h-6 sm:h-4"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};