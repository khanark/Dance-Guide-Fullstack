const errorParser = err => {
  if (err.name == 'ValidationError') {
    err.message = Object.values(err.errors)[0].message;
    err.cause = 400;
  } else if (err.code == '11000') {
    err.message = `${err.keyPattern.name ? 'School' : 'User'} already exists`;
    err.cause = 409;
  }
  return err;
};

module.exports = () => {
  return (err, req, res, next) => {
    console.log(err);
    const error = errorParser(err);
    res.status(err.cause || 500).json({ message: error.message });
  };
};
