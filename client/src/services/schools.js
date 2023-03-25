import * as api from "../api/api";

const endpoints = {
  getAll: "/schools",
  create: "/schools",
  getSingleSchool: schoolId => `/schools/${schoolId}`,
};

const getAllSchools = async () => {
  return api.get(endpoints.getAll);
};

const createSchool = async ({
  name,
  image,
  link,
  settlementType,
  settlement,
  street,
  ownerId,
}) => {
  return api.post(endpoints.create, {
    name,
    image,
    link,
    settlementType,
    settlement,
    street,
    ownerId,
  });
};

const getSingleSchool = id => {
  return api.get(endpoints.getSingleSchool(id));
};

const schoolsFactory = user => {
  return {
    singleSchool: getSingleSchool,
    createSchool,
    getAllSchools,
  };
};

export default schoolsFactory;
