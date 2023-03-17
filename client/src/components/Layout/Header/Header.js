import './Header.scss';

import { useContext, useState } from 'react';

import { HiLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/userContext';
import logo from '../../../assets/images/header-logo-no-woman-cropped.png';
import { logout } from '../../../services/users';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    let [dropDown, setDropDown] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onDropDownClick = e => {
        setDropDown(!dropDown);
    };

    const onClickLogout = async () => {
        await logout();
        setUser(null);
        navigate('/catalog');
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
                            <Link to="/authentication/login">
                                Вход / Регистрация
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/create">Създай</Link>
                        </li>
                    )}

                    {/* <li>
                        <Link to="/create">Създай</Link>
                    </li> */}
                </ul>
                {user && (
                    <>
                        <img
                            src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2022-04/220421-elon-musk-al-1017-a6eece.jpg"
                            alt="userImg"
                            onClick={onDropDownClick}
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
                                    <Link
                                        className="sub-menu-links"
                                        to={`/catalog/users/${user.id}`}
                                    >
                                        Моите Публикации
                                    </Link>
                                    <Link
                                        className="sub-menu-links logout-btn"
                                        onClick={onClickLogout}
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
