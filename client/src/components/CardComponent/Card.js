// This is what the card should render
// name, description, link, image, city, street  (owner info)

import './Card.scss';

import { IoMdThumbsUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { MdPinDrop } from 'react-icons/md';

const Card = () => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <Link to={`/details/${'dwada'}`}>
          <div className="overlay">
            <div className="text">Детайли</div>
          </div>
        </Link>
        <header className="card-header">
          <img
            src="https://www.phillymag.com/wp-content/uploads/sites/3/2022/03/powerhouse-dance2-900x600-1.jpg"
            alt="school"
          />
        </header>
        <div className="card-body">
          <div className="main-heading">
            <h3 className="school-name">Andrea dancing school</h3>
            <div className="likes">
              <IoMdThumbsUp />
              <p>230</p>
            </div>
          </div>
          <div className="adress-wrapper">
            <MdPinDrop />
            <p>София, Манастирски Ливади 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
