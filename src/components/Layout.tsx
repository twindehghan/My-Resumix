import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from '../contexts/LanguageContext';

const Layout = () => {
  const { dir, language } = useTranslation();

  const fontClass = language === 'fa' ? 'font-vazir' : 'font-sans';

  return (
    <div className={`bg-brand-light-gray text-brand-text ${fontClass}`} dir={dir}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
