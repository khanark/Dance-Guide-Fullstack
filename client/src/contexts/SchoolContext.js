import { createContext, useContext, useReducer } from 'react';

import { SCHOOL_ACTIONS } from '../reducers/schoolReducer';
import { schoolReducer } from '../reducers/schoolReducer';

const SchoolContext = createContext();

const SchoolContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(schoolReducer, []);

    const setSchools = (schools) => {
        dispatch({ type: SCHOOL_ACTIONS.GET_SCHOOLS, payload: schools });
    };

    const addNewSchool = (school) => {
        dispatch({ type: SCHOOL_ACTIONS.ADD_SCHOOL, payload: school });
    };

    const updateSchool = (id, schoolData) => {
        dispatch({
            type: SCHOOL_ACTIONS.UPDATE_SCHOOL,
            payload: { id, data: schoolData },
        });
    };

    const context = {
        schools: state,
        setSchools,
        addNewSchool,
        updateSchool,
    };

    return (
        <SchoolContext.Provider value={context}>
            {children}
        </SchoolContext.Provider>
    );
};

export const useSchoolContext = () => {
    const context = useContext(SchoolContext);
    return context;
};

export default SchoolContextProvider;
