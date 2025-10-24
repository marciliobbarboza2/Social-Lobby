const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
require('dotenv').config();

const cleanDatabase = async () => {
  let conn;
  try {
    conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby');
    console.log('MongoDB connected...');

    // Clear all data
    console.log('Clearing all data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('All data cleared successfully!');

  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  } finally {
    if (conn) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    process.exit(0);
  }
};

cleanDatabase();
