import "./Footer.css";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-footer section">
      <div className="footer container-secondary grid grid--cols-3">
        <div className="footer-nav-wrapper">
          <h3 className="title-secondary">Site Navigation</h3>
          <nav className="footer-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/" className="nav-link">
              Catalog
            </Link>
          </nav>
        </div>
        <div className="footer-about">
          <h3 className="title-secondary">About</h3>
          <p className="footer-about--desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas in
            laudantium provident quaerat voluptatum fuga est ipsam dolor aliquam
            sint?
          </p>
        </div>
        <div className="footer-contact">
          <h3 className="title-secondary">Contact</h3>
          <ul className="contact-list">
            <Link to="lala" className="nav-link">
              <AiFillGithub className="contact-icon" />
            </Link>
            <Link to="bre" className="nav-link">
              <AiFillLinkedin className="contact-icon" />
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
