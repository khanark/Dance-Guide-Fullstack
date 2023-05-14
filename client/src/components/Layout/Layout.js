import "./Layout.css";

import { useCallback, useState } from "react";

import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const Layout = ({ children, isLandingPage, authPage }) => {
  const [navLinkActive, setNavLinkActive] = useState("");

  const onNavLinkClick = useCallback(
    (e) => {
      setNavLinkActive(e.target.id);
    },
    [navLinkActive]
  );

  return (
    <div
      className={`site-layout ${!isLandingPage && "layout-bg"}
`}
    >
      <Navigation
        isLandingPage={isLandingPage}
        authPage={authPage}
        onNavLinkClick={onNavLinkClick}
        navLinkActive={navLinkActive}
      />
      <main className="main-container">{children}</main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

export default Layout;
