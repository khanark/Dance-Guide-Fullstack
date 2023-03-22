import "./NotFound.scss";

import { GiFishEscape } from "react-icons/gi";
import { Link } from "react-router-dom";
import error from "../../assets/images/404-page-not-found.jpg";
import logo from "../../assets/images/header-logo-no-woman-cropped.png";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="error">
        <img src={logo} alt="" />
        <div className="transparent">
          <img src={error} alt="" />
          <div className="error-msg">
            <p>
              <span>Oops</span>, Page Not Found!
            </p>
          </div>
        </div>
        <div className="call-to-action">
          <Link className="redirect" to="/">
            Click here
          </Link>
          <p className="escape">to escape</p>
          <GiFishEscape />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
