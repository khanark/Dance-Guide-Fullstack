module.exports = (user, token) => {
  const {
    _id,
    email,
    firstName,
    lastName,
    phoneNumber,
    avatar,
    moreInfo,
    danceSchools,
    likedSchools,
  } = user;
  return {
    _id,
    email,
    firstName,
    lastName,
    phoneNumber,
    avatar,
    moreInfo,
    danceSchools,
    likedSchools,
    token,
  };
};
