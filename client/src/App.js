// import './App.css';

import { Route, Routes } from 'react-router-dom';

import About from './pages/About/About';
import Auth from './pages/Auth/Auth';
import Catalog from './pages/Catalog/Catalog';
import Home from './pages/Home/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/authentication/:type" element={<Auth />} />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  );
}

export default App;
