import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigateToWebsite?: () => void;
}

export const ForgotPasswordPage = ({ 
  onNavigateToLogin, 
  onNavigateToSignup,
  onNavigateToWebsite 
}: ForgotPasswordPageProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulation d'envoi d'email
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Vérifier si l'email existe dans notre système démo
      if (email === "demo@armateurs.quebec" || email.includes("@")) {
        setIsEmailSent(true);
        toast.success("Email de récupération envoyé avec succès !");
      } else {
        setError("Cette adresse email n'est pas associée à un compte membre.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      setError("Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-6 pb-8">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                
                <CardTitle className="text-2xl text-gray-900">
                  Email envoyé !
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Vérifiez votre boîte de réception
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">
                    Un email de récupération a été envoyé à :
                  </p>
                  <p className="font-medium text-blue-900 mt-1">{email}</p>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    Suivez les instructions dans l'email pour réinitialiser votre mot de passe.
                  </p>
                  <p>
                    Si vous ne recevez pas l'email dans les prochaines minutes, 
                    vérifiez votre dossier spam.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={onNavigateToLogin}
                  className="w-full h-12 bg-blue-900 hover:bg-blue-800"
                >
                  Retour à la connexion
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                  className="w-full h-12"
                >
                  Renvoyer l'email
                </Button>
              </div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 text-sm text-gray-500"
          >
            © 2024 Armateurs du Saint-Laurent. Tous droits réservés.
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateToLogin}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              {onNavigateToWebsite && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNavigateToWebsite}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Retour au site
                </Button>
              )}
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <Mail className="w-8 h-8 text-blue-600" />
              </motion.div>
              
              <CardTitle className="text-2xl text-gray-900">
                Mot de passe oublié ?
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Entrez votre email pour recevoir un lien de récupération
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                  className="h-12"
                />
                <p className="text-xs text-gray-500">
                  Utilisez <span className="font-medium">demo@armateurs.quebec</span> pour tester
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-900 hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le lien de récupération"
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-600">
                Vous vous souvenez de votre mot de passe ?{" "}
                <Button
                  variant="link"
                  size="sm"
                  onClick={onNavigateToLogin}
                  className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium"
                >
                  Se connecter
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Pas encore membre ?{" "}
                <Button
                  variant="link"
                  size="sm"
                  onClick={onNavigateToSignup}
                  className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium"
                >
                  Rejoindre l'association
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          © 2024 Armateurs du Saint-Laurent. Tous droits réservés.
        </motion.div>
      </motion.div>
    </div>
  );
};