import { createContext, useContext, useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import userServiceFactory from "../services/users";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { user, setUser, clearUser } = useLocalStorage();
  const [fetchError, setFetchError] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setFetchError(false);
  }, []);

  const { login, register, edit, logout, getSingle } = userServiceFactory(user);

  const navigate = useNavigate();

  const onSubmitLogin = async data => {
    try {
      const userData = await login(data);
      toast({
        title: "Успешно влизане.",
        description: `Привет ${userData.firstName} ^^.`,
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      setUser(userData);
      setTimeout(() => navigate("/catalog"), 2000);
    } catch (error) {
      setFetchError(true);
    }
  };

  const onSubmitRegister = async data => {
    try {
      await register(data);
      toast({
        title: "Успешна регистрация.",
        description: "Благодарим за вашата регистрация.",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setFetchError(true);
    }
  };

  const onSubmitEdit = async data => {
    try {
      const userData = await edit(data);
      setUser(userData);
      navigate("/catalog");
    } catch (error) {
      setFetchError(true);
    }
  };

  const onLogout = async () => {
    clearUser();
    await logout();
  };

  const context = {
    user,
    fetchError,
    onSubmitEdit,
    onSubmitLogin,
    onSubmitRegister,
    setFetchError,
    onLogout,
    getSingle,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export default UserContextProvider;
