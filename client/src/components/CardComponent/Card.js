// This is what the card should render
// name, description, link, image, city, street  (owner info)

import "./Card.scss";

import { Image, Placeholder } from "cloudinary-react";

import { IoMdThumbsUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdPinDrop } from "react-icons/md";

const Card = ({ _id, name, image, settlement, likes }) => {
  console.log(image);
  return (
    <div className="card-wrapper">
      <div className="card">
        <Link to={`/details/${_id}`}>
          <div className="overlay">
            <div className="text">Детайли</div>
          </div>
        </Link>
        <header className="card-header">
          <Image cloudName="du4uhmyq2" publicId={image} loading="lazy">
            <Placeholder type="blur" />
          </Image>
        </header>
        <div className="card-body">
          <div className="main-heading">
            <h3 className="school-name">{name}</h3>
            <div className="likes">
              <IoMdThumbsUp />
              <p>{likes.count}</p>
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
