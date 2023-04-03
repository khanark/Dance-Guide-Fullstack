import { BsFillTelephoneFill } from "react-icons/bs";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

const Contacts = ({ link, owner, description }) => {
  return (
    <div className="contacts">
      <h3 className="contacts__title">Контакти</h3>
      <div className="contacts__info">
        <div className="phone">
          <BsFillTelephoneFill />
          <p>{owner?.phoneNumber}</p>
        </div>
        <div className="split__line"></div>
        <div className="email">
          <MdEmail />
          <p>{owner?.email}</p>
        </div>
        <div className="split__line"></div>
        <div className="link">
          <GrFormNextLink />
          <Link
            className="page__link"
            to={link}
            target={"_blank"}
            rel="noreferrer"
          >
            Официална страница
          </Link>
        </div>
      </div>
      <div className="horizontal__line"></div>
      <div className="school-description__wrapper">
        <h3 className="school-description__title">За нас:</h3>
        <p className="school-description__text">{description}</p>
      </div>
    </div>
  );
};

export default Contacts;
