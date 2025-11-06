const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby';

const run = async () => {
  let conn;
  try {
    conn = await mongoose.connect(MONGO);
    const users = await User.find({}).select('email username firstName lastName role createdAt').lean();
    console.log(`Found ${users.length} users:`);
    users.forEach(u => console.log(`${u.email} | ${u.username} | ${u.role} | createdAt=${u.createdAt}`));
  } catch (err) {
    console.error('Error listing users:', err.message || err);
    process.exit(1);
  } finally {
    if (conn) await mongoose.connection.close();
    process.exit(0);
  }
};

run();
