const {
  getAllSchools,
  getSingleSchool,
  createSchool,
  deleteSchool,
  updateSchool,
} = require('../services/school_service');
const { handleResponse, validateUtility } = require('../util/util');

const router = require('express').Router();

router.get('/', handleResponse(getAllSchools));

router.get(
  '/:id',
  validateUtility('School', { idValidator: true }),
  handleResponse(getSingleSchool)
);

router.post('/', async (req, res, next) => {
  try {
    const school = await createSchool(req.body);
    res.status(200).json(school);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteSchool(req.params.id);
    res.status(200).json({ message: 'School deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.put('/id', async (req, res, next) => {
  try {
    await updateSchool(id, req.body);
    res.status(200).json({ message: 'School updated successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
