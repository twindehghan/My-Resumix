import { ReactNode } from "react";
import { useTranslation } from "../contexts/LanguageContext";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { t, dir } = useTranslation();
  const fontClass = dir === 'rtl' ? 'font-vazir' : 'font-sans';

  return (
    <div className={`min-h-screen flex ${fontClass}`} dir={dir}>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-brand-dark text-white p-12 relative overflow-hidden">
        <div className="absolute -top-16 -start-16 w-64 h-64 bg-blue-500/10 rounded-full"></div>
        <div className="absolute -bottom-24 -end-10 w-72 h-72 bg-blue-500/10 rounded-full"></div>
        <div className="z-10 text-center">
            <a href="/" className="flex items-center justify-center gap-1 text-4xl font-bold text-white mb-6">
              <span className="text-brand-blue">{t('siteNamePart1')}</span>
              <span>{t('siteNamePart2')}</span>
              <span className="text-brand-blue">.</span>
            </a>
            <p className="text-xl text-gray-300 max-w-sm mx-auto">{t('authSlogan')}</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
