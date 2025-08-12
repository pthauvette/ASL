import React from "react";
import { UnifiedHeader } from "./UnifiedHeader";
import { UnifiedFooter } from "./UnifiedFooter";
import { Breadcrumb } from "./ui/breadcrumb";
import type { AppView, BreadcrumbItem } from "../utils/form-types";

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

interface PageLayoutProps {
  currentView: AppView;
  navigationHandlers: NavigationHandlers;
  children: React.ReactNode;
  headerVariant?: 'transparent' | 'white';
  showBreadcrumbs?: boolean;
  breadcrumbItems?: BreadcrumbItem[];
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  currentView,
  navigationHandlers,
  children,
  headerVariant = 'white',
  showBreadcrumbs = false,
  breadcrumbItems = [],
  className = ""
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <UnifiedHeader 
        currentView={currentView}
        navigationHandlers={navigationHandlers}
        variant={headerVariant}
      />

      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbItems.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      <UnifiedFooter 
        currentView={currentView}
        navigationHandlers={navigationHandlers}
      />
    </div>
  );
};

// Layout spécialisé pour les pages avec hero transparent
export const HeroPageLayout: React.FC<Omit<PageLayoutProps, 'headerVariant'>> = ({
  currentView,
  navigationHandlers,
  children,
  className = ""
}) => {
  return (
    <div className={`min-h-screen bg-[#f8f3ed] overflow-x-hidden ${className}`}>
      <UnifiedHeader 
        currentView={currentView}
        navigationHandlers={navigationHandlers}
        variant="transparent"
      />
      
      <main className="relative">
        {children}
      </main>

      <UnifiedFooter 
        currentView={currentView}
        navigationHandlers={navigationHandlers}
      />
    </div>
  );
};

// Layout spécialisé pour les pages de contenu avec breadcrumbs
export const ContentPageLayout: React.FC<{
  currentView: AppView;
  navigationHandlers: NavigationHandlers;
  children: React.ReactNode;
  breadcrumbItems: BreadcrumbItem[];
  className?: string;
}> = ({
  currentView,
  navigationHandlers,
  children,
  breadcrumbItems,
  className = ""
}) => {
  return (
    <PageLayout
      currentView={currentView}
      navigationHandlers={navigationHandlers}
      showBreadcrumbs={true}
      breadcrumbItems={breadcrumbItems}
      className={className}
    >
      {children}
    </PageLayout>
  );
};