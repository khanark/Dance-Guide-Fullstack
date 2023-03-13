const sendError = (err, code) => {
  throw new Error(err, { cause: code });
};

module.exports = {
  sendError,
};
