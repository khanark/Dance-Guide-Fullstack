const router = require("express").Router();
const authorize = require("../middlewares/authorize.js");
const validateId = require("../middlewares/validateId.js");

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
  const user = await register(req.body);
  res.status(202).json(user);
});

router.post("/login", async (req, res) => {
  const user = await login(req.body);
  res.status(200).json(user);
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
  const user = await updateUser(req.params.id, req.body);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

module.exports = router;
