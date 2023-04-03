import * as api from "../api/api";

const endpoints = {
  getAll: "/schools",
  create: "/schools",
  getSingleSchool: schoolId => `/schools/${schoolId}`,
  likeSchool: schoolId => `/schools/${schoolId}/like`,
  unlikeSchool: schoolId => `/schools/${schoolId}/unlike`,
};

const getAllSchools = async () => {
  return api.get(endpoints.getAll);
};

const createSchool = async ({
  name,
  image,
  link,
  settlement,
  schoolType,
  description,
  street,
  ownerId,
}) => {
  return api.post(endpoints.create, {
    name,
    image,
    link,
    settlement,
    street,
    ownerId,
    description,
    schoolType,
  });
};

const getSingleSchool = id => {
  return api.get(endpoints.getSingleSchool(id));
};

const updateSchool = (id, data) => {
  return api.put(endpoints.getSingleSchool(id), { ...data });
};

const deleteSchool = (id) => {
  return api.del(endpoints.getSingleSchool(id))
}

const likeSchool = async (userId, schoolId) => {
  return api.post(endpoints.likeSchool(schoolId), { userId });
};

const unLikeSchool = async (userId, schoolId) => {
  return api.post(endpoints.unlikeSchool(schoolId), { userId });
};

const schoolsFactory = user => {
  return {
    singleSchool: getSingleSchool,
    updateSchool,
    createSchool,
    getAllSchools,
    deleteSchool,
    likeSchool: likeSchool.bind(null, user?._id),
    unLikeSchool: unLikeSchool.bind(null, user?._id),
  };
};

export default schoolsFactory;
