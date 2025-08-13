import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";

interface LoginPageProps {
  onLoginSuccess: (userData: any) => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
  onNavigateToWebsite?: () => void;
}

export const LoginPage = ({ 
  onLoginSuccess, 
  onNavigateToSignup, 
  onNavigateToForgotPassword,
  onNavigateToWebsite 
}: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulation d'authentification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Vérifier les identifiants démo
      if (email === "demo@armateurs.quebec" && password === "demo123") {
        const userData = {
          id: "demo-user-1",
          email: "demo@armateurs.quebec",
          firstName: "Jean",
          lastName: "Dupont",
          organization: "Transport Maritime ASL",
          role: "Capitaine",
          memberSince: "2020-03-15",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        };
        
        toast.success("Connexion réussie ! Bienvenue sur votre portail membre.");
        onLoginSuccess(userData);
      } else {
        setError("Email ou mot de passe incorrect. Utilisez demo@armateurs.quebec / demo123 pour la démonstration.");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4 sm:space-y-6 pb-6 sm:pb-8">
            <div className="flex items-center justify-between">
              {onNavigateToWebsite && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNavigateToWebsite}
                  className="p-3 text-gray-500 hover:text-gray-700 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Retour au site"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div className="flex-1" />
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-900 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </motion.div>
              
              <CardTitle className="text-xl sm:text-2xl text-gray-900">
                Portail Membre
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-sm sm:text-base">
                Connectez-vous à votre espace personnel
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6">
            {error && (
              <Alert variant="destructive" className="text-sm">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                  className="h-12 sm:h-12 touch-manipulation text-base sm:text-sm"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                    className="h-12 sm:h-12 pr-12 touch-manipulation text-base sm:text-sm"
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 hover:text-gray-700 touch-manipulation"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 text-xs sm:text-sm">
                <div className="text-gray-600 text-center sm:text-left">
                  <div className="font-medium">Identifiants démo :</div>
                  <div className="font-mono text-xs">demo@armateurs.quebec / demo123</div>
                </div>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={onNavigateToForgotPassword}
                  className="p-0 h-auto text-blue-600 hover:text-blue-700 touch-manipulation text-sm"
                >
                  Mot de passe oublié ?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 sm:h-12 bg-blue-900 hover:bg-blue-800 text-base font-semibold touch-manipulation"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600 pt-2">
              Pas encore membre ?{" "}
              <Button
                variant="link"
                size="sm"
                onClick={onNavigateToSignup}
                className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold touch-manipulation inline"
              >
                Rejoindre l'association
              </Button>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500"
        >
          © 2025 Armateurs du Saint-Laurent. Tous droits réservés.
        </motion.div>
      </motion.div>
    </div>
  );
};