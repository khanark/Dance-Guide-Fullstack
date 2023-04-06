import { useToast } from "@chakra-ui/react";

export const useNotification = () => {
  const toast = useToast({
    isClosable: false,
    duration: 2000,
    position: "top",
  });

  const notificateSuccess = ({ title, description }) =>
    toast({ title, description, status: "success" });

  const notificateError = ({ title, description }) =>
    toast({ title, description, status: "error" });

  return { notificateSuccess, notificateError };
};
