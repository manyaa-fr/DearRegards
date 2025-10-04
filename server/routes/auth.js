const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

const router = express.Router();

// In-memory store for OTPs and pending registrations
const otpStore = new Map();
const pendingRegistrations = new Map();

/**
 * Generates a 6-digit OTP.
 * @returns {string} The OTP.
 */
const generateOtp = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase().substring(0, 6);
};

/**
 * Validates email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation middleware
 */
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }
  next();
};

/**
 * @route POST /api/auth/register
 * @desc Register a new user and send a verification OTP.
 * @access Public
 */
router.post('/register', validatePassword, async (req, res) => {
  const { email, password, ageVerified } = req.body;

  try {
    // Validate email format
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    // Validate age verification
    if (!ageVerified) {
      return res.status(400).json({ error: 'You must be 18 or older to register.' });
    }

    // Check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ error: 'An account with this email already exists. Please login.' });
    }

    // If user exists but is unverified, delete them (cleanup)
    if (existingUser && !existingUser.isVerified) {
      await User.deleteOne({ email });
    }

    // Generate OTP
    const otp = generateOtp();
    
    // Store registration data temporarily (expires in 10 minutes)
    pendingRegistrations.set(email, {
      email,
      password,
      ageVerified,
      timestamp: Date.now()
    });
    
    // Store OTP (expires in 10 minutes)
    otpStore.set(email, {
      otp,
      timestamp: Date.now()
    });

    // Send verification email
    await sendVerificationEmail(email, otp);

    res.status(200).json({ 
      message: 'Verification code sent to your email. Please check your inbox.',
      email: email
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    
    // Check if it's an email sending error
    if (error.message === 'Could not send verification email.') {
      return res.status(500).json({ 
        error: 'Failed to send verification email. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    res.status(500).json({ 
      error: 'Server error during registration. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route POST /api/auth/verify-otp
 * @desc Verify the OTP and create the user account.
 * @access Public
 */
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Validate inputs
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    // Check if OTP exists
    const storedOtpData = otpStore.get(email);
    if (!storedOtpData) {
      return res.status(400).json({ error: 'OTP has expired or does not exist. Please register again.' });
    }

    // Check OTP expiration (10 minutes)
    const otpAge = Date.now() - storedOtpData.timestamp;
    if (otpAge > 10 * 60 * 1000) {
      otpStore.delete(email);
      pendingRegistrations.delete(email);
      return res.status(400).json({ error: 'OTP has expired. Please register again.' });
    }

    // Verify OTP
    if (storedOtpData.otp !== otp.toUpperCase()) {
      return res.status(400).json({ error: 'Invalid OTP. Please check and try again.' });
    }

    // Get pending registration data
    const registrationData = pendingRegistrations.get(email);
    if (!registrationData) {
      return res.status(400).json({ error: 'Registration data not found. Please register again.' });
    }

    // Create user in database
    const user = new User({
      email: registrationData.email,
      password: registrationData.password,
      ageVerified: registrationData.ageVerified,
      isVerified: true
    });

    await user.save();

    // Clean up temporary stores
    otpStore.delete(email);
    pendingRegistrations.delete(email);

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Email successfully verified. Your account has been created.',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    
    // Handle duplicate key error (user already exists)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'An account with this email already exists. Please login.' });
    }
    
    res.status(500).json({ error: 'Server error during verification. Please try again later.' });
  }
});

/**
 * @route POST /api/auth/resend-otp
 * @desc Resend OTP to user's email
 * @access Public
 */
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    // Check if there's a pending registration
    const registrationData = pendingRegistrations.get(email);
    if (!registrationData) {
      return res.status(400).json({ error: 'No pending registration found for this email. Please register first.' });
    }

    // Generate new OTP
    const otp = generateOtp();
    otpStore.set(email, {
      otp,
      timestamp: Date.now()
    });

    // Send verification email
    await sendVerificationEmail(email, otp);

    res.status(200).json({ message: 'A new verification code has been sent to your email.' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    
    if (error.message === 'Could not send verification email.') {
      return res.status(500).json({ error: 'Failed to send verification email. Please try again later.' });
    }
    
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and get token.
 * @access Public
 */
router.post('/login', validatePassword, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email format
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token (allow login even if unverified)
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { 
        id: user.id, 
        email: user.email,
        isVerified: user.isVerified // Send verification status to frontend
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login. Please try again later.' });
  }
});

module.exports = router;