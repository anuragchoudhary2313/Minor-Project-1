require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const runtimeConfigPath = path.resolve(__dirname, '..', 'public', 'backend-runtime.json');

const writeRuntimeConfig = (activePort) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const runtimeConfig = {
    apiBaseUrl: `http://localhost:${activePort}`,
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(runtimeConfigPath, JSON.stringify(runtimeConfig, null, 2));
  } catch (error) {
    console.warn(`⚠️  Unable to write runtime config: ${error.message}`);
  }
};

const startServer = (preferredPort) => {
  const numericPort = Number(preferredPort);
  const server = app.listen(numericPort, () => {
    writeRuntimeConfig(numericPort);
    console.log(`\u{1F680} Server running on http://localhost:${numericPort}`);
    console.log(`\u{1F310} Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && process.env.NODE_ENV !== 'production') {
      const fallbackPort = numericPort + 1;
      console.warn(`\u26A0\uFE0F  Port ${numericPort} is in use. Retrying on ${fallbackPort}...`);
      startServer(fallbackPort);
      return;
    }
    throw err;
  });
};

// Middleware
// CORS: Allow frontend URLs and all Vercel preview deployments
const corsOptions = {
  origin: function (origin, callback) {
    // Allow localhost
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    // Allow any Vercel deployment (vercel.app domain)
    if (origin && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    // Allow configured frontend URL
    if (origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    // Allow development
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token', 'Origin', 'Accept']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
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
    startServer(PORT);
    
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

