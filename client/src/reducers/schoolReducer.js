export const SCHOOL_ACTIONS = {
  GET_SCHOOLS: "GET_SCHOOLS",
  ADD_SCHOOL: "ADD_SCHOOL",
  DELETE_SCHOOL: "DELETE_SCHOOL",
  UPDATE_SCHOOL: "UPDATE_SCHOOL",
};

export const schoolReducer = (state, actions) => {
  switch (actions.type) {
    case "GET_SCHOOLS":
      return [...actions.payload];
    case "ADD_SCHOOL":
      return [...state, actions.payload];
    case "DELETE_SCHOOL":
      return state.filter((school) => school._id !== actions.payload);
    case "UPDATE_SCHOOL":
      return state.map((school) =>
        school._id == actions.payload.id
          ? { ...school, ...actions.payload.data }
          : school
      );
  }
};
