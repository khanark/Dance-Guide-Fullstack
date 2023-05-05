import { Route, Routes } from "react-router-dom";

import Catalog from "./pages/Catalog/Catalog";
import { ChakraProvider } from "@chakra-ui/react";
import Create from "./pages/Create/Create";
import Details from "./pages/Details/Details";
import Edit from "./pages/UserEdit/Edit";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/LoginForm";
import NotFound from "./pages/404/NotFound";
import PrivateRoute from "./guards/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/UserRegister/Register";
import SchoolContextProvider from "./contexts/SchoolContext";
import SchoolEdit from "./pages/SchoolEdit/SchoolEdit";
import UserContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <UserContextProvider>
      <SchoolContextProvider>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/details/:schoolId" element={<Details />} />
            <Route element={<PrivateRoute redirectPath="/login" />}>
              <Route path="/user/edit" element={<Edit />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="create" element={<Create />} />
              <Route path="/school/edit/:schoolId" element={<SchoolEdit />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ChakraProvider>
      </SchoolContextProvider>
    </UserContextProvider>
  );
}

export default App;
