import { LanguageProvider } from "../utils/languageContext";
import { Toaster } from "./ui/sonner";
import { PageLayout } from "./PageLayout";
import { ProgressHeader } from "./ProgressHeader";
import { StepsSidebar } from "./StepsSidebar";
import { SignupForm } from "./SignupForm";
import { WhyJoinSection } from "./WhyJoinSection";
import type { AppView, FormData, StepInfo } from "../utils/form-types";

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

interface SignupPageProps {
  navigationHandlers: NavigationHandlers;
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  currentStep: number;
  stepTitles: StepInfo[];
  stepChangeKey: number;
  isInitialLoad: boolean;
  handleStepChange: (step: number) => void;
  getStepStatus: (stepId: number) => any;
  allStepsCompleted: () => boolean;
  isDevelopment: boolean;
  visitedSteps: number[];
}

export const SignupPage = ({
  navigationHandlers,
  formData,
  setFormData,
  currentStep,
  stepTitles,
  stepChangeKey,
  isInitialLoad,
  handleStepChange,
  getStepStatus,
  allStepsCompleted,
  isDevelopment,
  visitedSteps
}: SignupPageProps) => {
  return (
    <LanguageProvider>
      <PageLayout
        currentView="signup"
        navigationHandlers={navigationHandlers}
        className="bg-[#fafaf0]"
      >
        <div className="min-h-[calc(100vh-200px)]">
          <ProgressHeader
            currentStep={currentStep}
            getStepStatus={getStepStatus}
            allStepsCompleted={allStepsCompleted()}
            stepChangeKey={stepChangeKey}
            maxSteps={stepTitles.length}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar des étapes */}
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-8">
                  <StepsSidebar
                    currentStep={currentStep}
                    getStepStatus={getStepStatus}
                    onStepClick={handleStepChange}
                    stepChangeKey={stepChangeKey}
                    isInitialLoad={isInitialLoad}
                    visitedSteps={visitedSteps}
                    stepTitles={stepTitles}
                    maxSteps={stepTitles.length}
                  />
                </div>
              </div>

              {/* Contenu principal */}
              <div className="flex-1 min-w-0">
                <div className="py-8">
                  <SignupForm
                    key={stepChangeKey}
                    currentStep={currentStep}
                    formData={formData}
                    setFormData={setFormData}
                    onNext={() => handleStepChange(currentStep + 1)}
                    onPrevious={() => handleStepChange(currentStep - 1)}
                    isInitialLoad={isInitialLoad}
                    canProceed={currentStep < stepTitles.length}
                    isLastStep={currentStep === stepTitles.length}
                    allStepsCompleted={allStepsCompleted()}
                  />
                </div>
              </div>

              {/* Section "Pourquoi adhérer" */}
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-8">
                  <WhyJoinSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      
      <Toaster 
        position="top-center" 
        className="sm:!top-4 !top-20"
        toastOptions={{
          className: "text-sm",
        }}
      />
    </LanguageProvider>
  );
};