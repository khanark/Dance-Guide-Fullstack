import { useState } from "react";

const modelLocalStorage = value => {
  const { _id, avatar, firstName, lastName, token } = value;
  return {
    _id,
    avatar,
    firstName,
    lastName,
    token,
  };
};

export const useLocalStorage = initValue => {
  const [user, setUser] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : initValue;
  });
  const setLocalStorage = value => {
    const data = modelLocalStorage(value);
    localStorage.setItem("userData", JSON.stringify(data));
    setUser(data);
  };
  const clearLocalStorage = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };
  return { user, setUser: setLocalStorage, clearUser: clearLocalStorage };
};
