import * as api from '../api/api';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    single: (userId) => `/users/${userId}`,
    avatar: (userId) => `/users/${userId}/avatar`,
};

const login = async ({ email, password }) =>
    api.post(endpoints.login, { email, password });

const registerUser = async ({
    email,
    firstName,
    lastName,
    phoneNumber,
    expertise,
    city,
    password,
}) => {
    return await api.post(endpoints.register, {
        email,
        firstName,
        lastName,
        expertise,
        city,
        phoneNumber,
        password,
    });
};

const editUser = async (userId, data) => {
    return api.patch(endpoints.single(userId), data);
};

const editUserAvatar = async (userId, data) => {
    return api.patch(endpoints.avatar(userId), { avatar: data });
};

const getSingle = (userId) => {
    return api.get(endpoints.single(userId));
};

const logout = async () => {
    return api.get(endpoints.logout);
};

export { login, registerUser, editUser, logout, getSingle, editUserAvatar };
