module.exports = (user, token) => {
  const { _id, email, firstName, lastName, phoneNumber, avatar, moreInfo, danceSchools } = user;
  return {
    id: _id,
    email,
    firstName,
    lastName,
    phoneNumber: Number(phoneNumber),
    avatar,
    moreInfo,
    danceSchools,
    token,
  };
};
