const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby';

const crypto = require('crypto');

// Configuration: read passwords from env if provided. This avoids storing plaintext
// credentials in the repo. If a password env var is not present, the script will
// only set a password for newly created users (not overwrite existing users'),
// and it will print any generated passwords to the console so you can record them.

// helper: prefer env var, fallback not used widely here but kept for clarity
const _passwd = (envName, fallback) => process.env[envName] || fallback;

const usersToAdd = [
  {
    email: 'Admin@socialobby.com',
    username: 'admin',
    pwEnv: 'SEED_PW_ADMIN',
    firstName: 'Site',
    lastName: 'Admin',
    role: 'admin'
  },
  {
    email: 'marciliobbarboza@gmail.com',
    username: 'marciliobbarboza',
    pwEnv: 'SEED_PW_MARCILIO',
    firstName: 'Marcilio',
    lastName: 'Barboza',
    role: 'admin'
  },
  // users a, b, c, d
  { email: 'usera@socialobby.com', username: 'usera', pwEnv: 'SEED_PW_USERA', firstName: 'User', lastName: 'UserA' },
  { email: 'userb@socialobby.com', username: 'userb', pwEnv: 'SEED_PW_USERB', firstName: 'User', lastName: 'UserB' },
  { email: 'userc@socialobby.com', username: 'userc', pwEnv: 'SEED_PW_USERC', firstName: 'User', lastName: 'UserC' },
  { email: 'userd@socialobby.com', username: 'userd', pwEnv: 'SEED_PW_USERD', firstName: 'User', lastName: 'UserD' }
];

const upsertUser = async (u) => {
  const email = u.email.toLowerCase();
  let existing = await User.findOne({ email }).select('+password');
  if (existing) {
    console.log(`Updating existing user: ${email}`);
    // update fields we care about, but do NOT overwrite password unless an env var is provided
    existing.username = u.username || existing.username;
    existing.firstName = u.firstName || existing.firstName;
    existing.lastName = u.lastName || existing.lastName;
    if (u.role) existing.role = u.role;

    const envPw = u.pwEnv ? process.env[u.pwEnv] : undefined;
    if (envPw) {
      console.log(` - Overwriting password for ${email} from env ${u.pwEnv}`);
      existing.password = envPw; // will hash on save
    } else {
      console.log(` - Leaving existing password for ${email} unchanged`);
    }

    await existing.save();
    return existing;
  } else {
    console.log(`Creating user: ${email}`);
    // Determine password: prefer env variable; otherwise generate one
    const envPw = u.pwEnv ? process.env[u.pwEnv] : undefined;
    const passwordToUse = envPw || crypto.randomBytes(6).toString('hex');

    const newUser = new User({
      username: u.username,
      email: email,
      password: passwordToUse,
      firstName: u.firstName || 'First',
      lastName: u.lastName || 'Last',
      role: u.role || 'user'
    });
    await newUser.save();
    if (!envPw) {
      console.log(` - Generated password for ${email}: ${passwordToUse}`);
    }
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
