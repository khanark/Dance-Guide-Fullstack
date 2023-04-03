import { createContext, useContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { user, setUser, clearUser } = useLocalStorage();

  const toast = useToast();
  const navigate = useNavigate();

  const context = {
    user,
    setUser,
    clearUser,
    toast,
    navigate,
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
