const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [50, 'Content must be at least 50 characters long']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    trim: true
  },
  featuredImage: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post must have an author']
  },
  category: {
    type: String,
    enum: ['technology', 'lifestyle', 'travel', 'food', 'health', 'business', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters'],
    validate: {
      validator: function(tag) {
        return tag.length >= 2;
      },
      message: 'Tag must be at least 2 characters long'
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  commentsCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
postSchema.index({ slug: 1 });
postSchema.index({ author: 1 });
postSchema.index({ status: 1 });
postSchema.index({ publishedAt: -1 });
postSchema.index({ category: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ title: 'text', content: 'text' });

// Pre-save middleware to generate slug and excerpt
postSchema.pre('save', function(next) {
  // Generate slug from title if not provided or title changed
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }

  // Generate excerpt from content if not provided
  if (!this.excerpt && this.content) {
    // Remove HTML tags and get first 300 characters
    const plainText = this.content.replace(/<[^>]*>/g, '');
    this.excerpt = plainText.substring(0, 297) + (plainText.length > 300 ? '...' : '');
  }

  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Virtual for reading time estimate (assuming 200 words per minute)
postSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
});

// Virtual for formatted published date
postSchema.virtual('formattedPublishedDate').get(function() {
  if (!this.publishedAt) return null;
  return this.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static method to get published posts
postSchema.statics.getPublished = function() {
  return this.find({ status: 'published' }).sort({ publishedAt: -1 });
};

// Static method to get posts by category
postSchema.statics.getByCategory = function(category) {
  return this.find({
    status: 'published',
    category: category
  }).sort({ publishedAt: -1 });
};

// Instance method to increment views
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to toggle like
postSchema.methods.toggleLike = function(userId) {
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

module.exports = mongoose.model('Post', postSchema);
