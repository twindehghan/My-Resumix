import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations, Language } from '../i18n';

type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKeys) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const getInitialLanguage = (): Language => {
    const storedLang = localStorage.getItem('resumix-lang');
    if (storedLang === 'fa' || storedLang === 'en') {
      return storedLang;
    }
    // Default based on browser language if you want, otherwise default to 'en'
    // const browserLang = navigator.language.split('-')[0];
    // if (browserLang === 'fa') return 'fa';
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  
  const setLanguage = (lang: Language) => {
    localStorage.setItem('resumix-lang', lang);
    setLanguageState(lang);
  };

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations.en[key];
  };

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
