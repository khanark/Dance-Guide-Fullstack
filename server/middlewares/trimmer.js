module.exports = () => {
  return (req, res, next) => {
    if (req.body) {
      for (const key in req.body) {
        if (typeof req.body[key] !== "string") {
          continue;
        }
        if (key == "email") {
          req.body[key] = req.body[key].toLowerCase();
        }
        req.body[key] = req.body[key].trim();
      }
    }
    next();
  };
};
