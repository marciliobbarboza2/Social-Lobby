const Razorpay = require('razorpay');
const crypto = require('crypto');

// Function to get Razorpay instance
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

/**
 * Create an EMI order using Razorpay
 * @route POST /api/payment/create-emi-order
 * @access Private (assuming authentication is required)
 */
exports.createEMIOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', emi_options } = req.body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid amount. Amount must be greater than 0.'
      });
    }

    // Razorpay options for EMI
    const options = {
      amount: amount * 100, // Amount in paisa (smallest currency unit)
      currency: currency.toUpperCase(),
      payment_capture: 1, // Auto capture payment
      method: 'emi',
      emi_options: emi_options || {
        emi_tenure: 3, // Default 3 months EMI
        emi_type: 'debit' // or 'credit'
      }
    };

    // Get Razorpay instance
    const razorpay = getRazorpayInstance();

    // Create order
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      emi_options: order.emi_options,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Error creating EMI order:', error);
    res.status(500).json({
      error: 'Failed to create EMI order',
      message: error.message
    });
  }
};

/**
 * Verify EMI payment
 * @route POST /api/payment/verify-emi-payment
 * @access Private
 */
exports.verifyEMIPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify payment signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment verified successfully
      res.status(200).json({
        success: true,
        message: 'EMI payment verified successfully',
        payment_id: razorpay_payment_id
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

  } catch (error) {
    console.error('Error verifying EMI payment:', error);
    res.status(500).json({
      error: 'Failed to verify EMI payment',
      message: error.message
    });
  }
};
