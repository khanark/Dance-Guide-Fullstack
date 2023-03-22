import * as api from "../api/api";

const endpoints = {
  getAll: "/schools",
  create: "/schools",
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

export { getAllSchools, createSchool };
