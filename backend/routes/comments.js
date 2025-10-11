const express = require('express');
const router = express.Router();

// Placeholder routes - to be implemented in Week 2
router.get('/post/:postId', (req, res) => {
  res.json({ message: 'Get comments for post endpoint - Coming in Week 2!' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create comment endpoint - Coming in Week 2!' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update comment endpoint - Coming in Week 2!' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete comment endpoint - Coming in Week 2!' });
});

module.exports = router;
