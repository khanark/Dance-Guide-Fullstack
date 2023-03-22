const { verifyToken } = require('../services/user_service');
const { isValidObjectId } = require('mongoose');
const { sendError } = require('./sendError');

const handleResponse = (cb, msg) => {
  return async (req, res, next) => {
    try {
      let data;
      if (req.params.id && req.body) {
        data = await cb(req.params.id, req.body);
      } else if (req.params.id && !req.body) {
        data = await cb(req.params.id);
      } else {
        data = await cb(req.body);
      }
      res.status(200).json(data ? data : { message: msg });
    } catch (error) {
      next(error);
    }
  };
};

const validateUtility = (options, ref) => {
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
          const token = await verifyToken(req.headers);
          console.log(token);
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
  handleResponse,
  validateUtility,
};
