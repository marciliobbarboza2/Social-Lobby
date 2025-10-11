const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
require('dotenv').config();

const users = [
  {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Tech enthusiast and blogger',
    avatar: 'https://picsum.photos/seed/john/100',
    city: 'San Francisco',
    groups: ['Tech Innovators', 'Bloggers'],
    maritalStatus: 'Single'
  },
  {
    username: 'janesmith',
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    bio: 'Travel blogger and photographer',
    avatar: 'https://picsum.photos/seed/jane/100',
    city: 'New York',
    groups: ['Travel Enthusiasts', 'Photographers'],
    maritalStatus: 'Married'
  },
  {
    username: 'mikejohnson',
    email: 'mike@example.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Johnson',
    bio: 'Food critic and chef',
    avatar: 'https://picsum.photos/seed/mike/100',
    city: 'Los Angeles',
    groups: ['Food Lovers', 'Chefs'],
    maritalStatus: 'Single'
  },
  {
    username: 'sarahwilson',
    email: 'sarah@example.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Wilson',
    bio: 'Fitness instructor and health coach',
    avatar: 'https://picsum.photos/seed/sarah/100',
    city: 'Miami',
    groups: ['Fitness Enthusiasts', 'Health Coaches'],
    maritalStatus: 'In a relationship'
  },
  {
    username: 'davidbrown',
    email: 'david@example.com',
    password: 'password123',
    firstName: 'David',
    lastName: 'Brown',
    bio: 'Business consultant and entrepreneur',
    avatar: 'https://picsum.photos/seed/david/100',
    city: 'Chicago',
    groups: ['Business Professionals', 'Entrepreneurs'],
    maritalStatus: 'Married'
  }
];

const posts = [
  {
    title: 'The Future of Artificial Intelligence in 2024',
    content: 'Artificial Intelligence continues to evolve at an unprecedented pace. From machine learning algorithms to neural networks, AI is transforming industries across the globe. In this post, we explore the latest developments and what they mean for the future of technology.',
    excerpt: 'Exploring the latest AI developments and their impact on technology.',
    category: 'technology',
    tags: ['AI', 'Machine Learning', 'Technology'],
    status: 'published'
  },
  {
    title: 'Hidden Gems: Underrated Travel Destinations',
    content: 'While everyone flocks to popular tourist spots, there are countless hidden gems waiting to be discovered. From secluded beaches to charming mountain villages, these destinations offer authentic experiences away from the crowds.',
    excerpt: 'Discover lesser-known travel destinations for unique experiences.',
    category: 'travel',
    tags: ['Travel', 'Adventure', 'Hidden Gems'],
    status: 'published'
  },
  {
    title: 'Healthy Eating: Simple Recipes for Busy People',
    content: 'Maintaining a healthy diet doesn\'t have to be complicated or time-consuming. With these simple recipes, you can prepare nutritious meals even on the busiest days. Focus on whole foods, balanced nutrition, and quick preparation methods.',
    excerpt: 'Quick and healthy recipes for people with busy lifestyles.',
    category: 'food',
    tags: ['Healthy Eating', 'Recipes', 'Nutrition'],
    status: 'published'
  },
  {
    title: 'Building Habits for Long-term Success',
    content: 'Success is built on consistent habits and routines. Whether you\'re pursuing career goals, fitness objectives, or personal development, establishing the right habits can make all the difference. Learn how to create sustainable habits that lead to lasting success.',
    excerpt: 'Learn how to build habits that lead to long-term success.',
    category: 'lifestyle',
    tags: ['Habits', 'Success', 'Personal Development'],
    status: 'published'
  },
  {
    title: 'The Rise of Remote Work Culture',
    content: 'Remote work has become the new normal for many professionals. While it offers flexibility and work-life balance, it also presents unique challenges. This post examines the benefits, drawbacks, and best practices for thriving in a remote work environment.',
    excerpt: 'Exploring the benefits and challenges of remote work culture.',
    category: 'business',
    tags: ['Remote Work', 'Business', 'Work Culture'],
    status: 'published'
  }
];

const comments = [
  'Great article! Really insightful.',
  'I completely agree with your perspective.',
  'Thanks for sharing this information.',
  'This is exactly what I needed to read today.',
  'Well written and informative piece.',
  'I learned something new from this post.',
  'Looking forward to more content like this.',
  'Your insights are always valuable.',
  'This resonates with my own experiences.',
  'Excellent analysis of the topic.'
];

const seedDatabase = async () => {
  let conn;
  try {
    conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby');
    console.log('MongoDB connected...');

    // Clear existing data
    console.log('Clearing database...');
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('Database cleared.');

    // Seed users
    console.log('Seeding users...');
    const userPromises = users.map(userData => new User(userData).save());
    const createdUsers = await Promise.all(userPromises);
    console.log(`${createdUsers.length} users seeded successfully`);

    // Seed posts
    console.log('Seeding posts...');
    const postPromises = posts.map((postData, i) => {
      const user = createdUsers[i % createdUsers.length];
      return new Post({
        ...postData,
        author: user._id,
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
      }).save();
    });
    const createdPosts = await Promise.all(postPromises);
    console.log(`${createdPosts.length} posts seeded successfully`);

    // Seed comments
    console.log('Seeding comments...');
    const postCommentCounts = new Map();
    const commentPromises = Array.from({ length: 50 }, () => {
      const post = createdPosts[Math.floor(Math.random() * createdPosts.length)];
      const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];

      // Keep track of comment counts for bulk update
      postCommentCounts.set(post._id.toString(), (postCommentCounts.get(post._id.toString()) || 0) + 1);

      return new Comment({
        content: comments[Math.floor(Math.random() * comments.length)],
        author: user._id,
        post: post._id
      }).save();
    });
    const createdComments = await Promise.all(commentPromises);
    console.log(`${createdComments.length} comments seeded successfully`);

    // Seed some nested comments (replies)
    console.log('Seeding nested comments...');
    const replyPromises = Array.from({ length: 20 }, () => {
      const parentComment = createdComments[Math.floor(Math.random() * createdComments.length)];
      const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];

      // Increment count for the parent post
      postCommentCounts.set(parentComment.post.toString(), (postCommentCounts.get(parentComment.post.toString()) || 0) + 1);

      return new Comment({
        content: `This is a reply to a comment: ${comments[Math.floor(Math.random() * comments.length)]}`,
        author: user._id,
        post: parentComment.post,
        parentComment: parentComment._id
      }).save();
    });

    if (replyPromises.length > 0) {
      await Promise.all(replyPromises);
      console.log(`${replyPromises.length} nested comments seeded successfully`);
    }

    // Bulk update post comment counts
    const bulkOps = Array.from(postCommentCounts.entries()).map(([postId, count]) => ({
      updateOne: {
        filter: { _id: postId },
        update: { $inc: { commentsCount: count } }
      }
    }));
    if (bulkOps.length > 0) {
      await Post.bulkWrite(bulkOps);
      console.log('Post comment counts updated.');
    }

    // Add some likes
    console.log('Adding likes...');
    for (let i = 0; i < 50; i++) {
      const post = createdPosts[Math.floor(Math.random() * createdPosts.length)];
      const liker = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      // Use updateOne with $addToSet to prevent duplicate likes and ensure atomicity
      await Post.updateOne(
        { _id: post._id, likedBy: { $ne: liker._id } },
        { $addToSet: { likedBy: liker._id }, $inc: { likes: 1 } }
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    if (conn) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    process.exit(0);
  }
};

seedDatabase();
