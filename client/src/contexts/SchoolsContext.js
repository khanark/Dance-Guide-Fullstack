// import { createContext, useContext, useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import schoolsFactory from "../services/schools";
// import { useUserContext } from "./UserContext";

// const SchoolContext = createContext();

// const SchoolContextProvider = ({ children }) => {
//   const [schools, setSchools] = useState([]);
//   const [fetchError, setFetchError] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const { user } = useUserContext();
//   const navigate = useNavigate();

//   const {
//     singleSchool,
//     getAllSchools,
//     createSchool,
//     likeSchool,
//     unLikeSchool,
//   } = schoolsFactory(user);

//   useEffect(() => {
//     getAllSchools().then(data => {
//       setSchools(data);
//       setIsLoading(false);
//     });
//   }, []);

//   const onSubmitCreate = async data => {
//     try {
//       await createSchool({ ...data, ownerId: user._id });
//       navigate("/catalog");
//     } catch (error) {
//       setFetchError(true);
//     }
//   };

//   const context = {
//     schools,
//     user,
//     singleSchool,
//     onSubmitCreate,
//     setSchools,
//     isLoading,
//     likeSchool,
//     unLikeSchool,
//     fetchError,
//   };

//   return (
//     <SchoolContext.Provider value={context}>{children}</SchoolContext.Provider>
//   );
// };

// export const useSchoolContext = () => {
//   const context = useContext(SchoolContext);
//   return context;
// };

// export default SchoolContextProvider;
