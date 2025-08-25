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
    <>
      <header className="app-header">
        <Link to="/" className="logo">DearRegards</Link>
        <nav>
          {!user ? (
            <Link to="/auth" className="nav-link">Login / Register</Link>
          ) : (
            <>
              <Link to="/app" className="nav-link">Convert</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={logout} className="btn-link">Logout</button>
            </>
          )}
        </nav>
      </header>

      {/* <main style={{ flex: 1, display: 'flex' }}> */}
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
      {/* </main> */}
    </>
  );
}

export default App;