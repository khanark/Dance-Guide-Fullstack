const {
  getAllSchools,
  getSingleSchool,
  createSchool,
  deleteSchool,
  updateSchool,
  likeSchool,
  unLikeSchool,
} = require("../services/school_service");
const { handleResponse, validateUtility } = require("../util/responseHandling");

const router = require("express").Router();

router.get("/", handleResponse(getAllSchools));
router.get(
  "/:id",
  validateUtility("School", { idValidator: true }, "School"),
  handleResponse(getSingleSchool)
);
router.post(
  "/:id/like",
  validateUtility(
    "School",
    { tokenValidator: true, idValidator: true },
    "School"
  ),
  handleResponse(likeSchool)
);
router.post(
  "/:id/unlike",
  validateUtility(
    "School",
    { tokenValidator: true, idValidator: true },
    "School"
  ),
  handleResponse(unLikeSchool)
);
router.post(
  "/",
  validateUtility("School", { tokenValidator: true }),
  handleResponse(createSchool)
);
router.delete(
  "/:id",
  validateUtility({ tokenValidator: true, idValidator: true }, "School"),
  handleResponse(deleteSchool, "School was deleted successfully")
);
router.put(
  "/:id",
  validateUtility(
    "School",
    { tokenValidator: true, idValidator: true },
    "School"
  ),
  handleResponse(updateSchool, "School was updated successfully")
);

module.exports = router;
