import * as api from '../api/api';

import { removeUser, setUser } from '../util/util';

const endpoints = {
  login: '/users/login',
  register: '/users/register',
  logout: '/users/logout',
};

const login = async (email, password) => {
  try {
    const user = await api.post(endpoints.login, { email, password });
    console.log(user);
    setUser(user);
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (email, firstName, lastName, phoneNumber, password) => {
  const user = await api.post(endpoints.register, {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
  });
  setUser(user);
};

const logout = async () => {
  removeUser();
};

export { login, register, logout };
