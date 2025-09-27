import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://dearregards.onrender.com/api';
const OTP_TIMER_SECONDS = 90;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ageVerified: false,
    otp: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const timerRef = useRef(null);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // countdown effect
  useEffect(() => {
    if (otpTimer > 0) {
      timerRef.current = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
    }


    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [otpTimer]);

  // ensure cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const resetFormAndState = () => {
  setFormData({ email: '', password: '', ageVerified: false, otp: '' });
  setMessage(null);
  setError(null);
  setIsLoading(false);
  setOtpTimer(0);
  if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }
};

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;


    // keep OTP numeric only, max 6 digits
    if (e.target.name === 'otp') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
      setFormData({ ...formData, otp: digitsOnly });
      return;
    }


    setFormData({ ...formData, [e.target.name]: value });
  };


  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        login(response.data.token, response.data.user);
        if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        }
        navigate('/app');
      } else {
        if (!formData.ageVerified) {
          setError('You must be 18 or older to register.');
          setIsLoading(false);
          return;
        }
        await axios.post(`${BACKEND_URL}/auth/register`, {
          email: formData.email,
          password: formData.password,
          ageVerified: formData.ageVerified
        });
        setRequiresVerification(true);
        setMessage('Registration successful! Please check your email for an OTP.');
        setOtpTimer(OTP_TIMER_SECONDS);
      }
    } catch (err) {
      if (err.response?.status === 401 && isLogin) {
        // backend asking user to verify email
        setRequiresVerification(true);
        setMessage(err.response.data?.error || 'Please verify your email.');
        setOtpTimer(OTP_TIMER_SECONDS);
      } else {
        setError(err.response?.data?.error || 'An unexpected error occurred.');
      }
      } finally {
        setIsLoading(false);
      }
    };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });
      // clear timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setOtpTimer(0);
      login(response.data.token, response.data.user);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
    };

    const handleResendOtp = async () => {
      setMessage(null);
      setError(null);
      setIsLoading(true);

      try {
        await axios.post(`${BACKEND_URL}/auth/resend-otp`, {
        email: formData.email
        });
        setMessage('OTP is arriving in your email.');
        setOtpTimer(OTP_TIMER_SECONDS);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to resend OTP.');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <button 
          className="auth-back-button" onClick={() => {resetFormAndState(); navigate('/')}}>
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo"><span>DR</span></div>
            <div>
              <h1 className="auth-title gradient-text">
                {requiresVerification 
                  ? 'Verify Your Email'
                  : isLogin 
                    ? 'Welcome Back'
                    : 'Create Account'
                }
              </h1>
              <p className="auth-description">
                {requiresVerification 
                  ? 'Enter the OTP sent to your email'
                  : isLogin 
                    ? 'Sign in to your account'
                    : 'Join thousands of users creating amazing experiences'
                }
              </p>
            </div>
          </div>

          <div className="auth-content-area">
            {message && (
              <div className="alert alert-success">
                <CheckCircle size={16} />
                <p className="alert-description">{message}</p>
              </div>
            )}
            {error && (
              <div className="alert alert-error">
                <AlertCircle size={16} />
                <p className="alert-description">{error}</p>
              </div>
            )}

            {!requiresVerification ? (
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="auth-input-container">
                    <Mail className="auth-input-icon" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="auth-input-container">
                    <Lock className="auth-input-icon" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="auth-checkbox-container">
                    <input
                      id="ageVerified"
                      name="ageVerified"
                      type="checkbox"
                      checked={formData.ageVerified}
                      onChange={handleChange}
                      className="auth-checkbox"
                    />
                    <label htmlFor="ageVerified" className="checkbox-label">
                      I confirm that I am 18 years or older
                    </label>
                  </div>
                )}

                <button type="submit" className="auth-submit-button" disabled={isLoading}>
                  {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="otp" className="form-label">Verification Code</label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.otp}
                    onChange={handleChange}
                    className="auth-input auth-otp-input"
                    maxLength={6}
                    required
                  />
                  <p className="auth-otp-info">Code sent to {formData.email}</p>
                  {otpTimer > 0 ? (
                    <p className="auth-otp-timer" aria-live="polite">
                    OTP is arriving... Please wait {formatTimer(otpTimer)} to resend.
                    </p>
                  ) : (
                    <p className="auth-otp-timer">Didn't receive it? You can resend the OTP.</p>
                  )}
                </div>
                <button type="submit" className="auth-submit-button" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                </button>
                <button
                  type="button"
                  className="auth-back-to-login"
                  onClick={() => {
                    setRequiresVerification(false);
                    setOtpTimer(0);
                    if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                  }
                }}
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  className="auth-resend-otp"
                  onClick={handleResendOtp}
                  disabled={otpTimer > 0 || isLoading}
                  style={{ marginTop: '10px' }}
                >
                  {otpTimer > 0 ? `Resend OTP (${formatTimer(otpTimer)})` : 'Resend OTP'}
                </button>
              </form>
            )}
          </div>

          <div className="auth-footer">
            <div className="auth-separator"></div>
            <div className="auth-switch-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="auth-switch-button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setRequiresVerification(false);
                  setMessage(null);
                  setError(null);
                  setFormData({ email: '', password: '', ageVerified: false, otp: '' });
                  setOtpTimer(0);
                  if (timerRef.current) {
                  clearTimeout(timerRef.current);
                  timerRef.current = null;
                  }
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>

        <div className="auth-legal-text">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="auth-legal-link">Terms of Service</Link> and{' '}
          <Link to="/privacy" className="auth-legal-link">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
};

export default Auth;
