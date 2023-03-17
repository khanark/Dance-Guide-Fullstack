// This is what the card should render
// name, description, link, image, city, street  (owner info)

import './Card.scss';

import { Link } from 'react-router-dom';
import { MdPinDrop } from 'react-icons/md';
import { useState } from 'react';

const Card = ({ city, street, image, name, _id }) => {
    let [hover, setHover] = useState(false);

    return (
        <div
            className="card"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="card-header">
                <img src={image} alt="example-image" />
                <div className="card-info">
                    <h2>{name}</h2>
                </div>
            </div>
            {hover && (
                <div className="card-details">
                    <div className="card-infomation">
                        <MdPinDrop />
                        <p>{city}</p>
                        <p>{street}</p>
                    </div>
                    <Link to={`/details/${_id}`}>Повече информация</Link>
                </div>
            )}
        </div>
    );
};

export default Card;
