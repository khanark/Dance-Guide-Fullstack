import "./Footer.css";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";

const Footer = () => {
  const { navigationRef } = useUserContext();

  const scrollToCatalog = () => {
    navigationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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
              DanceGuide was built as a project for the ReactJS course at{" "}
              <Link
                className="university-link"
                to={"https://softuni.bg/"}
                target="_blank"
              >
                SoftUni Software University
              </Link>{" "}
              from Borislav Godumov aka Khanark.
            </p>
          </div>
          <div className="footer-contact">
            <h3 className="title-secondary">Contact</h3>
            <ul className="contact-list">
              <Link
                to="https://github.com/khanark"
                target="_blank"
                className="nav-link"
              >
                <AiFillGithub className="contact-icon" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/borislav-godumov-7245b61a2/"
                target="_blank"
                className="nav-link"
              >
                <AiFillLinkedin className="contact-icon" />
              </Link>
            </ul>
          </div>
        </div>
        <button className="scrool-top" onClick={scrollToCatalog}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="scrool-top--icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
            />
          </svg>
        </button>
      </footer>
      <div className="footer-secondary">
        <div className="container-secondary">
          <p className="footer-secondary--desc">
            &copy; 2022 DanceGuide. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
export default Footer;
