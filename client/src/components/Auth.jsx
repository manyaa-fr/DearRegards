import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
// import '../styles/Auth.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://dearregards.onrender.com/api';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', ageVerified: false, otp: '' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (isLogin) {
      try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        login(response.data.token, response.data.user);
        navigate('/app');
      } catch (err) {
        if (err.response?.status === 401) {
          setRequiresVerification(true);
          setMessage(err.response.data.error);
        } else {
          setError(err.response?.data?.error || 'An unexpected error occurred.');
        }
      }
    } else { // Register
      if (!formData.ageVerified) {
        return setError('You must be 18 or older to register.');
      }
      try {
        await axios.post(`${BACKEND_URL}/auth/register`, {
          email: formData.email,
          password: formData.password,
          ageVerified: formData.ageVerified,
        });
        setRequiresVerification(true);
        setMessage('Registration successful. Please check your email for an OTP.');
      } catch (err) {
        setError(err.response?.data?.error || 'An unexpected error occurred.');
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });
      login(response.data.token, response.data.user);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during verification.');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {message && <div className="alert">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {!requiresVerification ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            {!isLogin && (
              <div className="form-group">
                <input type="checkbox" name="ageVerified" checked={formData.ageVerified} onChange={handleChange} />
                <label htmlFor="ageVerified" className="checkbox-label">I am 18 or older</label>
              </div>
            )}
            <button type="submit" className="btn-primary">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <p style={{ marginBottom: '1rem' }}>Enter the OTP sent to your email to verify your account.</p>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input type="text" name="otp" value={formData.otp} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary">Verify Account</button>
          </form>
        )}

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="#" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Already have an account?'}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Auth;