const express = require('express');
const User = require('../models/User');
const Order = require('../models/Orders');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fetch = require('../middleware/fetchdetails');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'your_fallback_secret_change_this';
const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ============================================
// USER AUTHENTICATION ROUTES
// ============================================

// Creating a user and storing data to MongoDB Atlas, No Login Required
// Creating a user and storing data to MongoDB Atlas, No Login Required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
    body('location', 'Location is required').notEmpty()
], async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                error: 'User with this email already exists' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        // Create user
        const user = await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
            location: req.body.location
        });

        // Create JWT token
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '7d' });

        res.status(201).json({ 
            success: true, 
            authToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Create user error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Server error while creating user' 
        });
    }
});

// Authentication a User, No login Required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        // Find user and explicitly select password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }

        // Verify password
        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }

        // Create JWT token
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '7d' });

        res.json({ 
            success: true, 
            authToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Server error during login' 
        });
    }
});

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: 'User not found' 
            });
        }
        
        res.json({ success: true, user });
    } catch (error) {
        console.error('Get user error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// Get location from coordinates
router.post('/getlocation', async (req, res) => {
    try {
        const { lat, long } = req.body.latlong;
        
        if (!lat || !long) {
            return res.status(400).json({ 
                success: false, 
                error: 'Latitude and longitude are required' 
            });
        }

        if (!OPENCAGE_API_KEY) {
            return res.status(500).json({ 
                success: false, 
                error: 'Location service not configured' 
            });
        }

        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${OPENCAGE_API_KEY}`
        );

        if (response.data.results && response.data.results.length > 0) {
            const components = response.data.results[0].components;
            const { village, county, state_district, state, postcode } = components;
            
            const location = [
                village, 
                county, 
                state_district, 
                state, 
                postcode
            ].filter(Boolean).join(', ');
            
            res.json({ success: true, location });
        } else {
            res.status(404).json({ 
                success: false, 
                error: 'Location not found' 
            });
        }

    } catch (error) {
        console.error('Get location error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch location' 
        });
    }
});
// Get food data and categories
router.post('/foodData', async (req, res) => {
    try {
        if (!global.foodData || !global.foodCategory) {
            return res.status(503).json({ 
                success: false, 
                error: 'Food data not available' 
            });
        }
        
        res.json({
            success: true,
            data: [global.foodData, global.foodCategory]
        });
    } catch (error) {
        console.error('Food data error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch food data' 
        });
    }
});

// ============================================
// ORDER ROUTES
// ============================================

// Place order
router.post('/orderData', async (req, res) => {
    try {
        const { order_data, email, order_date } = req.body;

        // Validate input
        if (!order_data || !email || !order_date) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }

        // Add order date to the beginning of order data
        const data = [{ Order_date: order_date }, ...order_data];

        // Check if user has existing orders
        const existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // Create new order document
            await Order.create({
                email,
                order_data: [data]
            });
        } else {
            // Update existing order document
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: data } }
            );
        }

        res.json({ 
            success: true, 
            message: 'Order placed successfully' 
        });

    } catch (error) {
        console.error('Order data error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to place order' 
        });
    }
});

// Get user's order history
router.post('/myOrderData', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email is required' 
            });
        }

        const orderData = await Order.findOne({ email });
        
        if (!orderData) {
            return res.json({ 
                success: true, 
                orderData: null,
                message: 'No orders found'
            });
        }

        res.json({ 
            success: true, 
            orderData 
        });

    } catch (error) {
        console.error('My order data error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch order history' 
        });
    }
});

module.exports = router;

// ----------------------
// Minimal OAuth scaffolding (DEV ONLY)
// - Hitting `/api/auth/oauth/:provider` will issue a short-lived JWT for local/dev testing
// - Replace with full provider flow (Google/Apple) in production
router.get('/oauth/:provider', async (req, res) => {
    try {
        const provider = req.params.provider || 'unknown';
        // Create a test payload and sign a token
        const payload = { user: { id: `oauth-${provider}-dev-user` } };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

        // Redirect back to frontend with token (frontend should consume query param)
        const redirectUrl = `${FRONTEND_URL}/?oauth_provider=${encodeURIComponent(provider)}&token=${token}`;
        return res.redirect(302, redirectUrl);
    } catch (err) {
        console.error('OAuth stub error:', err.message);
        return res.status(500).json({ success: false, error: 'OAuth stub failed' });
    }
});