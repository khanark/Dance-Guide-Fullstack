// This is what the card should render
// name, description, link, image, city, street  (owner info)

import "./Card.scss";

import { IoMdThumbsUp } from "react-icons/io";
import { MdPinDrop } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({ _id, name, image, settlement, street, likes }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <Link to={`/details/${_id}`}>
          <div className="overlay">
            <div className="text">Детайли</div>
          </div>
        </Link>
        <header className="card-header">
          <img src={image} alt="school" />
        </header>
        <div className="card-body">
          <div className="main-heading">
            <h3 className="school-name">{name}</h3>
            <div className="likes">
              <IoMdThumbsUp />
              <p>{likes}</p>
            </div>
          </div>
          <div className="adress-wrapper">
            <MdPinDrop />
            <p>{settlement}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
