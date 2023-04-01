const DanceSchool = require("../models/DanceSchool");
const User = require("../models/User");

const getAllSchools = async () => {
  return DanceSchool.find().lean();
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
  const updatedSchool = await DanceSchool.findById(id).lean();
  return updatedSchool;
};

const createSchool = async ({
  name,
  image,
  link,
  schoolType,
  description,
  settlement,
  street,
  ownerId,
}) => {
  const school = new DanceSchool({
    name,
    image,
    link,
    settlement,
    description,
    schoolType,
    street,
    owner: ownerId,
  });
  const user = await User.findById(ownerId);
  user.danceSchools.push(school);
  await user.save();
  await school.save();
  return school;
};

const likeSchool = async (schoolId, { userId }) => {
  const school = await DanceSchool.findById(schoolId);
  if (school.likes.users.includes(userId)) return school;
  school.likes.users.push(userId);
  school.likes.count += 1;
  await school.save();
  return school;
};

const unLikeSchool = async (schoolId, { userId }) => {
  const school = await DanceSchool.findById(schoolId);
  if (school.likes.users.includes(userId) === false) return school;
  const userIndex = school.likes.users.indexOf(userId);
  school.likes.users.splice(userIndex, 1);
  school.likes.count -= 1;
  await school.save();
  return school;
};

module.exports = {
  getAllSchools,
  getSingleSchool,
  deleteSchool,
  updateSchool,
  createSchool,
  likeSchool,
  unLikeSchool,
};
