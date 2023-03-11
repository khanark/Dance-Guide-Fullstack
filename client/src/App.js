import './App.css';

import { Route, Routes } from 'react-router-dom';

import About from './pages/About/About';
import Home from './pages/Home/Home';
import logo from './logo.svg';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
