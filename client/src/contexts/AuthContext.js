import { createContext, useContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { user, setUser, clearUser } = useLocalStorage();

  const navigate = useNavigate();

  const context = {
    user,
    setUser,
    clearUser,
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
