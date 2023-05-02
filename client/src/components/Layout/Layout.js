import "./Layout.css";

import Footer from "./Footer/Footer";
import Navigation from "../Navigation/Navigation";

const Layout = ({ children, isLandingPage }) => {
  console.log(isLandingPage);
  return (
    <div
      className={`site-layout ${!isLandingPage && "layout-bg"}
`}
    >
      <Navigation isLandingPage={isLandingPage} />
      <main className="main-container">{children}</main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

export default Layout;
