const DanceSchool = require("../models/DanceSchool");
const User = require("../models/User");

const getAllSchools = async () => {
  return DanceSchool.find().lean();
  // .sort({ _createdAt: "desc" })
};

const getSingleSchool = async id => {
  return DanceSchool.findById(id)
    .populate("owner", [
      "email",
      "firstName",
      "lastName",
      "phoneNumber",
      "moreInfo",
      "avatar",
    ])
    .lean();
};

const deleteSchool = async id => {
  await DanceSchool.findByIdAndRemove(id);
};

const updateSchool = async (id, data) => {
  await DanceSchool.findByIdAndUpdate(id, data, { runValidators: true });
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
  const school = new DanceSchool({
    name,
    image,
    link,
    settlementType,
    settlement,
    street,
    owner: ownerId,
  });
  const user = await User.findById(ownerId);
  user.danceSchools.push(school);
  await user.save();
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
