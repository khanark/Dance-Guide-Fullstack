import * as api from "../api/api";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
  single: (userId) => `/users/${userId}`,
};

const login = async ({ email, password }) =>
  api.post(endpoints.login, { email, password });

const registerUser = async ({
  email,
  firstName,
  lastName,
  phoneNumber,
  password,
}) => {
  return await api.post(endpoints.register, {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
  });
};

const edit = async (
  userId,
  { avatar, email, firstName, lastName, phoneNumber, moreInfo, avatarIsFile }
) => {
  return api.put(endpoints.single(userId), {
    avatar,
    email,
    firstName,
    lastName,
    phoneNumber,
    moreInfo,
    avatarIsFile,
  });
};

const getSingle = (userId) => {
  return api.get(endpoints.single(userId));
};

const logout = async () => {
  return api.get(endpoints.logout);
};

export { login, registerUser, edit, logout, getSingle };
