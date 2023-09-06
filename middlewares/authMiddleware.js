/*Middleware is useful for protecting routes that require authentication. When applied to a route, it ensures that 
only users with valid tokens can access that route,and it makes user information available in the req.user object for 
further processing within route handlers.*/

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
       // If the token is invalid or expired, respond with a 401 Unauthorized status and message
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach user information to the request for further processing
    req.user = decoded.user;
    next();// Continue processing the request
  });
};

module.exports = { authenticateUser };
