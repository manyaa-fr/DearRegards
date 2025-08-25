const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using a JWT.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const auth = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  // Check if no token is present
  if (!token) {
    return res.status(401).json({ error: 'Authorization denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the user payload from the token to the request object
    req.user = decoded.user;
    next();
  } catch (e) {
    // Handle invalid token
    res.status(401).json({ error: 'Token is not valid.' });
  }
};

module.exports = auth;