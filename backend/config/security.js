const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csurf = require('csurf');

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// User-based rate limiting
const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each user to 100 requests per window
  message: 'Too many requests, please try again later.',
  keyGenerator: (req) => req.user ? req.user._id.toString() : req.ip,
  standardHeaders: true,
  legacyHeaders: false,
});

// Helmet configuration for security headers
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"],
      frameAncestors: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true,
};

// CSRF protection configuration
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  // Ignore API routes that use JWT authentication
  value: (req) => {
    // Skip CSRF for API routes that use JWT authentication
    if (req.path.startsWith('/api/')) {
      return true; // Skip CSRF check
    }
    // For web routes, get token from request
    return (req.body && req.body._csrf) || 
           (req.query && req.query._csrf) || 
           (req.headers['csrf-token']) ||
           (req.headers['xsrf-token']) ||
           (req.headers['x-csrf-token']) ||
           (req.headers['x-xsrf-token']);
  }
});

// CORS configuration
const corsConfig = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'CSRF-Token',
    'X-CSRF-Token',
    'X-XSRF-Token'
  ],
  exposedHeaders: [
    'CSRF-Token',
    'X-CSRF-Token',
    'X-XSRF-Token'
  ],
  maxAge: 600, // Cache preflight request results for 10 minutes
  preflightContinue: false // End preflight request handling after OPTIONS response
};

module.exports = {
  limiter,
  userLimiter,
  helmetConfig,
  csrfProtection,
  corsConfig,
};