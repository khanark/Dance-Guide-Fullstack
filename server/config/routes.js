const globalErrorHandler = require('../middlewares/error_handler');
const userController = require('../controllers/user_controller');
const danceSchoolsController = require('../controllers/schools_controller.js');

module.exports = app => {
  app.use('/users', userController);
  app.use('/schools', danceSchoolsController);
  app.use(globalErrorHandler());
};
