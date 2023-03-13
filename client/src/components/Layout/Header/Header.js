import './Header.scss';

import { HiLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/header-logo-no-woman-cropped.png';
import { useState } from 'react';

const Header = () => {
  let [dropDown, setDropDown] = useState(false);

  const onDropDownClick = e => {
    setDropDown(prev => (prev = !dropDown));
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
          <li>
            <Link to="/authentication/login">Вход / Регистрация</Link>
          </li>
          <li>
            <Link to="/create">Създай</Link>
          </li>
        </ul>
        <img
          src=""
          alt="userImg"
          onClick={onDropDownClick}
          onBlur={() => setDropDown(false)}
        />
        {dropDown && (
          <div className="sub-menu-wrap">
            <div className="sub-menu">
              <div className="user-info">
                <h3 className="user-username">Анди</h3>
              </div>
              <hr />
              <Link className="sub-menu-links" to="#">
                Редактиране на профила
              </Link>
              <Link className="sub-menu-links" to="#">
                Моите Публикации
              </Link>
              <Link className="sub-menu-links logout-btn" to="#">
                <p>Изход</p>
                <HiLogout />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
