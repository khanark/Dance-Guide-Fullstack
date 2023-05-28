import './Layout.css';

import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const pageState = useMemo(() => {
    return {
      isLandingPage: location.pathname === '/',
      authPage: location.pathname === '/login' || location.pathname === '/register',
    };
  }, [location]);

  return (
    <div className={`site-layout ${!pageState.isLandingPage ? 'layout-bg' : 'isLandingPage'}`}>
      <Navigation isLandingPage={pageState.isLandingPage} authPage={pageState.authPage} />
      <main className="main-container">{children}</main>
      {!pageState.isLandingPage && <Footer />}
    </div>
  );
};

export default Layout;
