// Import any necessary modules or dependencies
const jwt = require('jsonwebtoken');

// Middleware function for user authentication
const authenticateUser = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token and extract user information
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach user information to the request for further processing
    req.user = decoded.user;
    next();
  });
};

module.exports = { authenticateUser };
