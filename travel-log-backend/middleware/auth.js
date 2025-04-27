const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    if (user.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user[0];
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;