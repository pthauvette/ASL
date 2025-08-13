import { LanguageProvider } from "../utils/languageContext";
import { Toaster } from "./ui/sonner";
import { WebsitePage } from "./WebsitePage";
import { AssociationPage } from "./AssociationPage";
import { SaintLaurentPage } from "./SaintLaurentPage";
import { MembersPage } from "./MembersPage";
import { EventsPage } from "./EventsPage";
import { ContactPage } from "./ContactPage";
import { DossiersPage } from "./DossiersPage";
import { PrivacyPolicyPage } from "./PrivacyPolicyPage";
import { TermsPage } from "./TermsPage";
import { SitemapPage } from "./SitemapPage";
import { MemberDetailPage } from "./MemberDetailPage";
import { LoginPage } from "./LoginPage";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { MemberPortal } from "./MemberPortal";
import { Header } from "./Header";
import { ProgressHeader } from "./ProgressHeader";
import { StepsSidebar } from "./StepsSidebar";
import { SignupForm } from "./SignupForm";
import { WhyJoinSection } from "./WhyJoinSection";
import { Footer } from "./Footer";
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
  onNavigateToSignup: () => void;
  onNavigateToLogin: () => void;
  onNavigateToForgotPassword: () => void;
  onNavigateToMemberDetail: (memberId: string) => void;
  onNavigateBackFromMemberDetail: () => void;
  onLoginSuccess: (userData: any) => void;
  onLogout: () => void;
}

interface AppRouterProps {
  currentView: AppView;
  selectedMemberId: string | null;
  navigationHandlers: NavigationHandlers;
  // Signup form props
  formData?: FormData;
  setFormData?: (data: FormData) => void;
  currentStep?: number;
  stepTitles?: StepInfo[];
  stepChangeKey?: number;
  isInitialLoad?: boolean;
  handleStepChange?: (step: number) => void;
  getStepStatus?: (stepId: number) => any;
  allStepsCompleted?: () => boolean;
  visitedSteps?: number[];
  isDevelopment?: boolean;
}

const ToasterWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>
    {children}
    <Toaster 
      position="top-center" 
      className="sm:!top-4 !top-20"
      toastOptions={{
        className: "text-sm",
      }}
    />
  </LanguageProvider>
);

export const AppRouter = ({ 
  currentView, 
  selectedMemberId, 
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
  visitedSteps,
  isDevelopment
}: AppRouterProps) => {
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
    onNavigateToSignup,
    onNavigateToLogin,
    onNavigateToForgotPassword,
    onNavigateToMemberDetail,
    onNavigateBackFromMemberDetail,
    onLoginSuccess,
    onLogout
  } = navigationHandlers;

  // Website and public pages avec composants unifiés
  if (currentView === 'website') {
    return (
      <ToasterWrapper>
        <WebsitePage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'association') {
    return (
      <ToasterWrapper>
        <AssociationPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'saint-laurent') {
    return (
      <ToasterWrapper>
        <SaintLaurentPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'members') {
    return (
      <ToasterWrapper>
        <MembersPage 
          navigationHandlers={navigationHandlers}
          onNavigateToMemberDetail={onNavigateToMemberDetail}
        />
      </ToasterWrapper>
    );
  }

  if (currentView === 'events') {
    return (
      <ToasterWrapper>
        <EventsPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'contact') {
    return (
      <ToasterWrapper>
        <ContactPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'dossiers') {
    return (
      <ToasterWrapper>
        <DossiersPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  // Pages statiques légales
  if (currentView === 'privacy-policy') {
    return (
      <ToasterWrapper>
        <PrivacyPolicyPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'terms') {
    return (
      <ToasterWrapper>
        <TermsPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'sitemap') {
    return (
      <ToasterWrapper>
        <SitemapPage navigationHandlers={navigationHandlers} />
      </ToasterWrapper>
    );
  }

  if (currentView === 'member-detail' && selectedMemberId) {
    return (
      <ToasterWrapper>
        <MemberDetailPage 
          memberId={selectedMemberId}
          onNavigateBack={onNavigateBackFromMemberDetail}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToSignup={onNavigateToSignup}
          onNavigateToWebsite={onNavigateToWebsite}
          onNavigateToAssociation={onNavigateToAssociation}
          onNavigateToSaintLaurent={onNavigateToSaintLaurent}
          onNavigateToMembers={onNavigateToMembers}
          onNavigateToEvents={onNavigateToEvents}
          onNavigateToContact={onNavigateToContact}
        />
      </ToasterWrapper>
    );
  }

  // Auth pages
  if (currentView === 'login') {
    return (
      <ToasterWrapper>
        <LoginPage 
          onLoginSuccess={onLoginSuccess}
          onNavigateToSignup={onNavigateToSignup}
          onNavigateToForgotPassword={onNavigateToForgotPassword}
          onNavigateToWebsite={onNavigateToWebsite}
        />
      </ToasterWrapper>
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <ToasterWrapper>
        <ForgotPasswordPage 
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToWebsite={onNavigateToWebsite}
        />
      </ToasterWrapper>
    );
  }

  // Member portal
  if (currentView === 'portal') {
    return (
      <ToasterWrapper>
        <MemberPortal onLogout={onLogout} />
      </ToasterWrapper>
    );
  }

  // Signup form (garde l'ancien layout pour le processus d'inscription)
  if (currentView === 'signup' && formData && setFormData && currentStep && stepTitles && handleStepChange && getStepStatus && allStepsCompleted) {
    const currentStepInfo = stepTitles.find((step) => step.id === currentStep) || stepTitles[0];

    return (
      <ToasterWrapper>
        <div className="min-h-screen bg-[#fafaf0] flex flex-col">
          <Header onNavigateToWebsite={onNavigateToWebsite} />
          
          <ProgressHeader
            currentStep={currentStep}
            getStepStatus={getStepStatus}
            allStepsCompleted={allStepsCompleted()}
            stepChangeKey={stepChangeKey || 0}
            maxSteps={stepTitles.length}
          />

          <div className="flex-1 flex">
            <StepsSidebar
              currentStep={currentStep}
              getStepStatus={getStepStatus}
              onStepClick={handleStepChange}
              stepChangeKey={stepChangeKey || 0}
              isInitialLoad={isInitialLoad || false}
              visitedSteps={visitedSteps || []}
              stepTitles={stepTitles}
              maxSteps={stepTitles.length}
            />

            <main className="flex-1 p-8">
              <SignupForm
                key={stepChangeKey}
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
                onNext={() => handleStepChange(currentStep + 1)}
                onPrevious={() => handleStepChange(currentStep - 1)}
                isInitialLoad={isInitialLoad || false}
                canProceed={currentStep < stepTitles.length}
                isLastStep={currentStep === stepTitles.length}
                allStepsCompleted={allStepsCompleted()}
              />
            </main>

            <aside className="w-80 p-8">
              <WhyJoinSection />
            </aside>
          </div>

          <Footer isDevelopment={isDevelopment || false} />
        </div>
      </ToasterWrapper>
    );
  }

  // Fallback
  return (
    <ToasterWrapper>
      <div className="min-h-screen bg-[#fafaf0] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-[#000033] mb-2">Page non trouvée</h2>
          <button 
            onClick={onNavigateToWebsite}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </ToasterWrapper>
  );
};