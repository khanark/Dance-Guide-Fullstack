import { Route, Routes } from 'react-router-dom';

import Catalog from './pages/Catalog/Catalog';
import { ChakraProvider } from '@chakra-ui/react';
import Create from './pages/Create/Create';
import Details from './pages/Details/Details';
import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import NotFound from './pages/404/NotFound';
import PrivateRoute from './guards/ProtectedRoute';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import SchoolContextProvider from './contexts/SchoolContext';
import SchoolEdit from './pages/SchoolEdit/SchoolEdit';
import UserContextProvider from './contexts/AuthContext';

function App() {
  return (
    <UserContextProvider>
      <SchoolContextProvider>
        <ChakraProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/details/:schoolId" element={<Details />} />
              <Route path="/user/profile/:userId" element={<Profile />} />
              <Route element={<PrivateRoute redirectPath="/login" />}>
                <Route path="/create" element={<Create />} />
                <Route path="/school/edit/:schoolId" element={<SchoolEdit />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ChakraProvider>
      </SchoolContextProvider>
    </UserContextProvider>
  );
}

export default App;
