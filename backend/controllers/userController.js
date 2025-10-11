const User = require('../models/User');
const Post = require('../models/Post');
const logger = require('../utils/logger');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error getting profile:', error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // A more scalable way to update fields
    const fieldsToUpdate = ['firstName', 'lastName', 'bio', 'avatar', 'address', 'phone', 'city', 'groups', 'maritalStatus'];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    logger.info(`Profile updated for user: ${user.username}`);

    res.json({
      success: true,
      data: user.getPublicProfile()
    });
  } catch (error) {
    logger.error('Error updating profile:', error);
    next(error);
  }
};

// @desc    Get user's posts
// @route   GET /api/users/:id/posts
// @access  Public
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const query = {
      author: id,
      status: 'published'
    };

    const options = {
      page,
      limit,
      sort: { publishedAt: -1 },
      select: 'title slug excerpt featuredImage category tags publishedAt views likes commentsCount'
    };

    const result = await Post.paginate(query, options);

    res.json({
      success: true,
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalPosts: result.totalDocs
      }
    });
  } catch (error) {
    logger.error('Error getting user posts:', error);
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getUserPosts
};
