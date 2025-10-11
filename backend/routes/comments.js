const express = require('express');
const { body, param, validationResult } = require('express-validator');
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
router.get('/post/:postId', [
  param('postId').isMongoId()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, commentController.getComments);

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
router.post('/', verifyToken, [
  body('content').isLength({ min: 5, max: 1000 }),
  body('postId').isMongoId(),
  body('parentCommentId').optional().isMongoId()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, commentController.createComment);

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
router.put('/:id', verifyToken, [
  param('id').isMongoId(),
  body('content').isLength({ min: 5, max: 1000 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, commentController.updateComment);

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
router.delete('/:id', verifyToken, [
  param('id').isMongoId()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, commentController.deleteComment);

// @desc    Toggle like on comment
// @route   POST /api/comments/:id/like
// @access  Private
router.post('/:id/like', verifyToken, [
  param('id').isMongoId()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, commentController.toggleLike);

module.exports = router;
