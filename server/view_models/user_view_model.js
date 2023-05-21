module.exports = (user, token) => {
  const {
    _id,
    email,
    firstName,
    lastName,
    phoneNumber,
    avatar,
    moreInfo,
    city,
    expertise,
    danceSchools,
    likedSchools,
  } = user;
  return {
    _id,
    email,
    firstName,
    lastName,
    expertise,
    city,
    phoneNumber,
    avatar,
    moreInfo,
    danceSchools,
    likedSchools,
    token,
  };
};
