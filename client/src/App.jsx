import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import ConversionTool from './components/ConversionTool';
import Dashboard from './components/Dashboard';

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
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