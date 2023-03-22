import './Header.scss';

import { useContext, useState } from 'react';

import { HiLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import defaultAvatar from '../../../assets/images/blank-avatar-image.png';
import logo from '../../../assets/images/header-logo-no-woman-cropped.png';

const Header = () => {
  let [dropDown, setDropDown] = useState(false);
  const { user, clearUser } = useContext(UserContext);

  const onDropDownClick = e => {
    setDropDown(!dropDown);
  };

  const onClickLogout = async () => {
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
            <Link to="/about">За Нас</Link>
          </li>
          <li>
            <Link to="/catalog">Каталог</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/user/login">Вход / Регистрация</Link>
            </li>
          ) : (
            <li>
              <Link to="/create">Създай</Link>
            </li>
          )}
        </ul>
        {user && (
          <>
            <img src={!user.avatar ? defaultAvatar : user.avatar} alt="userImg" onClick={onDropDownClick} />
            {dropDown && (
              <div className="sub-menu-wrap">
                <div className="sub-menu">
                  <div className="user-info">
                    <h3 className="user-username">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                  <hr />
                  <Link className="sub-menu-links" to={`/user/edit`}>
                    Редактиране на профила
                  </Link>
                  <Link className="sub-menu-links" to={`/catalog`}>
                    Моите Публикации
                  </Link>
                  <Link to="/" className="sub-menu-links logout-btn" onClick={onClickLogout}>
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
