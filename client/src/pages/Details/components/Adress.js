import { BsFillHouseFill } from "react-icons/bs";

const Adress = ({ settlement, street }) => {
  return (
    <div className="address">
      <h3 className="address__title">Адрес</h3>
      <div className="address__info">
        <BsFillHouseFill />
        <p>
          {settlement}, улица: {street}
        </p>
      </div>
    </div>
  );
};

export default Adress;
