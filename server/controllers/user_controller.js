const router = require("express").Router();
const authorize = require("../middlewares/authorize.js");
const validateId = require("../middlewares/validateId.js");
const { cloudinary } = require("../util/cloudinary.js");

const {
  register,
  login,
  getSingleUser,
  getAllUsers,
  updateUser,
} = require("../services/user_service.js");

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

router.post("/register", async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(202).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await login(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.get("/logout", authorize, async (req, res) => {
  res.status(200).json({ message: "You have been logged out!" });
});

router.get("/:id", validateId, authorize, async (req, res) => {
  const user = await getSingleUser(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

router.put("/:id", validateId, authorize, async (req, res) => {
  if (typeof req.body.avatar === "object") {
    delete req.body.avatar;
  }
  try {
    let uploadedResponse = null;

    if (req.body.avatarIsFile && req.body.avatar) {
      uploadedResponse = await cloudinary.uploader.upload(req.body.avatar, {
        upload_preset: "danceguide_user_avatars",
      });
    }

    const user = await updateUser(req.params.id, {
      ...req.body,
      avatar: req.body.avatarIsFile
        ? uploadedResponse.public_id
        : req.body.avatar,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = router;
