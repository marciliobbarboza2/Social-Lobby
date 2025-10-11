const express = require('express');
const router = express.Router();

// Placeholder routes - to be implemented in Week 2
router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile endpoint - Coming in Week 2!' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile endpoint - Coming in Week 2!' });
});

router.get('/:id/posts', (req, res) => {
  res.json({ message: 'Get user posts endpoint - Coming in Week 2!' });
});

module.exports = router;
