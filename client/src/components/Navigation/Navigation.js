import './Navigation.css';

import { useEffect, useMemo, useRef, useState } from 'react';

import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/images/blank-avatar-image.jpg';
import { useCloudinaryUserImage } from '../../hooks/useCloudinaryImage';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../../contexts/AuthContext';

const Navigation = ({ isLandingPage, authPage }) => {
  const { user, clearUser, setNavigationRef } = useUserContext();
  const { cloudinaryUserImage: userImage, setupCloudinaryImage } =
    useCloudinaryUserImage();
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const dropDownRef = useRef(null);

  const authPageState = useMemo(() => {
    return {
      isLoginPage: location.pathname === '/login',
    };
  }, [location]);

  const navigationRef = useRef(null);

  useEffect(() => {
    setNavigationRef(navigationRef);
  }, []);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    const handleClick = event => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  console.log(dropdown);

  const onLogoutClick = () => {
    clearUser(); // clearing the user from local storage upon logout
  };

  useEffect(() => {
    setupCloudinaryImage(user?.avatar);
  }, [user?.avatar]);

  return (
    <header
      ref={navigationRef}
      className={`nav-header ${
        !isLandingPage ? 'landing-bg' : 'isLandingPage'
      }`}
    >
      <nav
        className={`header-nav container-primary ${
          !isLandingPage ? 'landing-link' : 'isLandingPage'
        }`}
      >
        <h4 className="logo">
          <Link to="/">DanceGuide</Link>
        </h4>
        {authPage && (
          <div className="auth-page">
            <p className="auth-question">
              {authPageState.isLoginPage
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              className="nav-link"
              to={authPageState.isLoginPage ? '/register' : '/login'}
            >
              {authPageState.isLoginPage ? 'Sign Up' : 'Sign In'}
            </Link>
          </div>
        )}

        {!authPage && (
          <ul className="nav">
            <li>
              <Link id="nav-link--1" to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link id="nav-link--2" to="/catalog" className="nav-link">
                Catalog
              </Link>
            </li>
            {user && (
              <li>
                <Link id="nav-link--3" to="/create" className="nav-link">
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
                  onClick={() => setDropdown(bool => !bool)}
                >
                  {user?.avatar ? (
                    <AdvancedImage
                      cldImg={userImage}
                      className="user-avatar--img"
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
                  ref={dropDownRef}
                  className={`user-dropdown--menu ${
                    dropdown ? 'active' : 'inactive'
                  }`}
                >
                  <h4 className="user-dropdown--username">
                    {user?.firstName} {user?.lastName}
                  </h4>
                  <p className="user-dropdown--email">{user?.email}</p>
                  <ul className="user-dropdown--list">
                    <li className="link-wrapper">
                      <Link
                        to={`/user/profile/${user?._id}`}
                        className="user-dropdown--link"
                        onClick={() => setDropdown(false)}
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
                      <Link
                        to="/catalog"
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
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
