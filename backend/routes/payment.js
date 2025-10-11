const express = require('express');
const { body, validationResult } = require('express-validator');
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// @desc    Create EMI order
// @route   POST /api/payment/create-emi-order
// @access  Private
router.post('/create-emi-order', verifyToken, [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').optional().isString().withMessage('Currency must be a string'),
  body('emi_options').optional().isObject().withMessage('EMI options must be an object')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, paymentController.createEMIOrder);

// @desc    Verify EMI payment
// @route   POST /api/payment/verify-emi-payment
// @access  Private
router.post('/verify-emi-payment', verifyToken, [
  body('razorpay_order_id').isString().withMessage('Razorpay order ID is required'),
  body('razorpay_payment_id').isString().withMessage('Razorpay payment ID is required'),
  body('razorpay_signature').isString().withMessage('Razorpay signature is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, paymentController.verifyEMIPayment);

module.exports = router;
