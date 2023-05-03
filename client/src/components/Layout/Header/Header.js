import "./Header.scss";

import { useEffect, useRef, useState } from "react";

import { HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/images/blank-avatar-image.jpg";
import logo from "../../../assets/images/header-logo-no-woman-cropped.png";
import { logout } from "../../../services/users";
import { useUserContext } from "../../../contexts/AuthContext";

// import { Image } from "cloudinary-react";

const Header = () => {
  let [dropDown, setDropDown] = useState(false);
  const { user, clearUser } = useUserContext();

  const onDropDownClick = () => {
    setDropDown(!dropDown);
  };

  // const menuRef = useRef();

  // useEffect(() => {
  //   const onClick = (e) => {
  //     if (!menuRef.current?.contains(e.target)) {
  //       setDropDown(false);
  //     }
  //   };

  //   document.addEventListener("click", onClick);
  //   return () => document.body.addEventListener("click", onClick);
  // }, []);

  const onLogoutClick = async () => {
    await logout();
    clearUser();
  };

  return (
    <header className="site-header">
      <div className="logo-container" id="header">
        <Link to="/">
          <img src={logo} alt="nav-logo" />
        </Link>
      </div>
      <nav className="site-navigation">
        <ul>
          <li>
            <Link to="/">Начало</Link>
          </li>
          <li>
            <Link to="/about">За нас</Link>
          </li>
          <li>
            <Link to="/catalog">Каталог</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login">Вход / Регистрация</Link>
            </li>
          ) : (
            <li>
              <Link to="/create">Създай</Link>
            </li>
          )}
        </ul>
        {user && (
          <>
            {!user.avatar && (
              <img
                src={defaultAvatar}
                alt="user-avatar"
                onClick={onDropDownClick}
                // ref={menuRef}
              />
            )}
            {user.avatar && (
              <Image
                cloudName="du4uhmyq2"
                width="300"
                publicId={user.avatar}
                crop="scale"
                onClick={onDropDownClick}
                // ref={menuRef}
              />
            )}
            {dropDown && (
              <div className="sub-menu-wrap">
                <div className="sub-menu">
                  <div className="user-info">
                    <h3 className="user-username">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                  <hr />
                  <Link className="sub-menu-links" to="/user/profile">
                    Моят профил
                  </Link>
                  <Link className="sub-menu-links" to="/user/edit">
                    Редактиране на профила
                  </Link>
                  <Link
                    to="/"
                    className="sub-menu-links logout-btn"
                    onClick={onLogoutClick}
                  >
                    <p>Изход</p>
                    <HiLogout />
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
