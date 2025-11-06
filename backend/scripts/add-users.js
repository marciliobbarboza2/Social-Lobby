const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby';

const usersToAdd = [
  {
    email: 'Admin@socialobby.com',
    username: 'admin',
    password: 'admin123',
    firstName: 'Site',
    lastName: 'Admin',
    role: 'admin'
  },
  {
    email: 'marciliobbarboza@gmail.com',
    username: 'marciliobbarboza',
    password: 'marciliobbarboza',
    firstName: 'Marcilio',
    lastName: 'Barboza',
    role: 'admin'
  },
  // users a, b, c, d
  { email: 'usera@socialobby.com', username: 'usera', password: 'password123', firstName: 'User', lastName: 'UserA' },
  { email: 'userb@socialobby.com', username: 'userb', password: 'password123', firstName: 'User', lastName: 'UserB' },
  { email: 'userc@socialobby.com', username: 'userc', password: 'password123', firstName: 'User', lastName: 'UserC' },
  { email: 'userd@socialobby.com', username: 'userd', password: 'password123', firstName: 'User', lastName: 'UserD' }
];

const upsertUser = async (u) => {
  const email = u.email.toLowerCase();
  let existing = await User.findOne({ email });
  if (existing) {
    console.log(`Updating existing user: ${email}`);
    // update fields we care about, set password to trigger pre-save hashing
    existing.username = u.username || existing.username;
    existing.firstName = u.firstName || existing.firstName;
    existing.lastName = u.lastName || existing.lastName;
    if (u.role) existing.role = u.role;
    if (u.password) existing.password = u.password; // will hash on save
    await existing.save();
    return existing;
  } else {
    console.log(`Creating user: ${email}`);
    const newUser = new User({
      username: u.username,
      email: email,
      password: u.password,
      firstName: u.firstName || 'First',
      lastName: u.lastName || 'Last',
      role: u.role || 'user'
    });
    await newUser.save();
    return newUser;
  }
};

const run = async () => {
  let conn;
  try {
    conn = await mongoose.connect(MONGO);
    console.log('Connected to MongoDB');

    for (const u of usersToAdd) {
      try {
        const created = await upsertUser(u);
        console.log('OK:', created.email, 'id=', created._id);
      } catch (err) {
        console.error('Failed for', u.email, err.message || err);
      }
    }

    console.log('Done');
  } catch (err) {
    console.error('Connection error:', err.message || err);
  } finally {
    if (conn) await mongoose.connection.close();
    process.exit(0);
  }
};

run();
