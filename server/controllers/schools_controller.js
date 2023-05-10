const validateId = require("../middlewares/validateId");
const authorize = require("../middlewares/authorize");
const { cloudinary } = require("../util/cloudinary.js");

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
  const { location, style, order } = req.query; // if query is empty, it will be undefined
  const query = {};
  let sortObj = {};

  // generation of query object
  if (location) {
    query.settlement = location;
  }

  if (style) {
    query.schoolType = style;
  }

  if (order == "newest") {
    sortObj = { createdAt: -1 };
  } else if (order == "oldest") {
    sortObj = { createdAt: 1 };
  } else if (order == "most-liked") {
    sortObj = { likes: -1 };
  }

  const schools = await getAllSchools({ location, style }, sortObj);
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
  try {
    let uploadedResponse = null;

    if (req.body.isImageFile) {
      uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
        upload_preset: "danceguide_schools_images",
      });
    }

    const school = await createSchool({
      ...req.body,
      image: req.body.isImageFile ? uploadedResponse.public_id : req.body.image,
    });

    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

router.delete("/:id", validateId, authorize, async (req, res) => {
  req.params.id;
  const school = await deleteSchool(req.params.id);
  school;
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }
  res.status(200).json({ message: "School was deleted successfully" });
});

router.put("/:id", validateId, authorize, async (req, res) => {
  try {
    let uploadedResponse = null;

    if (req.body.isImageFile) {
      uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
        upload_preset: "danceguide_schools_images",
      });
    }

    const school = await updateSchool(req.params.id, {
      ...req.body,
      image: req.body.isImageFile ? uploadedResponse.public_id : req.body.image,
    });

    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    res.status(200).json(school);
  } catch (error) {}
});

module.exports = router;
