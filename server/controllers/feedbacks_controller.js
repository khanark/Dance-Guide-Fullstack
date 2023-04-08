const router = require("express").Router();
const {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getSingleFeedback,
} = require("../services/feedbacks_service");

router.get("/:id", async (req, res) => {
  const { schoolId } = req.query;
  const feedback = await getSingleFeedback(req.params.id, schoolId);
  res.status(200).json(feedback);
});

router.post("/:id", async (req, res) => {
  const feedback = await createFeedback(req.params.id, req.body);
  res.status(200).json(feedback);
});

router.put("/:id", async (req, res) => {
  const { feedbackId } = req.query;
  const feedback = await updateFeedback(req.params.id, feedbackId, req.body);
  res.status(200).json(feedback);
});

router.delete("/:id", async (req, res) => {
  const { schoolId } = req.query;
  const feedback = await deleteFeedback(req.params.id, schoolId);
  res.status(200).json(feedback);
});

module.exports = router;
