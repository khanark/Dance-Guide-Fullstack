import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";

const GreetModal = () => {
  const { onClose } = useDisclosure();
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  const onClickNavigate = (path) => {
    setUser({ ...user, isNewAcc: false });
    navigate(path);
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        size="lg"
        isOpen={true}
        onClose={onClose}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добре дошли във DanceGuide!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontWeight="bold" mb="1rem">
              Благодарим ви, че посетихте нашия уебсайт!
            </Text>
            <Text>
              Нашата цел е да ви предоставим най-доброто потребителско
              изживяване и да ви помогнем да постигнете целите си. За да ви
              улесним, предлагаме ви възможността да завършите профила, за да
              създадете своята първа публикация.
            </Text>
            <Text marginTop="4">
              Като попълните своя профил, можете да го използвате за да се
              свържете с други потребители и да споделите повече информация за
              себе си.
            </Text>
            <Text marginTop="4">
              Ако решите да създадете първа си публикация, можете да споделите
              вашата мисия, знания или преживявания с другите потребители на
              нашия уебсайт. Възможността да бъдете част от нашата общност и да
              споделяте своите мисли и идеи с другите е едно от най-ценните
              неща, които нашият уебсайт може да ви предложи.
            </Text>
            <Text marginTop="4" fontWeight="500">
              Затова, преди да започнете да използвате нашия уебсайт, ви
              препоръчваме да завършите профила си.{" "}
            </Text>
            <Text marginTop="4">
              Благодарим ви, че избрахте DanceGuide и се надяваме да се включите
              активно в нашата общност!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => onClickNavigate("/user/edit")}
            >
              Завърши профила
            </Button>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => onClickNavigate("/catalog")}
            >
              Каталог
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GreetModal;
