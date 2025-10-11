const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const logger = require('../utils/logger');

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.getByPost(postId);

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    logger.error('Error getting comments:', error);
    next(error);
  }
};

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res, next) => {
  try {
    const { content, postId, parentCommentId } = req.body;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // If replying to a comment, check if parent exists
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
    }

    const comment = await Comment.create({
      content,
      author: req.user._id,
      post: postId,
      parentComment: parentCommentId || null
    });

    await comment.populate('author', 'username firstName lastName avatar');

    // Update post's comment count
    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    logger.info(`Comment created on post ${postId} by ${req.user.username}`);

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    logger.error('Error creating comment:', error);
    next(error);
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check ownership
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    const { content } = req.body;
    comment.content = content || comment.content;

    await comment.save();
    await comment.populate('author', 'username firstName lastName avatar');

    logger.info(`Comment updated: ${comment._id}`);

    res.json({
      success: true,
      data: comment
    });
  } catch (error) {
    logger.error('Error updating comment:', error);
    next(error);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    const replies = await Comment.find({ parentComment: comment._id }).session(session);
    const replyIds = replies.map(reply => reply._id);
    const totalToDelete = 1 + replyIds.length;

    // Delete the comment and all its replies
    await Comment.deleteMany({ _id: { $in: [comment._id, ...replyIds] } }).session(session);

    // Update post's comment count for all deleted comments
    await Post.findByIdAndUpdate(
      comment.post,
      { $inc: { commentsCount: -totalToDelete } },
      { session }
    );

    await session.commitTransaction();

    logger.info(`Comment deleted: ${comment._id}`);

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error('Error deleting comment:', error);
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc    Toggle like on comment
// @route   POST /api/comments/:id/like
// @access  Private
const toggleLike = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.toggleLike(req.user._id);

    res.json({
      success: true,
      data: {
        likes: comment.likes,
        likedBy: comment.likedBy
      }
    });
  } catch (error) {
    logger.error('Error toggling like on comment:', error);
    next(error);
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  toggleLike
};
