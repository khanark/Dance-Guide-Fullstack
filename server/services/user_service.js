const util = require('util');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const { sendError } = require('../util/sendError');
const userViewModel = require('../view_models/user_view_model');

const jwt = {
  sign: util.promisify(jsonwebtoken.sign),
  verify: util.promisify(jsonwebtoken.verify),
};

const SECRET = 'dwad12ddas';

const register = async ({ email, password, firstName, lastName, phoneNumber, expertise, city }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber,
    expertise,
    city,
  });
  await user.save();
  const token = await createToken(user);
  return userViewModel(user, token);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).lean();
  if (!Boolean(user)) {
    sendError('Wrong username or password', 401);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    sendError('Wrong username or password', 401);
  }
  const token = await createToken(user);
  return userViewModel(user, token);
};

const createToken = async ({ _id, email, firstName, lastName, phoneNumber }) => {
  const payload = {
    _id,
    email,
    firstName,
    lastName,
    phoneNumber,
  };
  return jwt.sign(payload, SECRET);
};

const verifyToken = async token => {
  const decodedUser = await jwt.verify(token, SECRET);
  const existingUser = await User.findById(decodedUser._id);
  if (!existingUser) {
    sendError('No authorization', 401);
  }
  return decodedUser;
};

const getSingleUser = async id => {
  const user = await User.findById(id)
    .populate({
      path: 'danceSchools',
      populate: {
        path: 'owner',
        select: 'phoneNumber email',
      },
    })
    .populate({
      path: 'likedSchools',
      populate: {
        path: 'owner',
        select: 'phoneNumber email',
      },
    })
    .lean();
  return userViewModel(user);
};

const getAllUsers = async () => {
  const users = await User.find();
  return users.map(user => userViewModel(user));
};

const updateUser = async (id, data) => {
  await User.findByIdAndUpdate(id, data, { runValidators: true });
  return getSingleUser(id);
  // return userViewModel(updatedUser);
};

module.exports = {
  register,
  login,
  verifyToken,
  getSingleUser,
  updateUser,
  getAllUsers,
};
