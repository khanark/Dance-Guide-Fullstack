import { MdDelete, MdEdit } from "react-icons/md";

import { Link } from "react-router-dom";

const UserButtons = ({ id }) => {
  return (
    <div className="user-action__buttons">
      <Link to={`/school/edit/${id}`}>
        <MdEdit />
        <p>Редактиране</p>
      </Link>
      <Link to={`/school/delete/${id}`}>
        <MdDelete />
        <p>Изтриване</p>
      </Link>
    </div>
  );
};

export default UserButtons;
