import './Header.scss';

import { Link } from 'react-router-dom';
import logo from '../../../assets/images/header-logo-no-woman-cropped.png';

const Header = () => {
  return (
    <header className="site-header">
      <div className="logo-container" id="header">
        <Link to="/">
          <img src={logo} alt="indicates-error" />
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
            <Link to="/authentication">Вход / Регистрация</Link>
          </li>
          <li>
            <Link to="/create">Създай</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
