import "./Header.scss";

import { HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/images/blank-avatar-image.jpg";
import logo from "../../../assets/images/header-logo-no-woman-cropped.png";
import { useState } from "react";
import { useUserContext } from "../../../contexts/AuthContext";

const Header = () => {
  let [dropDown, setDropDown] = useState(false);
  const { user, clearUser } = useUserContext();

  const onDropDownClick = (e) => {
    setDropDown(!dropDown);
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
            <Link to="/about">За Нас</Link>
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
            <img
              src={!user.avatar ? defaultAvatar : user.avatar}
              alt="userImg"
              onClick={onDropDownClick}
            />
            {dropDown && (
              <div className="sub-menu-wrap">
                <div className="sub-menu">
                  <div className="user-info">
                    <h3 className="user-username">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                  <hr />
                  <Link className="sub-menu-links" to={`/user/profile`}>
                    Моят профил
                  </Link>
                  <Link className="sub-menu-links" to="/user/edit">
                    Редактиране на профила
                  </Link>
                  <Link
                    to="/"
                    className="sub-menu-links logout-btn"
                    onClick={clearUser}
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
