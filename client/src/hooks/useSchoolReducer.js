import { singleSchoolActions } from '../reducers/singleSchoolReducer';
import singleSchoolReducer from '../reducers/singleSchoolReducer';
import { useReducer } from 'react';

/**
 * Custom hook that creates a reducer and provides methods to manipulate the state managed by that reducer.
 * @returns {Array} A tuple containing the state and methods for manipulating the state.
 */
export const useSingleSchoolReducer = () => {
    const [state, dispatch] = useReducer(singleSchoolReducer, {
        schoolDetails: {},
        isLiked: false,
    });

    const singleSchoolMethods = {
        /**
         * Sets the single school in the state.
         * @param {Object} school - The school object to be set.
         * @param {boolean} isLiked - The liked status to be set.
         */
        setSingleSchool: (school, isLiked) => {
            dispatch({
                type: singleSchoolActions.SET_SINGLE_SCHOOL,
                payload: { school, isLiked },
            });
        },
        updateSingleSchool: (data) => {
            dispatch({
                type: singleSchoolActions.UPDATE_SINGLE_SCHOOL,
                payload: data,
            });
        },
        /**
         * Sets the liked status of the single school.
         * @param {boolean} isLiked - The liked status to be set.
         */
        setLiked: (isLiked) => {
            dispatch({ type: singleSchoolActions.SET_LIKED, payload: isLiked });
        },
        /**
         * Adds a feedback ID to the single school's feedback list.
         * @param {object} feedback - The feedback to be added.
         */
        addFeedback: (feedback) => {
            dispatch({
                type: singleSchoolActions.ADD_FEEDBACK,
                payload: feedback,
            });
        },
        /**
         * Removes a feedback ID from the single school's feedback list.
         * @param {string} feedbackId - The ID of the feedback to be removed.
         */
        removeFeedback: (feedbackId) => {
            dispatch({
                type: singleSchoolActions.REMOVE_FEEDBACK,
                payload: feedbackId,
            });
        },
        /**
         * Updates a specific feedback with new data.
         * @param {string} id - The ID of the feedback to be updated.
         * @param {Object} data - The new data to be assigned to the feedback.
         */
        updateFeedback: (id, data) => {
            dispatch({
                type: singleSchoolActions.UPDATE_FEEDBACK,
                payload: { feedbackId: id, data },
            });
        },
    };

    return [state, singleSchoolMethods];
};
