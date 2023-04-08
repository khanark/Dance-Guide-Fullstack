import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

import { singleSchoolActions } from "../../../reducers/singleSchoolReducer";
import { updateFeedback } from "../../../services/feedbacks";
import { useForm } from "react-hook-form";
import { useRef } from "react";

// import { useDisclosure } from "@chakra-ui/hooks";

const EditFeedbackModal = ({
  schoolId,
  feedbackId,
  text,
  disclosure,
  dispatch,
}) => {
  const cancelRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: { text } });

  const onEditSubmit = async (data) => {
    if (!isDirty) return;
    try {
      await updateFeedback(schoolId, feedbackId, data);
      dispatch({
        type: singleSchoolActions.UPDATE_FEEDBACK,
        payload: { feedbackId, data },
      });
      disclosure.onClose();
    } catch (error) {
      console.log(
        "There has been an error updating the feedback " + error.message
      );
    }
  };

  return (
    <>
      <Modal isCentered isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактиране на отзив</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={Boolean(errors?.text)}>
              <FormLabel>Отзив:</FormLabel>
              <Textarea
                height="200px"
                placeholder="Here is a sample placeholder"
                {...register("text", {
                  minLength: {
                    value: 10,
                    message: "Минимален брой символи 10",
                  },
                })}
                size="md"
              ></Textarea>
              <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter gap="4">
            <Button
              ref={cancelRef}
              colorScheme="gray"
              onClick={disclosure.onClose}
            >
              Назад
            </Button>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={handleSubmit(onEditSubmit)}
            >
              Запази
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditFeedbackModal;
