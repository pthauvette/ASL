import { useLanguage } from '../utils/languageContext';
import { useEffect, useState } from 'react';
import type { StepStatus } from '../App';

interface ProgressHeaderProps {
  currentStep: number;
  getStepStatus: (stepId: number) => StepStatus;
  allStepsCompleted: boolean;
  stepChangeKey: number;
  maxSteps?: number;
}

export function ProgressHeader({ 
  currentStep, 
  getStepStatus, 
  allStepsCompleted, 
  stepChangeKey,
  maxSteps = 5
}: ProgressHeaderProps) {
  const { t } = useLanguage();
  const totalSteps = maxSteps;
  const [shouldAnimateProgress, setShouldAnimateProgress] = useState(true);
  
  // Calculate progress based on completed steps
  const completedSteps = Array.from({ length: totalSteps }, (_, i) => i + 1).filter(
    stepId => getStepStatus(stepId) === 'completed'
  ).length;
  
  const percentage = allStepsCompleted ? 100 : (completedSteps / totalSteps) * 100;

  // Trigger progress animation on step changes
  useEffect(() => {
    if (stepChangeKey > 0) {
      setShouldAnimateProgress(true);
      const timer = setTimeout(() => {
        setShouldAnimateProgress(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stepChangeKey]);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-11 space-y-3 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#000033] animate-title-fade-in">
            Inscription à l'ASL
          </h1>
          {/* Removed the step counter */}
        </div>
        
        <div className="relative animate-progress-fade-in">
          {/* Progress Bar Track */}
          <div className="w-full h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden relative">
            {/* Segment-based progress bar */}
            <div className="flex h-full">
              {Array.from({ length: totalSteps }, (_, index) => {
                const stepId = index + 1;
                const status = getStepStatus(stepId);
                const isLast = index === totalSteps - 1;
                
                return (
                  <div 
                    key={`${stepId}-${stepChangeKey}`} // Force re-render on step change
                    className={`flex-1 relative transition-all duration-700 ease-in-out ${!isLast ? 'mr-px' : ''}`}
                  >
                    <div 
                      className={`
                        h-full relative overflow-hidden
                        ${status === 'completed' ? 'bg-[#000033]' : ''}
                        ${status === 'current' ? 'bg-[#000033] animate-loading-pulse' : ''}
                        ${status === 'incomplete' ? 'bg-red-500 animate-hatched' : ''}
                        ${status === 'upcoming' ? 'bg-gray-300' : ''}
                        ${shouldAnimateProgress ? 'animate-segment-fill' : ''}
                      `}
                      style={{
                        animationDelay: shouldAnimateProgress ? `${index * 150}ms` : '0ms'
                      }}
                    >
                      {/* Loading animation for current step */}
                      {status === 'current' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#000033] via-[#000066] to-[#000033] animate-loading-wave"></div>
                      )}
                      
                      {/* Hatched pattern for incomplete steps */}
                      {status === 'incomplete' && (
                        <div className="absolute inset-0 bg-hatched-pattern opacity-60"></div>
                      )}
                      
                      {/* Shimmer for completed steps */}
                      {status === 'completed' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Step Markers - Positioned between steps */}
          <div className="hidden sm:block absolute top-0 left-0 w-full h-2 sm:h-2.5 pointer-events-none">
            {Array.from({ length: totalSteps - 1 }, (_, index) => {
              // Position markers between steps (after step 1, 2, 3, 4)
              const followingStepId = index + 2; // The step that comes after the marker
              const status = getStepStatus(followingStepId);
              
              return (
                <div
                  key={`marker-${followingStepId}-${stepChangeKey}`}
                  className={`
                    absolute top-1/2 w-3 h-3 rounded-full border-2 border-white transition-all duration-500 ease-in-out
                    ${status === 'completed' ? 'bg-[#000033] shadow-md transform scale-110' : ''}
                    ${status === 'current' ? 'bg-[#000033] shadow-lg ring-2 ring-[#000033]/20 ring-offset-1 animate-current-marker transform scale-125' : ''}
                    ${status === 'incomplete' ? 'bg-red-500 shadow-md animate-pulse-error' : ''}
                    ${status === 'upcoming' ? 'bg-gray-400' : ''}
                    ${shouldAnimateProgress ? 'animate-marker-pop' : ''}
                  `}
                  style={{
                    left: `${((index + 1) / totalSteps) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: shouldAnimateProgress ? `${(index + 1) * 100}ms` : '0ms'
                  }}
                />
              );
            })}
          </div>
          
          {/* Progress Text */}
          <div className="mt-2 flex justify-between items-center">
            <span className={`text-xs sm:text-sm text-[#43464b] font-medium ${shouldAnimateProgress ? 'animate-percentage-update' : ''}`}>
              {Math.round(percentage)}% terminé
            </span>
            <span className="text-xs sm:text-sm text-[#43464b]">
              {completedSteps} / {totalSteps} étapes complétées
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes titleFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes segmentFill {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        @keyframes markerPop {
          0% {
            transform: translate(-50%, -50%) scale(0);
          }
          70% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes loadingWave {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes loadingPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes hatched {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 20px 20px;
          }
        }

        @keyframes shimmerSlow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes currentMarker {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1.25);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.4);
          }
        }

        @keyframes pulseError {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes percentageUpdate {
          from {
            transform: scale(0.8);
            opacity: 0.6;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-title-fade-in {
          animation: titleFadeIn 0.6s ease-out forwards;
        }

        .animate-progress-fade-in {
          animation: progressFadeIn 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-segment-fill {
          animation: segmentFill 0.6s ease-out forwards;
        }

        .animate-marker-pop {
          animation: markerPop 0.5s ease-out forwards;
        }

        .animate-loading-wave {
          animation: loadingWave 2s ease-in-out infinite;
        }

        .animate-loading-pulse {
          animation: loadingPulse 1.5s ease-in-out infinite;
        }

        .animate-hatched {
          background-image: 
            linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.3) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.3) 75%);
          background-size: 10px 10px;
          animation: hatched 1s linear infinite;
        }

        .bg-hatched-pattern {
          background-image: 
            linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.4) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.4) 75%);
          background-size: 8px 8px;
          animation: hatched 1.5s linear infinite;
        }

        .animate-shimmer-slow {
          animation: shimmerSlow 3s ease-in-out infinite;
        }

        .animate-current-marker {
          animation: currentMarker 2s ease-in-out infinite;
        }

        .animate-pulse-error {
          animation: pulseError 1s ease-in-out infinite;
        }

        .animate-percentage-update {
          animation: percentageUpdate 0.3s ease-out forwards;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-title-fade-in {
            animation-duration: 0.4s;
          }
          
          .animate-progress-fade-in {
            animation-delay: 0.1s;
            animation-duration: 0.4s;
          }
        }

        /* Accessibility - reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-title-fade-in,
          .animate-progress-fade-in,
          .animate-segment-fill,
          .animate-marker-pop,
          .animate-loading-wave,
          .animate-loading-pulse,
          .animate-hatched,
          .animate-shimmer-slow,
          .animate-current-marker,
          .animate-pulse-error,
          .animate-percentage-update {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          
          .bg-hatched-pattern {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}