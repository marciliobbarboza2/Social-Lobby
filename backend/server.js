// Backend Server Setup for Socialobby
// Using Node.js + Express + MongoDB

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// For testing, we'll skip MongoDB connection temporarily
logger.info('⚠️ Running in test mode without MongoDB');

const app = express();

// Import security configurations
const { limiter, userLimiter, helmetConfig, csrfProtection, corsConfig } = require('./config/security');

// Security and parsing middleware
app.use(helmet(helmetConfig));
app.use(limiter);
app.use(cors(corsConfig));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser for CSRF
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// CSRF protection for web routes only
app.use((req, res, next) => {
  // Skip CSRF for API routes
  if (req.path.startsWith('/api/')) {
    next();
  } else {
    csrfProtection(req, res, next);
  }
});

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('✅ MongoDB connected successfully!');
  } catch (error) {
    logger.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payment');

// CSRF token endpoint (must come before CSRF protection)
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Public routes (no CSRF or user rate limiting)
app.use('/api/auth', authRoutes);

// Protected routes with CSRF and user rate limiting
app.use('/api/posts', userLimiter, postRoutes);
app.use('/api/comments', userLimiter, commentRoutes);
app.use('/api/users', userLimiter, userRoutes);
app.use('/api/payment', userLimiter, paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Socialobby API is running!',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`🚀 Server is running on port ${PORT}`);
    logger.info(`📝 API available at http://localhost:${PORT}/api`);
  });
}

module.exports = app;
