require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS: in production allow the configured frontend, in development allow any origin (convenient for localhost ports)
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
} else {
  // Permit any origin during development to avoid preflight failures across localhost ports
  app.use(cors({ origin: true, credentials: true }));
  // Ensure OPTIONS preflight requests are handled and return CORS headers
  app.options('*', cors({ origin: true, credentials: true }));
  // Add lightweight logging of origin/method to help debug CORS issues
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[CORS DEBUG] Origin:', req.headers.origin, 'Method:', req.method, 'Path:', req.path);
    }
    // Early respond to OPTIONS to satisfy preflight checks
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization');
      return res.sendStatus(204);
    }
    next();
  });
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Initialize app with database connection
const initializeApp = async () => {
  try {
    // Connect to MongoDB and fetch initial data
    const { foodData, categoryData } = await connectDB();
    
    // Store in global variables (or consider using Redis for production)
    global.foodData = foodData;
    global.foodCategory = categoryData;
    
    console.log(`📦 Loaded ${foodData.length} food items and ${categoryData.length} categories`);
    
    // Routes
    app.get('/', (req, res) => {
      res.json({ 
        message: 'GoFood API Server',
        version: '2.0.0',
        status: 'running'
      });
    });
    
    app.use('/api/auth', require('./Routes/Auth'));
    
    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ 
        success: false, 
        error: 'Route not found' 
      });
    });
    
    // Global error handler
    app.use((err, req, res, next) => {
      console.error('Error:', err.stack);
      res.status(err.status || 500).json({ 
        success: false, 
        error: process.env.NODE_ENV === 'development' 
          ? err.message 
          : 'Internal server error' 
      });
    });
    
    // Start server
    app.listen(PORT, () => {
      console.log(`\u{1F680} Server running on http://localhost:${PORT}`);
      console.log(`\u{1F310} Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Start the application
initializeApp();

