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
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/AuthContext';

const GreetModal = () => {
  const { onClose } = useDisclosure();
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  const onClickNavigate = path => {
    setUser({ ...user, isNewAcc: false });
    navigate(path);
  };

  return (
    <>
      <Modal closeOnOverlayClick={true} size="lg" isOpen={true} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'} fontSize={'2.4rem'} color={'#333'} align={'center'}>
            Welcome to DanceGuide!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize={'1.6rem'} fontWeight="bold" mb="1.6rem" color={'#555'} align={'center'}>
              Thanks for visiting our website!
            </Text>
            <Text>
              Our goal is to provide you with the best user experience and help you achieve your
              goals. To make it easier for you, we offer you the opportunity to complete your
              profile in order to create your first publication.
            </Text>
            <Text marginTop="4">
              By completing your profile, you can use it to connect with other users and share more
              information about yourself. You can also use it to create your first publication.
            </Text>
            <Text marginTop="4">
              If you decide to create your first publication, you can share your mission, knowledge,
              or experiences with other users on our website. The opportunity to be part of our
              community and share your thoughts and ideas with others is one of the most valuable
              things our website can offer you.
            </Text>
            <Text marginTop="4" fontWeight="500" color={'#555'}>
              Therefore, before you start using our website, we recommend completing your profile.
            </Text>
            <Text marginTop="4">
              Thank you for choosing DanceGuide, and we hope you actively engage in our community!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => onClickNavigate(`/user/profile/${user?._id}`)}
            >
              Complete registration
            </Button>
            <Button colorScheme="gray" onClick={() => onClickNavigate('/catalog')}>
              Catalog
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GreetModal;
