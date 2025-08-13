import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from '../utils/languageContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const { currentLang, setLanguage } = useLanguage();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#000033] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl">ASL</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-[#000033] truncate">
              <span className="hidden sm:inline">Association de la Sécurité Logistique</span>
              <span className="sm:hidden">ASL</span>
            </span>
          </div>
          
          {/* Desktop Navigation and Language Selector */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-sm font-medium">
                Accueil
              </a>
              <a href="#" className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-sm font-medium">
                Services
              </a>
              <a href="#" className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-sm font-medium">
                À propos
              </a>
              <a href="#" className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-sm font-medium">
                Contact
              </a>
            </nav>
            
            {/* Desktop Language Selector */}
            <div className="flex items-center">
              <Select value={currentLang} onValueChange={setLanguage}>
                <SelectTrigger className="w-24 h-8 text-sm border-[#000033]/20 hover:border-[#000033]/40 transition-colors duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Menu Button and Language Selector */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Mobile Language Selector - Fixed width to show full text */}
            <div className="flex items-center">
              <Select value={currentLang} onValueChange={setLanguage}>
                <SelectTrigger className="w-20 h-8 text-xs border-[#000033]/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="p-2"
            >
              {isMobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileNavOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 animate-mobile-nav-slide-down">
            <nav className="flex flex-col space-y-3 pt-4">
              <a 
                href="#" 
                className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-base font-medium py-2 px-1"
                onClick={() => setIsMobileNavOpen(false)}
              >
                Accueil
              </a>
              <a 
                href="#" 
                className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-base font-medium py-2 px-1"
                onClick={() => setIsMobileNavOpen(false)}
              >
                Services
              </a>
              <a 
                href="#" 
                className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-base font-medium py-2 px-1"
                onClick={() => setIsMobileNavOpen(false)}
              >
                À propos
              </a>
              <a 
                href="#" 
                className="text-[#43464b] hover:text-[#000033] transition-colors duration-200 text-base font-medium py-2 px-1"
                onClick={() => setIsMobileNavOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Mobile Navigation Animation Styles */}
      <style>{`
        @keyframes mobile-nav-slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 200px;
          }
        }

        .animate-mobile-nav-slide-down {
          animation: mobile-nav-slide-down 0.3s ease-out forwards;
        }

        /* Smooth transitions for mobile menu */
        nav a {
          transition: all 0.2s ease-out;
        }

        nav a:hover {
          transform: translateX(4px);
        }

        /* Ensure proper touch targets on mobile */
        @media (max-width: 1024px) {
          nav a {
            min-height: 44px;
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </header>
  );
}