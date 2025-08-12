import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Translations } from './translations';

interface LanguageContextType {
  currentLang: string;
  t: Translations;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLang, setCurrentLang] = useState('fr');

  const setLanguage = (lang: string) => {
    setCurrentLang(lang);
  };

  const t = translations[currentLang] || translations.fr;

  return (
    <LanguageContext.Provider value={{ currentLang, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}