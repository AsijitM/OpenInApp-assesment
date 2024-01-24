
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
  // const authHeader=req.header['authorization']
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Replace with your actual secret key
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = authenticate;
