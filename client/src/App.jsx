import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ConversionTool from './components/ConversionTool';
import Dashboard from './components/Dashboard';
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import Socials from "./components/Socials";
import ContactUs from "./components/Contact";

function App() {
  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/app" element={<ConversionTool />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div className="container"><h2>404: Not Found</h2></div>} />
        </Routes>
  );
}

export default App;