import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ConversionTool from './components/ConversionTool';

function App() {
  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<ConversionTool />} />
          <Route path="*" element={<div className="container"><h2>404: Not Found</h2></div>} />
        </Routes>
  );
}

export default App;