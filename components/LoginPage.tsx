import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Phone, Clock, Users, Calendar, Book, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import { PageLayout } from "./PageLayout";
import svgPaths from "../imports/svg-uz7u5t2bie";

interface LoginPageProps {
  onLoginSuccess: (userData: any) => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
  onNavigateToWebsite?: () => void;
}

// Login Form Component
const LoginForm = ({ 
  onLoginSuccess, 
  onNavigateToSignup, 
  onNavigateToForgotPassword 
}: {
  onLoginSuccess: (userData: any) => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

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
        toast.error("Email ou mot de passe incorrect. Utilisez demo@armateurs.quebec / demo123 pour la démonstration.");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast.error("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white shadow-sm w-full max-w-md">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Connexion à votre compte
          </h2>
          <p className="text-muted-foreground">
            Accédez à votre espace personnel des Armateurs du Saint-Laurent
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Adresse courriel
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre courriel"
                className="pl-11 h-12"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </Label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-4"
                fill="none"
                viewBox="0 0 14 16"
              >
                <path d={svgPaths.pcd0dd00} fill="currentColor" className="text-muted-foreground" />
              </svg>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="pl-11 pr-12 h-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-auto p-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 18 16">
                  <path d={svgPaths.p27070ff0} fill="currentColor" className="text-muted-foreground" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="w-4 h-4"
              />
              <Label 
                htmlFor="remember" 
                className="text-sm cursor-pointer"
              >
                Se souvenir de moi
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              onClick={onNavigateToForgotPassword}
              className="text-sm p-0 h-auto"
            >
              Mot de passe oublié?
            </Button>
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Identifiants de démonstration :</span><br />
              Email : demo@armateurs.quebec<br />
              Mot de passe : demo123
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12"
          >
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 16 16">
                <path d={svgPaths.pca5de00} fill="currentColor" />
              </svg>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </div>
          </Button>
        </form>

        {/* Signup Link */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Vous n'avez pas de compte?
          </p>
          <Button
            onClick={onNavigateToSignup}
            variant="outline"
            className="w-full h-12"
          >
            Devenir membre
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Member Benefits Component
const MemberBenefits = () => {
  const benefits = [
    {
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 20 16">
        <path d={svgPaths.p1b4569c0} fill="currentColor" />
      </svg>,
      title: "Réseautage exclusif",
      description: "Connectez-vous avec des professionnels de l'industrie et élargissez votre réseau."
    },
    {
      icon: <svg className="w-3.5 h-4" fill="none" viewBox="0 0 14 16">
        <path d={svgPaths.p3256de00} fill="currentColor" />
      </svg>,
      title: "Accès prioritaire aux événements",
      description: "Inscription anticipée aux webinaires, ateliers et conférences."
    },
    {
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 18 16">
        <path d={svgPaths.p22371f0} fill="currentColor" />
      </svg>,
      title: "Bibliothèque de ressources",
      description: "Accès à des recherches exclusives, rapports et analyses de l'industrie."
    },
    {
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 20 16">
        <path d={svgPaths.p8134300} fill="currentColor" />
      </svg>,
      title: "Opportunités de partenariat",
      description: "Collaborez sur des projets et des entreprises commerciales."
    }
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold text-primary mb-8">
          Avantages membres
        </h3>
        
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-5">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Help Section Component
const HelpSection = () => {
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold mb-4">
          Besoin d'aide?
        </h3>
        <p className="text-base opacity-90 mb-6 leading-6">
          Notre équipe de support est là pour vous aider avec tout problème de
          connexion ou questions concernant votre adhésion.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.pa71cb00} fill="currentColor" />
            </svg>
            <span className="text-sm">support@asl.org</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p9204100} fill="currentColor" />
            </svg>
            <span className="text-sm">1-800-ASL-AIDE</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p803d900} fill="currentColor" />
            </svg>
            <span className="text-sm">Lun-Ven, 9h00 - 17h00 EST</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Quick Access Component
const QuickAccess = ({ onNavigateToSignup, onNavigateToForgotPassword }: {
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
}) => {
  const accessItems = [
    {
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 38 30">
        <path d={svgPaths.p28f8c100} fill="currentColor" />
      </svg>,
      title: "Inscription nouveau membre",
      description: ["Commencez votre parcours avec l'ASL", "aujourd'hui"],
      onClick: onNavigateToSignup
    },
    {
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 30 30">
        <path d={svgPaths.p3cdfcb80} fill="currentColor" />
      </svg>,
      title: "Réinitialiser le mot de passe",
      description: ["Récupérez l'accès à votre compte"],
      onClick: onNavigateToForgotPassword
    },
    {
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 30 30">
        <path d={svgPaths.p388e9000} fill="currentColor" />
      </svg>,
      title: "Centre d'aide",
      description: ["Trouvez des réponses aux questions", "fréquentes"]
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-primary text-center mb-16">
        Accès rapide
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {accessItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={item.onClick}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-6 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  {item.description.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const LoginPage = ({ 
  onLoginSuccess, 
  onNavigateToSignup, 
  onNavigateToForgotPassword,
  onNavigateToWebsite 
}: LoginPageProps) => {
  const navigationHandlers = {
    onNavigateToWebsite: onNavigateToWebsite || (() => {}),
    onNavigateToAssociation: () => {},
    onNavigateToSaintLaurent: () => {},
    onNavigateToMembers: () => {},
    onNavigateToEvents: () => {},
    onNavigateToContact: () => {},
    onNavigateToDossiers: () => {},
    onNavigateToPrivacyPolicy: () => {},
    onNavigateToTerms: () => {},
    onNavigateToSitemap: () => {},
    onNavigateToLogin: () => {},
    onNavigateToSignup: onNavigateToSignup
  };

  return (
    <PageLayout
      currentView="login"
      navigationHandlers={navigationHandlers}
      className="bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Login Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <div className="flex justify-center">
            <LoginForm 
              onLoginSuccess={onLoginSuccess}
              onNavigateToSignup={onNavigateToSignup}
              onNavigateToForgotPassword={onNavigateToForgotPassword}
            />
          </div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MemberBenefits />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HelpSection />
            </motion.div>
          </div>
        </div>

        {/* Quick Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <QuickAccess 
            onNavigateToSignup={onNavigateToSignup}
            onNavigateToForgotPassword={onNavigateToForgotPassword}
          />
        </motion.div>
      </div>
    </PageLayout>
  );
};