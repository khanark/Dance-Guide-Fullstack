const {
  getAllSchools,
  getSingleSchool,
  createSchool,
  deleteSchool,
  updateSchool,
} = require("../services/school_service");
const { handleResponse, validateUtility } = require("../util/responseHandling");

const router = require("express").Router();

router.get("/", handleResponse(getAllSchools));

router.get(
  "/:id",
  validateUtility("School", { idValidator: true }),
  handleResponse(getSingleSchool)
);

router.post(
  "/",
  validateUtility("School", { tokenValidator: true }),
  handleResponse(createSchool)
);

router.delete(
  "/:id",
  validateUtility("School", { tokenValidator: true, idValidator: true }),
  handleResponse(deleteSchool, "School was deleted successfully")
);

router.put(
  "/:id",
  validateUtility("School", { tokenValidator: true, idValidator: true }),
  handleResponse(updateSchool, "School was updated successfully")
);

module.exports = router;
