// import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import About from './pages/About/About';
import Auth from './pages/Auth/Auth';
import Catalog from './pages/Catalog/Catalog';
import Home from './pages/Home/Home';
import { UserContext } from './contexts/userContext';
import { getUser } from './util/util';

function App() {
    const [user, setUser] = useState(getUser());

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/authentication/:type" element={<Auth />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
