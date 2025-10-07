import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Megaphone, ChevronDown } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Language } from '../i18n';

const Header = () => {
  const { t, language, setLanguage } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-brand-dark">
              <span className="text-brand-blue">{t('siteNamePart1')}</span>
              <span>{t('siteNamePart2')}</span>
              <span className="text-brand-blue">.</span>
            </Link>
            <p className="hidden md:block text-brand-text">{t('greeting')}</p>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-brand-text-secondary hover:bg-gray-100">
                <LayoutGrid size={20} />
                <span className="hidden sm:inline">{t('tools')}</span>
                <ChevronDown size={16} />
              </button>
              {toolsDropdownOpen && (
                <div className="absolute start-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="none">
                    <Link to="/resume-builder" onClick={() => setToolsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{t('resumeBuilderLink')}</Link>
                    <Link to="/cover-letter-builder" onClick={() => setToolsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{t('coverLetterBuilder')}</Link>
                    <Link to="/practice-questions" onClick={() => setToolsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{t('practiceQuestion')}</Link>
                    <Link to="/interview-guides" onClick={() => setToolsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{t('interviewGuides')}</Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/announcements" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-brand-text-secondary hover:bg-gray-100">
              <Megaphone size={20} />
              <span className="hidden sm:inline">{t('announcements')}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
            </Link>
            <div className="relative">
              <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-brand-text-secondary hover:bg-gray-100">
                <img src={`https://flagcdn.com/w20/${language === 'en' ? 'us' : 'ir'}.png`} alt="Country Flag" />
                <span className="hidden sm:inline">{t('language')}</span>
                <ChevronDown size={16} />
              </button>
              {langDropdownOpen && (
                <div className="absolute end-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button onClick={() => handleLangChange('en')} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                       <img src="https://flagcdn.com/w20/us.png" alt="USA Flag" />
                       English
                    </button>
                    <button onClick={() => handleLangChange('fa')} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                       <img src="https://flagcdn.com/w20/ir.png" alt="Iran Flag" />
                       فارسی
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-2 rounded-full border-2 border-transparent hover:border-brand-blue">
                <img className="h-10 w-10 rounded-full object-cover" src="https://i.imgur.com/T5yG4P9.jpg" alt="User avatar" />
                <ChevronDown size={16} className="text-brand-text-secondary hidden sm:block" />
              </button>
               {profileDropdownOpen && (
                <div className="absolute end-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                  <div className="py-1" role="none">
                    <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{t('profile')}</Link>
                    <Link to="/settings" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{t('settings')}</Link>
                    <Link to="/logout" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{t('logout')}</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
