// import './App.css';

import { Route, Routes } from "react-router-dom";

import Login from "./components/Forms/Login/LoginForm";
import Edit from "./components/Forms/UserEdit/Edit";
import Register from "./components/Forms/UserRegister/Register";
import PrivateRoute from "./contexts/ProtectedRoute";
import UserContextProvider from "./contexts/UserContext";
import NotFound from "./pages/404/NotFound";
import About from "./pages/About/About";
import User from "./pages/Auth/Auth";
import Catalog from "./pages/Catalog/Catalog";
import Create from "./pages/Create/Create";
import Home from "./pages/Home/Home";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="/catalog" element={<Catalog />} />
        <Route element={<PrivateRoute redirectPath="/user/login" />}>
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
