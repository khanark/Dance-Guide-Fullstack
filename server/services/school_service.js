const DanceSchool = require('../models/DanceSchool');

const getAllSchools = async () => {
  return DanceSchool.find().lean();
};

const getSingleSchool = async id => {
  return DanceSchool.findById(id).populate('owner', ['email', 'firstName', 'lastName']).lean();
};

const deleteSchool = async id => {
  await DanceSchool.findByIdAndRemove(id);
};

const updateSchool = async (id, data) => {
  await DanceSchool.findByIdAndUpdate(id, data, { runValidators: true });
};

const createSchool = async ({ name, description, link, image, city, street }, ownerId) => {
  const school = new DanceSchool({
    name,
    description,
    link,
    image,
    city,
    street,
    owner: ownerId,
  });
  await school.save();
  return school;
};

module.exports = {
  getAllSchools,
  getSingleSchool,
  deleteSchool,
  updateSchool,
  createSchool,
};
