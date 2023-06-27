const DanceSchool = require('../models/DanceSchool');

// working
const createFeedback = async (schoolId, { owner, text }) => {
    const school = await DanceSchool.findById(schoolId);
    school.feedbacks.push({ owner, text });
    await school.save();
    return school.populate('feedbacks.owner', [
        'avatar',
        'firstName',
        'lastName',
    ]);
};

// works
const deleteFeedback = async (schoolId, feedbackId) => {
    const school = await DanceSchool.findById(schoolId);
    const feedbackIndex = school.feedbacks.findIndex(
        (feedback) => feedback._id === feedbackId
    );
    school.feedbacks.splice(feedbackIndex, 1);
    await school.save();
    return school;
};

const updateFeedback = async (schoolId, feedbackId, data) => {
    const school = await DanceSchool.findById(schoolId);
    school.feedbacks = school.feedbacks.map((feedback) =>
        feedback._id == feedbackId ? { ...feedback, ...data } : feedback
    );
    await school.save();
    return school;
};

const getSingleFeedback = async (schoolId, feedbackId) => {
    const school = await DanceSchool.findById(schoolId);
    const feedback = school.feedbacks.find(
        (feedback) => feedback._id == feedbackId
    );
    return feedback;
};

module.exports = {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getSingleFeedback,
};
