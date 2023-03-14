import * as api from '../api/api';

import { removeUser, setUser } from '../util/util';

const endpoints = {
  login: '/users/login',
  register: '/users/register',
  logout: '/users/logout',
};

const login = async (email, password) => {
  const user = await api.post(endpoints.login, { email, password });
  setUser(user);
  return user;
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
