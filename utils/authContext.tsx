import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  organization?: string;
  role: string;
  loginTime: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier s'il y a une session existante au démarrage
    const checkExistingSession = () => {
      try {
        const savedUser = sessionStorage.getItem('asl_user_session');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } else {
          // Vérifier si l'utilisateur a demandé à être "rappelé"
          const rememberUser = localStorage.getItem('asl_remember_user');
          if (rememberUser) {
            const { email, timestamp } = JSON.parse(rememberUser);
            // Vérifier que le timestamp n'est pas trop ancien (30 jours)
            const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
            if (Date.now() - timestamp < thirtyDaysInMs) {
              console.log('Session "Se souvenir de moi" trouvée pour:', email);
              // Note: En production, on ferait un appel API pour revalider la session
            } else {
              localStorage.removeItem('asl_remember_user');
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
        // Nettoyer les sessions corrompues
        sessionStorage.removeItem('asl_user_session');
        localStorage.removeItem('asl_remember_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('asl_user_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('asl_user_session');
    // Note: On garde le localStorage pour "Se souvenir de moi" si l'utilisateur l'a demandé
  };

  const checkSession = (): boolean => {
    try {
      const savedUser = sessionStorage.getItem('asl_user_session');
      return !!savedUser;
    } catch {
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}