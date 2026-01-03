const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'your_fallback_secret_change_this';

/**
 * Middleware to authenticate user via JWT token
 * Expects 'auth-token' header with valid JWT
 * Attaches user data to req.user on success
 */
const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('auth-token');
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            error: 'Access denied. No token provided.' 
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                error: 'Token expired. Please login again.' 
            });
        }
        
        res.status(401).json({ 
            success: false, 
            error: 'Invalid token' 
        });
    }
};

module.exports = authMiddleware;