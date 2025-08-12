import { Users, BookOpen, TrendingUp } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

interface WhyJoinSectionProps {
  currentStep: number;
}

export function WhyJoinSection({ currentStep }: WhyJoinSectionProps) {
  const { t } = useLanguage();
  const totalSteps = 5;
  const percentage = (currentStep / totalSteps) * 100;
  const stepsRemaining = totalSteps - currentStep;

  const benefits = [
    {
      icon: Users,
      title: "Connexions industrielles",
      description: "Établissez des relations avec les principaux acteurs et décideurs de l'industrie.",
      delay: 0
    },
    {
      icon: BookOpen,
      title: "Partage de connaissances", 
      description: "Accédez à des recherches exclusives, études de cas et meilleures pratiques.",
      delay: 0.1
    },
    {
      icon: TrendingUp,
      title: "Croissance professionnelle",
      description: "Améliorez vos compétences grâce à des formations et ateliers spécialisés.",
      delay: 0.2
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 animate-section-fade-in">
      {/* Section Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-bold text-[#000033] animate-header-slide-in">
            Pourquoi rejoindre ASL?
          </h2>
          
          {/* Progress Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 animate-progress-summary-fade-in">
            <span className="text-sm text-[#000033] font-medium">
              Votre progression: {Math.round(percentage)}%
            </span>
            <div className="w-full sm:w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-1.5 bg-[#000033] rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="group border border-gray-200 rounded-lg p-4 sm:p-6 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 animate-benefit-card-fade-in"
              style={{ animationDelay: `${benefit.delay + 0.3}s` }}
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#000033]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 ease-out group-hover:bg-[#000033]/15 group-hover:scale-110">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#000033] transition-transform duration-300 ease-out group-hover:scale-110" />
              </div>
              
              {/* Content */}
              <h3 className="font-medium text-[#43464b] mb-2 sm:mb-3 text-sm sm:text-base group-hover:text-[#000033] transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* Steps Remaining Message */}
      <div className="text-center animate-message-fade-in">
        <p className="text-sm text-gray-500">
          {stepsRemaining > 0 
            ? `Plus que ${stepsRemaining} étape${stepsRemaining > 1 ? 's' : ''} pour compléter votre demande d'adhésion`
            : "Félicitations! Votre demande d'adhésion est terminée."
          }
        </p>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes sectionFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes headerSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes progressSummaryFadeIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes benefitCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes messageFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-section-fade-in {
          animation: sectionFadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-header-slide-in {
          animation: headerSlideIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-progress-summary-fade-in {
          animation: progressSummaryFadeIn 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-benefit-card-fade-in {
          animation: benefitCardFadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-message-fade-in {
          animation: messageFadeIn 0.6s ease-out 0.8s forwards;
          opacity: 0;
        }

        /* Hover effects for benefit cards */
        .group:hover .w-10,
        .group:hover .w-12 {
          animation: iconFloat 2s ease-in-out infinite;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-section-fade-in {
            animation-duration: 0.6s;
          }
          
          .animate-header-slide-in,
          .animate-progress-summary-fade-in,
          .animate-benefit-card-fade-in {
            animation-duration: 0.4s;
          }
          
          .animate-benefit-card-fade-in {
            animation-delay: 0.1s;
          }
          
          .animate-message-fade-in {
            animation-delay: 0.5s;
            animation-duration: 0.4s;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid-cols-2 > div:nth-child(3) {
            grid-column: 1 / -1;
            max-width: 50%;
            margin: 0 auto;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-section-fade-in,
          .animate-header-slide-in,
          .animate-progress-summary-fade-in,
          .animate-benefit-card-fade-in,
          .animate-message-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .group:hover .w-10,
          .group:hover .w-12 {
            animation: none;
          }
          
          .transition-all,
          .transition-transform,
          .transition-colors {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}