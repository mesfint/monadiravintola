import { createContext, ReactNode, useContext, useState } from 'react';

type Language = 'english' | 'finnish';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Keep useLanguage for container components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Add getLanguageState for remote apps
export const getLanguageState = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('getLanguageState must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('english');

  const toggleLanguage = () => {
    console.log('Language toggled to:', language === 'english' ? 'finnish' : 'english');
    setLanguage(prev => prev === 'english' ? 'finnish' : 'english');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

