const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

// @desc    Get all published posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;

    let query = { status: 'published' };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page,
      limit,
      sort: { publishedAt: -1 },
      populate: {
        path: 'author',
        select: 'username firstName lastName avatar'
      },
      select: 'title slug excerpt featuredImage category tags publishedAt views likes commentsCount author'
    };

    const result = await Post.paginate(query, options);

    res.json({
      success: true,
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalPosts: result.totalDocs,
        hasNext: result.hasNextPage,
        hasPrev: result.hasPrevPage,
        nextPage: result.nextPage,
        prevPage: result.prevPage
      }
    });
  } catch (error) {
    logger.error('Error getting posts:', error);
    next(error);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.id, status: 'published' })
      .populate('author', 'username firstName lastName avatar bio')
      .populate('likedBy', 'username firstName lastName avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    await post.incrementViews();

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    logger.error('Error getting post:', error);
    next(error);
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, featuredImage, category, tags, status } = req.body;

    const post = await Post.create({
      title,
      content,
      excerpt,
      featuredImage,
      category,
      tags,
      status: status || 'draft',
      author: req.user._id
    });

    await post.populate('author', 'username firstName lastName avatar');

    logger.info(`Post created: ${post.title} by ${req.user.username}`);

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    logger.error('Error creating post:', error);
    next(error);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const fieldsToUpdate = ['title', 'content', 'excerpt', 'featuredImage', 'category', 'tags', 'status'];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        post[field] = req.body[field];
      }
    });

    await post.save();
    await post.populate('author', 'username firstName lastName avatar');

    logger.info(`Post updated: ${post.title}`);

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    logger.error('Error updating post:', error);
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    
    const post = await Post.findOne({ slug: req.params.id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete the post and all its comments within a transaction
    await Comment.deleteMany({ post: post._id }, { session });
    await post.deleteOne({ session });

    await session.commitTransaction();

    logger.info(`Post deleted: ${post.title}`);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error('Error deleting post:', error);
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc    Toggle like on post
// @route   POST /api/posts/:id/like
// @access  Private
const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.toggleLike(req.user._id);

    res.json({
      success: true,
      data: {
        likes: post.likes,
        likedBy: post.likedBy
      }
    });
  } catch (error) {
    logger.error('Error toggling like:', error);
    next(error);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike
};
