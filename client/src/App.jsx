import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import ConversionTool from './components/ConversionTool';
import Dashboard from './components/Dashboard';
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import Socials from "./components/Socials";
import ContactUs from "./components/Contact";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/contact" element={<ContactUs />} />
          {user ? (
            <>
              <Route path="/app" element={<ConversionTool />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <Route path="/app" element={<Auth />} />
          )}
          <Route path="*" element={<div className="container"><h2>404: Not Found</h2></div>} />
        </Routes>
  );
}

export default App;