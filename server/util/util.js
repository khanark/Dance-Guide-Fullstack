const { verifyToken } = require('../services/user_service');
const { isValidObjectId } = require('mongoose');

const sendError = (err, code) => {
  throw new Error(err, { cause: code });
};

const handleResponse = (cb, msg) => {
  return async (req, res, next) => {
    try {
      const data = await cb(req.params.id ? req.params.id : req.body);
      res.status(200).json(data ? data : { message: msg });
    } catch (error) {
      next(error);
    }
  };
};

const validateUtility = (ref, options) => {
  return async (req, res, next) => {
    const id = req.params.id;
    try {
      if (options) {
        if (options.idValidator) {
          if (!isValidObjectId(id)) {
            sendError(`${ref} doesn't exist in the database`, 404);
          }
        }
        if (options.tokenValidator) {
          await verifyToken(req.headers);
        }
        if (options.dataValidator) {
          const data = await options.dataValidator(id);
          if (!data) {
            sendError(`${ref} doesn't exist in the database`, 404);
          }
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  sendError,
  handleResponse,
  validateUtility,
};
