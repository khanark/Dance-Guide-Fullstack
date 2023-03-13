// This is what the card should render
// name, description, link, image, city, street  (owner info)

import './Card.scss';

import { Link } from 'react-router-dom';
import { MdPinDrop } from 'react-icons/md';
import { useState } from 'react';

const Card = () => {
  let [hover, setHover] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-header">
        <img
          src="https://www.phillymag.com/wp-content/uploads/sites/3/2022/03/powerhouse-dance2-900x600-1.jpg"
          alt="example-image"
        />
        <div className="card-info">
          <h2>Хип-Хоп Клуб</h2>
        </div>
      </div>
      {hover && (
        <div className="card-details">
          <div className="card-infomation">
            <MdPinDrop />
            <p>София</p>
            <p>Манастирски Ливади</p>
          </div>
          <Link to="/details">Повече информация</Link>
        </div>
      )}
    </div>
  );
};

export default Card;
