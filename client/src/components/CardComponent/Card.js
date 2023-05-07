// This is what the card should render
// name, description, link, image, city, street  (owner info)

import "./Card.css";

import {
  AdvancedImage,
  lazyload,
  placeholder,
  resize,
  responsive,
} from "@cloudinary/react";

import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from "react-router-dom";
import { fill } from "@cloudinary/url-gen/actions/resize";

const Card = ({ _id, name, image, settlement, likes }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "du4uhmyq2",
    },
  });

  const url = cld.image(image);
  url.resize(fill().width(300).height(300));

  return (
    <Link to={`/details/${_id}`}>
      <div className="catalog-list--item">
        {/* <img src={image} alt="worman-card-image" className="item-img" /> */}
        <AdvancedImage
          className="item-img"
          cldImg={url}
          plugins={[lazyload(), responsive(), placeholder({ mode: "blur" })]}
        />

        <div className="item-info">
          <h2 className="title-tertirty">{name}</h2>
          <h3 className="subtitle">Contacts</h3>
          <ul className="item-contacts">
            <li className="item-contacts-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="contacts-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span>0877558277</span>
            </li>
            <li className="item-contacts-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="contacts-icon"
              >
                <path
                  stroke-linecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>

              <p>borislav.godumov@outlook.com</p>
            </li>
            <li className="item-contacts-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="contacts-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>

              <p>www.dancestyle.bg</p>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Card;
