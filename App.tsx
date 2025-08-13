import { useState, useEffect, useRef } from "react";
import { AuthProvider, useAuth } from "./utils/authContext";
import { membriApi } from "./utils/membriApi";
import { AppRouter } from "./components/AppRouter";
import { AuthLoadingScreen, SystemLoadingScreen } from "./components/LoadingScreens";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { getStepTitles, PAGES_NEEDING_SYSTEM_READY } from "./utils/app-constants";
import { createInitialFormData, type AppView, type FormData } from "./utils/form-types";
import { getStepStatus, allStepsCompleted } from "./utils/form-validation";

function AppContent() {
  const { user, isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('website');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  
  // États pour le processus d'inscription
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);
  const [stepChangeKey, setStepChangeKey] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasActiveEvents, setHasActiveEvents] = useState<boolean | null>(null);
  const [maxSteps, setMaxSteps] = useState(5);
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'demo' | 'fallback'>('loading');
  const [systemConfig, setSystemConfig] = useState<any>(null);
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [formData, setFormData] = useState<FormData>(createInitialFormData());

  // Ref to track if component is mounted
  const isMountedRef = useRef(true);

  // Cleanup effect
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Déterminer la vue initiale
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        if (isMountedRef.current) {
          setCurrentView('portal');
        }
      } else {
        if (isMountedRef.current) {
          setCurrentView('website');
        }
      }
    }
  }, [isAuthenticated, authLoading]);

  // Initialize system
  useEffect(() => {
    const initializeSystem = () => {
      try {
        console.log("🚀 Initialisation système Armateurs du Saint-Laurent (mode sécurisé)...");

        const config = membriApi.getConfig();
        if (isMountedRef.current) {
          setSystemConfig(config);
        }

        const isDemoMode = membriApi.isUsingDemoMode();
        const status: "demo" | "connected" = isDemoMode ? "demo" : "connected";
        
        if (isMountedRef.current) {
          setApiStatus(status);
          setHasActiveEvents(true);
          setMaxSteps(6);

          console.log(`✅ Système initialisé (mode sécurisé):`, {
            mode: config.mode,
            environment: config.environment,
            status: status,
            events: 5,
            steps: 6,
            hostname: config.hostname,
            offline: config.forceOffline || false
          });

          setIsSystemReady(true);
        }
      } catch (error) {
        console.warn("Avertissement initialisation (fallback garanti):", error);

        if (isMountedRef.current) {
          setApiStatus("demo");
          setHasActiveEvents(true);
          setMaxSteps(6);
          setSystemConfig({ 
            mode: 'demo', 
            environment: 'development',
            hostname: 'localhost',
            forceOffline: true
          });
          setIsSystemReady(true);
        }
      }
    };

    initializeSystem();
  }, []);

  // Handle initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        setIsInitialLoad(false);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate step titles
  const stepTitles = getStepTitles(hasActiveEvents || false);

  // Handle step change
  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= maxSteps && newStep !== currentStep) {
      setCurrentStep(newStep);
      setStepChangeKey((prev) => prev + 1);

      if (!visitedSteps.includes(newStep)) {
        setVisitedSteps((prev) => [...prev, newStep]);
      }
    }
  };

  // Step status function
  const getStepStatusFn = (stepId: number) => 
    getStepStatus(stepId, currentStep, formData, visitedSteps, hasActiveEvents || false);

  // All steps completed function
  const allStepsCompletedFn = () => 
    allStepsCompleted(maxSteps, currentStep, formData, visitedSteps, hasActiveEvents || false);

  // Navigation handlers - Maintenant complets avec toutes les pages
  const navigationHandlers = {
    onNavigateToWebsite: () => {
      setCurrentView('website');
      setSelectedMemberId(null);
    },
    onNavigateToAssociation: () => {
      setCurrentView('association');
      setSelectedMemberId(null);
    },
    onNavigateToSaintLaurent: () => {
      setCurrentView('saint-laurent');
      setSelectedMemberId(null);
    },
    onNavigateToMembers: () => {
      setCurrentView('members');
      setSelectedMemberId(null);
    },
    onNavigateToEvents: () => {
      setCurrentView('events');
      setSelectedMemberId(null);
    },
    onNavigateToContact: () => {
      setCurrentView('contact');
      setSelectedMemberId(null);
    },
    onNavigateToDossiers: () => {
      setCurrentView('dossiers');
      setSelectedMemberId(null);
    },
    onNavigateToPrivacyPolicy: () => {
      setCurrentView('privacy-policy');
      setSelectedMemberId(null);
    },
    onNavigateToTerms: () => {
      setCurrentView('terms');
      setSelectedMemberId(null);
    },
    onNavigateToSitemap: () => {
      setCurrentView('sitemap');
      setSelectedMemberId(null);
    },
    onNavigateToSignup: () => {
      setCurrentView('signup');
      setSelectedMemberId(null);
    },
    onNavigateToLogin: () => {
      setCurrentView('login');
      setSelectedMemberId(null);
    },
    onNavigateToForgotPassword: () => {
      setCurrentView('forgot-password');
      setSelectedMemberId(null);
    },
    onNavigateToMemberDetail: (memberId: string) => {
      setSelectedMemberId(memberId);
      setCurrentView('member-detail');
    },
    onNavigateBackFromMemberDetail: () => {
      setSelectedMemberId(null);
      setCurrentView('website');
    },
    onLoginSuccess: (userData: any) => {
      login(userData);
      setCurrentView('portal');
    },
    onLogout: () => {
      logout();
      setCurrentView('website');
    }
  };

  // Show loading state during auth check
  if (authLoading) {
    return <AuthLoadingScreen />;
  }

  // Show system loading for pages that need API data
  if (PAGES_NEEDING_SYSTEM_READY.includes(currentView) && !isSystemReady) {
    return <SystemLoadingScreen currentView={currentView} systemConfig={systemConfig} />;
  }

  // Render the appropriate view
  return (
    <AppRouter 
      currentView={currentView}
      selectedMemberId={selectedMemberId}
      navigationHandlers={navigationHandlers}
      formData={formData}
      setFormData={setFormData}
      currentStep={currentStep}
      stepTitles={stepTitles}
      stepChangeKey={stepChangeKey}
      isInitialLoad={isInitialLoad}
      handleStepChange={handleStepChange}
      getStepStatus={getStepStatusFn}
      allStepsCompleted={allStepsCompletedFn}
      visitedSteps={visitedSteps}
      isDevelopment={membriApi.isInDevelopment()}
    />
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}