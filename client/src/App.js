// import './App.css';

import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./contexts/ProtectedRoute";
import UserContextProvider from "./contexts/UserContext";
import NotFound from "./pages/404/NotFound";
import About from "./pages/About/About";
import Catalog from "./pages/Catalog/Catalog";
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/LoginForm";
import Edit from "./pages/UserEdit/Edit";
import Register from "./pages/UserRegister/Register";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route element={<PrivateRoute redirectPath="/login" />}>
          <Route path="/user/edit" element={<Edit />} />
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
