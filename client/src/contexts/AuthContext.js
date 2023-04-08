import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { user, setUser, clearUser } = useLocalStorage();

  // This state is being used if the user is new
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const context = {
    user,
    setUser,
    clearUser,
    setEmail,
    email,
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
