import * as api from '../api/api';

const endpoints = {
  getAll: '/schools',
};

const getAllSchools = async () => {
  return api.get(endpoints.getAll);
};

export { getAllSchools };
