// One-off script to update existing users' avatars to Emma-themed photos without full reseed.
// Run: node backend/scripts/updateAvatars.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const emmaAvatars = [
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80'
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({});
    let idx = 0;
    for (const u of users) {
      u.avatar = emmaAvatars[idx % emmaAvatars.length];
      idx++;
      await u.save();
    }
    console.log(`Updated ${users.length} user avatars to Emma portraits.`);
    await mongoose.connection.close();
  } catch (e) {
    console.error('Failed updating avatars', e);
    process.exit(1);
  }
})();
