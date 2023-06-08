const router = require('express').Router();
const authorize = require('../middlewares/authorize.js');
const validateId = require('../middlewares/validateId.js');
const { cloudinary } = require('../util/cloudinary.js');

const {
  register,
  login,
  getSingleUser,
  getAllUsers,
  updateUser,
} = require('../services/user_service.js');

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(202).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await login(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.get('/logout', authorize, async (req, res) => {
  res.status(200).json({ message: 'You have been logged out!' });
});

router.patch('/:id/avatar', validateId, authorize, async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(req.body.avatar, {
      upload_preset: 'danceguide_user_avatars',
    });

    const user = await updateUser(req.params.id, {
      avatar: uploadedResponse.public_id,
    });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({
        message: `There has been an error uploading the image${error.message}`,
      });
  }
});

router.get('/:id', validateId, async (req, res) => {
  const user = await getSingleUser(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

router.patch('/:id', validateId, authorize, async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

module.exports = router;
