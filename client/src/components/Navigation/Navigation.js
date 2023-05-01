import "./Navigation.css";

import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = ({ isLandingPage }) => {
  const [catalogClick, setCatalogClick] = useState(false);

  return (
    <header className={isLandingPage && "landing"}>
      <nav className="header-nav container">
        <h2 className="logo">
          <Link to="/">DanceGuide</Link>
        </h2>

        <ul className="nav">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="nav-link nav-link--catalog"
              onClick={() => setCatalogClick((prev) => !prev)}
            >
              Catalog
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="catalog-menu--icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
            <ul className={`catalog-menu ${catalogClick ? "open" : ""}`}>
              <li>
                <Link to="/catalog" className="catalog-link nav-link">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/create" className="catalog-link nav-link">
                  List Item
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              Sign In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
