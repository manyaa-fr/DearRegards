const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

const router = express.Router();

// In-memory store for OTPs (for production, use a persistent store like Redis)
const otpStore = new Map();

/**
 * Generates a 6-digit OTP.
 * @returns {string} The OTP.
 */
const generateOtp = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase().substring(0, 6);
};

// New: Password validation middleware for both login and register
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
    // Validation: Ensure all required fields are present and age is verified
    if (!email || !ageVerified) {
      return res.status(400).json({ error: 'All fields are required and you must be 18 or older.' });
    }

    let user = await User.findOne({ email });
    if (user) {
      // Check if the user is unverified and allow them to re-register to get a new OTP
      if (!user.isVerified) {
        await User.deleteOne({ email });
      } else {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }
    }

    user = new User({ email, password, ageVerified, isVerified: false });
    await user.save();

    const otp = generateOtp();
    otpStore.set(email, otp);

    await sendVerificationEmail(email, otp);

    res.status(201).json({ message: 'User registered. Please check your email for a verification OTP.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error during registration.', message: error.message });
  }
});

/**
 * @route POST /api/auth/verify-otp
 * @desc Verify the OTP and activate the user's account.
 * @access Public
 */
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtp = otpStore.get(email);
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.isVerified = true;
    await user.save();

    // OTP is single-use, delete it from the store
    otpStore.delete(email);

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Email successfully verified.',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error during OTP verification.' });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Authenticate user, check verification status, and get token.
 * @access Public
 */
router.post('/login', validatePassword, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    if (!user.isVerified) {
      // If the user is unverified, tell them to verify their email
      const otp = generateOtp();
      otpStore.set(email, otp);
      await sendVerificationEmail(email, otp);
      return res.status(401).json({ error: 'Please verify your email with the OTP we have sent you.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error during login.' });
  }
});

module.exports = router;