import { createContext, useContext, useEffect, useState } from "react";

import { getAllSchools } from "../services/schools";

const SchoolContext = createContext({});

const SchoolContextProvide = ({ children }) => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getAllSchools.then(data => {
      setSchools(data);
    });
  }, [schools]);

  const onSubmitCreate = data => {
    console.log(data);
  };

  const context = {
    schools,
    onSubmitCreate,
  };

  return <SchoolContext.Provider>{children}</SchoolContext.Provider>;
};

const useSchoolContext = () => {
  const { schools, onSubmitCreate } = useContext(SchoolContext);
  return { schools, onSubmitCreate };
};
