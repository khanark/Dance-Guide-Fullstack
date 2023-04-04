import "./Layout.scss";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="site-layout">
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
