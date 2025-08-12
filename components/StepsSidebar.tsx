import { Check, HelpCircle, Menu, X, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import type { StepStatus } from '../App';

interface StepsSidebarProps {
  currentStep: number;
  getStepStatus: (stepId: number) => StepStatus;
  onStepClick: (stepId: number) => void;
  stepChangeKey: number;
  isInitialLoad: boolean;
  visitedSteps: number[];
  stepTitles?: Array<{ id: number; title: string; description: string }>;
  maxSteps?: number;
}

export function StepsSidebar({ 
  currentStep, 
  getStepStatus, 
  onStepClick, 
  stepChangeKey, 
  isInitialLoad,
  visitedSteps,
  stepTitles,
  maxSteps = 5
}: StepsSidebarProps) {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(isInitialLoad);
  
  // Use provided stepTitles or fallback to default
  const steps = stepTitles?.map(step => ({
    id: step.id,
    title: step.title,
    status: step.id === currentStep ? "En cours" : ""
  })) || [
    { id: 1, title: "Informations sur l'organisation", status: "En cours" },
    { id: 2, title: "Choix de la catégorie d'adhésion", status: "" },
    { id: 3, title: "Contact principal", status: "" },
    { id: 4, title: "Délégués supplémentaires", status: "" },
    { id: 5, title: "Revue et soumission", status: "" }
  ];

  // Trigger animations on initial load and step changes
  useEffect(() => {
    if (!isInitialLoad && stepChangeKey > 0) {
      setShouldAnimate(true);
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 400); // Reduced duration
      return () => clearTimeout(timer);
    }
  }, [stepChangeKey, isInitialLoad]);

  const getStepStatusText = (stepId: number): string => {
    const status = getStepStatus(stepId);
    const hasBeenVisited = visitedSteps?.includes(stepId) || false;
    
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'incomplete':
        // Only show "Incomplet" if step has been visited
        return hasBeenVisited ? 'Incomplet' : '';
      case 'current':
        return 'En cours';
      case 'upcoming':
        return '';
      default:
        return '';
    }
  };

  const handleStepClick = (stepId: number) => {
    // NAVIGATION LIBRE - permettre la navigation vers toutes les étapes
    onStepClick(stepId);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6 w-full md:w-64 h-fit">
      <div className="flex items-center justify-between md:justify-start mb-6">
        <h2 className="text-lg font-bold text-[#000033]">Étapes d'inscription</h2>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const statusText = getStepStatusText(step.id);
          const hasBeenVisited = visitedSteps?.includes(step.id) || false;
          // TOUTES les étapes sont cliquables maintenant
          const isClickable = true;
          
          return (
            <div 
              key={step.id} 
              className={`
                flex items-start space-x-3 transition-all duration-150 ease-out
                ${isClickable ? 'cursor-pointer hover:opacity-95' : 'cursor-default'}
                ${shouldAnimate || isInitialLoad ? 'animate-step-fade-in' : ''}
              `}
              style={{
                animationDelay: shouldAnimate || isInitialLoad ? `${index * 50}ms` : '0ms',
              }}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                  transition-all duration-200 ease-out relative
                  ${status === 'completed' ? 'bg-green-600 text-white' : ''}
                  ${status === 'current' ? 'bg-[#000033] text-white ring-2 ring-[#000033]/10 ring-offset-1' : ''}
                  ${status === 'incomplete' ? 'bg-red-500 text-white' : ''}
                  ${status === 'upcoming' ? 'bg-gray-200 text-gray-500' : ''}
                `}>
                  {status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : status === 'incomplete' && hasBeenVisited ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`
                    w-0.5 h-6 mt-2 transition-colors duration-200 ease-out
                    ${status === 'completed' ? 'bg-green-600' : ''}
                    ${status === 'current' ? 'bg-[#000033]' : ''}
                    ${status === 'incomplete' && hasBeenVisited ? 'bg-red-500' : ''}
                    ${status === 'upcoming' || (status === 'incomplete' && !hasBeenVisited) ? 'bg-gray-200' : ''}
                  `} />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`
                  text-sm font-medium transition-colors duration-150 ease-out
                  ${status === 'upcoming' ? 'text-gray-700 hover:text-gray-900' : ''}
                  ${status === 'current' ? 'text-[#000033]' : ''}
                  ${status === 'completed' ? 'text-green-700 hover:text-green-800' : ''}
                  ${status === 'incomplete' && hasBeenVisited ? 'text-red-600 hover:text-red-700' : ''}
                  ${status === 'incomplete' && !hasBeenVisited ? 'text-gray-700 hover:text-gray-900' : ''}
                  ${isClickable ? 'hover:underline' : ''}
                `}>
                  {step.title}
                </p>
                {statusText && (
                  <p className={`
                    text-xs mt-1 transition-colors duration-150 ease-out
                    ${status === 'completed' ? 'text-green-600' : ''}
                    ${status === 'current' ? 'text-[#000033]' : ''}
                    ${status === 'incomplete' && hasBeenVisited ? 'text-red-500 font-medium' : ''}
                  `}>
                    {statusText}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Help section */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex items-start space-x-3">
          <HelpCircle className="w-4 h-4 text-[#000033] mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-[#000033] mb-2">Besoin d'aide?</h3>
            <p className="text-xs text-gray-600 leading-4">
              Si vous avez besoin d'assistance, veuillez contacter notre équipe de support à support@asl.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-white shadow-md border-[#000033]/20 hover:bg-gray-50 transition-colors duration-150"
        >
          <Menu className="h-4 w-4 mr-2" />
          Étapes
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <div className={`${shouldAnimate || isInitialLoad ? 'animate-sidebar-slide-in' : ''}`}>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 animate-overlay-fade-in">
          <div className="fixed left-0 top-0 h-full w-80 max-w-[90vw] bg-[#fafaf0] p-4 overflow-y-auto animate-mobile-sidebar-slide-in">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Simplified CSS animations */}
      <style>{`
        @keyframes stepFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sidebar-slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes mobile-sidebar-slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes overlay-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-step-fade-in {
          animation: stepFadeIn 0.3s ease-out forwards;
          opacity: 0;
        }

        .animate-sidebar-slide-in {
          animation: sidebar-slide-in 0.4s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .animate-mobile-sidebar-slide-in {
          animation: mobile-sidebar-slide-in 0.2s ease-out forwards;
        }

        .animate-overlay-fade-in {
          animation: overlay-fade-in 0.15s ease-out forwards;
        }

        /* Accessibility - reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-step-fade-in,
          .animate-sidebar-slide-in,
          .animate-mobile-sidebar-slide-in,
          .animate-overlay-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}