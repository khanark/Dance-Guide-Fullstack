export const singleSchoolActions = {
  SET_SINGLE_SCHOOL: "SET_SINGLE_SCHOOL",
  SET_LIKED: "SET_LIKED",
  ADD_FEEDBACK: "ADD_FEEDBACK",
  REMOVE_FEEDBACK: "REMOVE_FEEDBACK",
};

const singleSchoolReducer = (state, actions) => {
  switch (actions.type) {
    case "SET_SINGLE_SCHOOL":
      return { ...actions.payload };
    case "SET_LIKED":
      return { ...state, isLiked: actions.payload };
    case "ADD_FEEDBACK":
      return {
        ...state,
        schoolDetails: {
          ...state.schoolDetails,
          feedbacks: [...state.schoolDetails.feedbacks, actions.payload],
        },
      };
    case "REMOVE_FEEDBACK":
      return {
        ...state,
        schoolDetails: {
          ...state.schoolDetails,
          feedbacks: state.schoolDetails.feedbacks.filter(
            (feedback) => feedback._id !== actions.payload
          ),
        },
      };
  }
};

export default singleSchoolReducer;
