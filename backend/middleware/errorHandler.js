const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Don't log CSRF errors as they are expected
  if (err.code !== 'EBADCSRFTOKEN') {
    logger.error(err.message, { stack: err.stack });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  // Check if response object is valid
  if (res && typeof res.status === 'function') {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  } else if (err.code === 'EBADCSRFTOKEN') {
    // Handle CSRF token errors
    res.status(403).json({
      success: false,
      error: 'Invalid CSRF token'
    });
  } else {
    // Fallback if res is not available
    logger.error('Response object not available in error handler');
    next(err);
  }
};

module.exports = errorHandler;
