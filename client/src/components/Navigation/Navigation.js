import "./Navigation.css";

import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Link, useNavigate } from "react-router-dom";

import defaultAvatar from "../../assets/images/blank-avatar-image.jpg";
import { useCloudinaryImage } from "../../hooks/useCloudinaryImage";
import { useState } from "react";
import { useUserContext } from "../../contexts/AuthContext";

const Navigation = ({
  isLandingPage,
  authPage,
  onNavLinkClick,
  navLinkActive,
}) => {
  const { user, clearUser } = useUserContext();
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();

  const onLogoutClick = () => {
    clearUser(); // clearing the user from local storage upon logout
    navigate("/catalog"); // redirecting the user to the catalog page
  };

  const userImage = useCloudinaryImage(user?.avatar);

  return (
    <header className={`nav-header ${!isLandingPage && "landing-bg"}`}>
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
              <Link
                id="nav-link--1"
                to="/"
                className={`nav-link ${
                  navLinkActive == "nav-link--1" ? "nav-link--active" : ""
                }`}
                onClick={onNavLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                id="nav-link--2"
                to="/catalog"
                className={`nav-link ${
                  navLinkActive == "nav-link--2" ? "nav-link--active" : ""
                }`}
                onClick={onNavLinkClick}
              >
                Catalog
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  id="nav-link--3"
                  to="/create"
                  className={`nav-link ${
                    navLinkActive == "nav-link--3" ? "nav-link--active" : ""
                  }`}
                  onClick={onNavLinkClick}
                >
                  Create School
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </li>
            )}
            {user && (
              <li className="dropdown-menu-wrapper">
                <div
                  className="user-btn"
                  onClick={() => setDropdown((bool) => !bool)}
                >
                  {user?.avatar ? (
                    <AdvancedImage
                      cldImg={userImage}
                      className="user-avatar--img"
                      plugins={[lazyload(), responsive()]}
                    />
                  ) : (
                    <img
                      src={defaultAvatar}
                      className="user-avatar--img"
                      alt="user-avatar"
                    />
                  )}
                </div>

                <div
                  className={`user-dropdown--menu ${
                    dropdown ? "active" : "inactive"
                  }`}
                >
                  <h3 className="user-dropdown--username">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="user-dropdown--email">{user?.email}</p>
                  <ul className="user-dropdown--list">
                    <li className="link-wrapper">
                      <Link
                        to={`/user/profile/${user?._id}`}
                        className="user-dropdown--link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="user-dropdown--icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>

                        <p>Profile</p>
                      </Link>
                    </li>
                    <li className="link-wrapper">
                      <button
                        to="/user/profile"
                        className="user-dropdown--link"
                        onClick={onLogoutClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="user-dropdown--icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        <p>Logout</p>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        )}
      </nav>
      <div className="reconstruction ">
        <h3 className="subtitle">Website is under reconstruction!</h3>
        <p className="desc">
          Some of the features might be missing or not working as expected.
        </p>
      </div>
    </header>
  );
};

export default Navigation;
