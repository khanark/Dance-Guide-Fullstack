import { createContext, useContext, useReducer } from "react";

import { SCHOOL_ACTIONS } from "../reducers/schoolReducer";
import { schoolReducer } from "../reducers/schoolReducer";

const SchoolContext = createContext();

const SchoolContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(schoolReducer, []);

  const setSchools = (schools) => {
    dispatch({ type: SCHOOL_ACTIONS.GET_SCHOOLS, payload: schools });
  };

  const sortByLikes = () => {
    dispatch({ type: SCHOOL_ACTIONS.SORT_SCHOOLS_BY_LIKES });
  };

  const sortByLatest = () => {
    dispatch({ type: SCHOOL_ACTIONS.SORT_SCHOOLS_BY_LATEST });
  };

  const context = {
    schools: state,
    sortByLatest,
    sortByLikes,
    setSchools,
  };

  return (
    <SchoolContext.Provider value={context}>{children}</SchoolContext.Provider>
  );
};

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  return context;
};

export default SchoolContextProvider;