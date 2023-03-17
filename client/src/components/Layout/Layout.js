import './Layout.scss';

import Footer from './Footer/Footer';
import Header from './Header/Header';
import { UserContext } from '../../contexts/userContext';
import { useContext } from 'react';

const Layout = ({ children }) => {
    const user = useContext(UserContext);

    return (
        <div className="site-layout">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
