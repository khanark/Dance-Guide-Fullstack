import { MdDelete, MdEdit } from "react-icons/md";

import Dialog from "../../../components/Dialog/Dialog";
import { Link } from "react-router-dom";
import schoolsFactory from "../../../services/schools";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../hooks/useNotification";
import { useState } from "react";

const UserButtons = ({ id }) => {
  const { deleteSchool } = schoolsFactory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { notificateSuccess } = useNotification();

  const onClickDelete = async (e) => {
    e.preventDefault();
    onClose();
    try {
      setIsLoading(true);
      await deleteSchool(id);
      notificateSuccess({
        title: "Успешно изтриване",
        description: "Публикацията беше изтрита успешно",
      });
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-action__buttons">
      {isOpen && (
        <Dialog
          onClose={onClose}
          title="Изтриване на публикация"
          body="Сигурни ли сте, че искате да изтриете публикацията?"
          actionHandler={onClickDelete}
          actionTitle="Изтриване"
          disclosure={{ isOpen, onClose }}
        />
      )}
      <Link to={`/school/edit/${id}`}>
        <MdEdit />
        <p>Редактиране</p>
      </Link>
      <button type="button" onClick={onOpen} disabled={isLoading}>
        <MdDelete />
        <p>Изтриване</p>
      </button>
    </div>
  );
};

export default UserButtons;
