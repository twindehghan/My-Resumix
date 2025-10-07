import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from '../contexts/LanguageContext';

const Layout = () => {
  const { dir } = useTranslation();

  return (
    <div className="bg-brand-light-gray font-sans text-brand-text" dir={dir}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
