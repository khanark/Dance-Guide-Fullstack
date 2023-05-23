//  in case of future use

export const SCHOOL_ACTIONS = {
  GET_SCHOOLS: "GET_SCHOOLS",
  LIKE_SCHOOL: "LIKE_SCHOOL",
  ADD_SCHOOL: "ADD_SCHOOL",
  DELETE_SCHOOL: "DELETE_SCHOOL",
  UPDATE_SCHOOL: "UPDATE_SCHOOL",
  SORT_SCHOOLS_BY_LIKES: "SORT_SCHOOLS_BY_LIKES",
  SORT_SCHOOLS_BY_LATEST: "SORT_SCHOOLS_BY_LATEST",
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
    case "SORT_SCHOOLS_BY_LIKES":
      return [...state.sort((a, b) => b.likes.count - a.likes.count)];
    case "SORT_SCHOOLS_BY_LATEST":
      return [...state.sort((a, b) => b.createdAt.localeCompare(a.createdAt))];
  }
};
