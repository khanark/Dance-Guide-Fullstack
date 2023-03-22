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

const createSchool = async ({ name, image, link, settlementType, settlement, street, ownerId }) => {
  const school = new DanceSchool({
    name,
    image,
    link,
    settlementType,
    settlement,
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
