import "./Navigation.css";

import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = ({ isLandingPage, authPage }) => {
  const [catalogClick, setCatalogClick] = useState(false);
  console.log(authPage);
  return (
    <header className={!isLandingPage && "landing-bg"}>
      <nav
        className={`header-nav container-primary ${
          !isLandingPage && "landing-link"
        }`}
      >
        <h2 className="logo">
          <Link to="/">DanceGuide</Link>
        </h2>
        {authPage && (
          <div className="auth-page">
            <p className="auth-question">
              {authPage === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="nav-link"
              s
              to={authPage == "login" ? "/register" : "/login"}
            >
              {authPage === "login" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        )}

        {!authPage && (
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
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
