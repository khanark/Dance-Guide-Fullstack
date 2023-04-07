import { danceTypeFormat, formatDate } from "../../../util/util";

import { BsCalendarDate } from "react-icons/bs";

const Heading = ({ name, createdAt, schoolType }) => {
  return (
    <div className="heading__info">
      <h2 className="school__name">{name}</h2>
      <p className="school__type">Вид танци: {danceTypeFormat(schoolType)} </p>
      <div className="created-at">
        <BsCalendarDate />
        <p>{formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default Heading;
