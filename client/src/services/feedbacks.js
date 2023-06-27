import * as api from '../api/api';

// http://localhost:3030/feedbacks/64312f960c100f30390c7654?schoolId=6431326b51506464231817e2 [singleFeedback] [updateFeedback] [deleteFeedback]

const endpoints = {
    create: (schoolId) => `/feedbacks/${schoolId}`,
    singleFeedback: (schoolId, feedbackId) =>
        `/feedbacks/${schoolId}?feedbackId=${feedbackId}`,
};

const addFeedback = (schoolId, data) => {
    return api.post(endpoints.create(schoolId), data);
};

const deleteFeedback = (schoolId, feedbackId) => {
    return api.del(endpoints.singleFeedback(schoolId, feedbackId));
};

const updateFeedback = (schoolId, feedbackId, data) => {
    return api.put(endpoints.singleFeedback(schoolId, feedbackId), data);
};

export { addFeedback, deleteFeedback, updateFeedback };
