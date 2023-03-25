import "./Footer.scss";

import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <p className="footer-rights">
        Copyright © 2023 Khanark. All rights reserved.
      </p>
      <div className="social__links">
        <p>Social Links</p>
        <Link to="https://github.com/khanark" target={"_blank"}>
          <FaGithub />
        </Link>
        <Link to="https://www.facebook.com/BeeAyJee" target={"_blank"}>
          <FaFacebook />
        </Link>
        <Link to="https://www.instagram.com/alqahol1c" target={"_blank"}>
          <FaInstagram />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
