const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    minlength: [5, 'Comment must be at least 5 characters long'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment must have an author']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Comment must belong to a post']
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isApproved: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
commentSchema.index({ post: 1 });
commentSchema.index({ author: 1 });
commentSchema.index({ parentComment: 1 });
commentSchema.index({ createdAt: -1 });

// Virtual for nested level (to prevent too deep nesting)
commentSchema.virtual('level').get(function() {
  if (!this.parentComment) return 0;

  // This would need to be calculated recursively in practice
  // For simplicity, we'll limit to 3 levels in the application logic
  return 1; // Placeholder - actual implementation would traverse parent chain
});

// Pre-save middleware to update parent comment's replies array
commentSchema.pre('save', async function(next) {
  if (this.isNew && this.parentComment) {
    try {
      const parent = await this.constructor.findById(this.parentComment);
      if (parent && !parent.replies.includes(this._id)) {
        parent.replies.push(this._id);
        await parent.save();
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Instance method to toggle like
commentSchema.methods.toggleLike = function(userId) {
  const userIndex = this.likedBy.indexOf(userId);

  if (userIndex > -1) {
    // User already liked, remove like
    this.likedBy.splice(userIndex, 1);
    this.likes = Math.max(0, this.likes - 1);
  } else {
    // User hasn't liked, add like
    this.likedBy.push(userId);
    this.likes += 1;
  }

  return this.save();
};

// Static method to get comments for a post (with replies)
commentSchema.statics.getByPost = function(postId) {
  return this.find({
    post: postId,
    parentComment: null, // Only top-level comments
    isApproved: true
  })
  .populate('author', 'username firstName lastName avatar')
  .populate({
    path: 'replies',
    populate: {
      path: 'author',
      select: 'username firstName lastName avatar'
    }
  })
  .sort({ createdAt: 1 });
};

module.exports = mongoose.model('Comment', commentSchema);
