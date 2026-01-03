require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS: Allow frontend URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  'https://minor-project-1-ptcf3tanx-anurag-choudharys-projects-858a202a.vercel.app',
  'https://mernapp.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));
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

