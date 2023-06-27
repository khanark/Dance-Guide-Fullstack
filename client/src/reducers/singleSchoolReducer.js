export const singleSchoolActions = {
    SET_SINGLE_SCHOOL: 'SET_SINGLE_SCHOOL',
    UPDATE_SINGLE_SCHOOL: 'UPDATE_SINGLE_SCHOOL',
    SET_LIKED: 'SET_LIKED',
    ADD_FEEDBACK: 'ADD_FEEDBACK',
    REMOVE_FEEDBACK: 'REMOVE_FEEDBACK',
    UPDATE_FEEDBACK: 'UPDATE_FEEDBACK',
};

const singleSchoolReducer = (state, actions) => {
    switch (actions.type) {
        case 'SET_SINGLE_SCHOOL':
            return {
                ...state,
                schoolDetails: actions.payload.school,
                isLiked: actions.payload.isLiked,
            };
        case 'UPDATE_SINGLE_SCHOOL':
            return {
                ...state,
                schoolDetails: {
                    ...state.schoolDetails,
                    ...actions.payload,
                },
            };
        case 'SET_LIKED':
            return { ...state, isLiked: actions.payload };
        case 'ADD_FEEDBACK':
            return {
                ...state,
                schoolDetails: {
                    ...state.schoolDetails,
                    feedbacks: [
                        ...state.schoolDetails.feedbacks,
                        actions.payload,
                    ],
                },
            };
        case 'REMOVE_FEEDBACK':
            return {
                ...state,
                schoolDetails: {
                    ...state.schoolDetails,
                    feedbacks: state.schoolDetails.feedbacks.filter(
                        (feedback) => feedback._id !== actions.payload
                    ),
                },
            };
        case 'UPDATE_FEEDBACK':
            return {
                ...state,
                schoolDetails: {
                    ...state.schoolDetails,
                    feedbacks: state.schoolDetails.feedbacks.map((feedback) =>
                        feedback._id === actions.payload.feedbackId
                            ? { ...feedback, ...actions.payload.data }
                            : feedback
                    ),
                },
            };
        default:
            return state;
    }
};

export default singleSchoolReducer;
