const express = require('express');
const router = express.Router();

// Placeholder routes - to be implemented in Week 2
router.get('/', (req, res) => {
  res.json({ message: 'Get all posts endpoint - Coming in Week 2!' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get single post endpoint - Coming in Week 2!' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create post endpoint - Coming in Week 2!' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update post endpoint - Coming in Week 2!' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete post endpoint - Coming in Week 2!' });
});

module.exports = router;
