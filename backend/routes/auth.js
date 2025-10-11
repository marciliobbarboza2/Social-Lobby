const express = require('express');
const router = express.Router();

// Placeholder routes - to be implemented in Week 2
router.post('/register', (req, res) => {
  res.json({ message: 'User registration endpoint - Coming in Week 2!' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'User login endpoint - Coming in Week 2!' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'User logout endpoint - Coming in Week 2!' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'Get current user endpoint - Coming in Week 2!' });
});

module.exports = router;
