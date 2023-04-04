const validateId = require("../middlewares/validateId");
const authorize = require("../middlewares/authorize");

const {
  getAllSchools,
  getSingleSchool,
  createSchool,
  deleteSchool,
  updateSchool,
  likeSchool,
  unLikeSchool,
} = require("../services/school_service");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const schools = await getAllSchools();
  res.status(200).json(schools);
});

router.get("/:id", validateId, async (req, res) => {
  const school = await getSingleSchool(req.params.id);
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }
  res.status(200).json(school);
});

router.post("/:id/like", validateId, authorize, async (req, res) => {
  const school = await likeSchool(req.params.id, req.body);
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }
  res.status(200).json(school);
});

router.post("/:id/unlike", validateId, authorize, async (req, res) => {
  const school = await unLikeSchool(req.params.id, req.body);
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }
  res.status(200).json(school);
});

router.post("/", authorize, async (req, res) => {
  const school = await createSchool(req.body);
  res.status(200).json(school);
});

router.delete("/:id", validateId, authorize, async (req, res) => {
  const school = await deleteSchool(req.params.id);
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }
  res.status(200).json({ message: "School was deleted successfully" });
});

router.put("/:id", validateId, authorize, async (req, res) => {
  const school = await updateSchool(req.params.id, req.body);
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }
  res.status(200).json(school);
});

module.exports = router;
