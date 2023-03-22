const router = require('express').Router();
const { register, login, getSingleUser, getAllUsers, updateUser } = require('../services/user_service.js');
const { handleResponse, validateUtility } = require('../util/responseHandling');

router.get('/', handleResponse(getAllUsers));
router.post('/register', handleResponse(register));
router.post('/login', handleResponse(login));
router.get('/logout', validateUtility({ tokenValidator: true }), async (req, res) => {
  res.status(204).json({});
});
router.get('/:id', validateUtility({ idValidator: true, tokenValidator: true }, " User"), handleResponse(getSingleUser));

router.put('/:id', validateUtility({ idValidator: true, tokenValidator: true }, "User"), handleResponse(updateUser));

module.exports = router;
