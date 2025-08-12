import { Loader2 } from "lucide-react";
import type { AppView } from "../utils/form-types";
import { LOADING_MESSAGES } from "../utils/app-constants";

interface LoadingScreenProps {
  title?: string;
  message?: string;
  showConfig?: boolean;
  systemConfig?: any;
}

export const BaseLoadingScreen = ({ title, message, showConfig = false, systemConfig }: LoadingScreenProps) => (
  <div className="min-h-screen bg-[#fafaf0] flex items-center justify-center">
    <div className="text-center max-w-md">
      <Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000033] mx-auto mb-4" />
      <h2 className="text-lg font-medium text-[#000033] mb-2">
        {title || "Chargement de l'application Armateurs du Saint-Laurent..."}
      </h2>
      <p className="text-[#43464b] text-sm">
        {message || "Initialisation en cours"}
      </p>
      {showConfig && systemConfig && (
        <div className="mt-4 text-xs text-[#717182] space-y-1">
          <p>Mode : {systemConfig.mode}</p>
          <p>Environnement : {systemConfig.environment}</p>
        </div>
      )}
    </div>
  </div>
);

export const AuthLoadingScreen = () => (
  <BaseLoadingScreen 
    title="Chargement de l'application Armateurs du Saint-Laurent..."
    message="Vérification de votre session"
  />
);

export const SystemLoadingScreen = ({ currentView, systemConfig }: { 
  currentView: AppView; 
  systemConfig?: any 
}) => (
  <BaseLoadingScreen 
    title="Initialisation Armateurs du Saint-Laurent..."
    message={LOADING_MESSAGES[currentView]}
    showConfig={true}
    systemConfig={systemConfig}
  />
);