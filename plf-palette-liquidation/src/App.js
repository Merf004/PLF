import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/commom/Layout';
import Home from './pages/Home';
import PaletteCatalog from './pages/PaletteCatalog';
import PaletteDetail from './pages/PaletteDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import './styles/index.css';
import ScrollToTop from './ScrolToTop';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/palettes" element={<PaletteCatalog />} />
          <Route path="/palette/:id" element={<PaletteDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <ScrollToTop/>
      </Layout>
    </Router>
  );
}

export default App;