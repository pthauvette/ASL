import { useState, useEffect, useRef } from "react";
import { AuthProvider, useAuth } from "./utils/authContext";
import { membriApi } from "./utils/membriApi";
import { AppRouter } from "./components/AppRouter";
import { AuthLoadingScreen, SystemLoadingScreen } from "./components/LoadingScreens";
import { getStepTitles, PAGES_NEEDING_SYSTEM_READY } from "./utils/app-constants";
import { createInitialFormData, type AppView, type FormData } from "./utils/form-types";
import { getStepStatus, allStepsCompleted } from "./utils/form-validation";

function AppContent() {
  const { user, isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('website');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  
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

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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

  useEffect(() => {
    const initializeSystem = async () => {
      try {
        const config = membriApi.getConfig();
        if (isMountedRef.current) {
          setSystemConfig(config);
        }

        let connectionTest = false;
        let status: "demo" | "connected" = "demo";
        
        try {
          connectionTest = await membriApi.testConnection();
          if (connectionTest) {
            status = "connected";
          }
        } catch (error) {
          // Fallback to demo mode
        }

        let eventsAvailable = false;
        try {
          const events = await membriApi.fetchActiveEvents();
          if (events && Array.isArray(events)) {
            eventsAvailable = events.length > 0;
          } else {
            eventsAvailable = true;
          }
        } catch (error) {
          eventsAvailable = true;
        }
        
        if (isMountedRef.current) {
          setApiStatus(status);
          setHasActiveEvents(eventsAvailable);
          setMaxSteps(eventsAvailable ? 6 : 5);
          setIsSystemReady(true);
        }
      } catch (error) {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        setIsInitialLoad(false);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const stepTitles = getStepTitles(hasActiveEvents || false);

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= maxSteps && newStep !== currentStep) {
      setCurrentStep(newStep);
      setStepChangeKey((prev) => prev + 1);

      if (!visitedSteps.includes(newStep)) {
        setVisitedSteps((prev) => [...prev, newStep]);
      }
    }
  };

  const getStepStatusFn = (stepId: number) => 
    getStepStatus(stepId, currentStep, formData, visitedSteps, hasActiveEvents || false);

  const allStepsCompletedFn = () => 
    allStepsCompleted(maxSteps, currentStep, formData, visitedSteps, hasActiveEvents || false);

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
      setFormData(createInitialFormData());
      setCurrentStep(1);
      setVisitedSteps([1]);
      setStepChangeKey(prev => prev + 1);
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

  if (authLoading) {
    return <AuthLoadingScreen />;
  }

  if (PAGES_NEEDING_SYSTEM_READY.includes(currentView) && !isSystemReady) {
    return <SystemLoadingScreen currentView={currentView} systemConfig={systemConfig} />;
  }

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
      isDevelopment={membriApi.isInDevelopment()}
      visitedSteps={visitedSteps}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}