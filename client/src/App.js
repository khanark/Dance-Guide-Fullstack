// import './App.css';

import { Route, Routes } from "react-router-dom";

import About from "./pages/About/About";
import Catalog from "./pages/Catalog/Catalog";
import { ChakraProvider } from "@chakra-ui/react";
import Create from "./pages/Create/Create";
import Details from "./pages/Details/Details";
import Edit from "./pages/UserEdit/Edit";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/LoginForm";
import NotFound from "./pages/404/NotFound";
import PrivateRoute from "./guards/ProtectedRoute";
import Register from "./pages/UserRegister/Register";
import SchoolEdit from "./pages/SchoolEdit/SchoolEdit";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/details/:schoolId" element={<Details />} />
          <Route element={<PrivateRoute redirectPath="/login" />}>
            <Route path="/user/edit" element={<Edit />} />
            <Route path="create" element={<Create />} />
            <Route path="/school/edit/:schoolId" element={<SchoolEdit />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ChakraProvider>
    </UserContextProvider>
  );
}

export default App;
