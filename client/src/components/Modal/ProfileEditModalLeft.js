import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

const ProfileEditModalLeft = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form className="form">
          <label htmlFor="email">
            <p className="form-label">Email</p>
            <input type="text" className="form-input" />
          </label>
          <label htmlFor="phone">
            <p className="form-label">Phone</p>
            <input type="text" className="form-input" />
          </label>
          <label htmlFor="moreInfo">
            <p className="form-label">About me</p>
            <textarea type="text" className="form-input" />
          </label>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProfileEditModalLeft;
