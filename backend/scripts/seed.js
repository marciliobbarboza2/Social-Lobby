const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby');

    const user = new User({
      username: 'marciliobbarboza',
      email: 'marciliobbarboza@gmail.com',
      password: 'marciliobbarboza',
      firstName: 'Marcilio',
      lastName: 'Barboza',
      bio: 'Entrepreneur and social media enthusiast',
      avatar: 'https://picsum.photos/seed/marcilio/100',
      address: '123 Main St, Palo Alto, CA',
      phone: '+1 (555) 123-4567',
      city: 'Palo Alto',
      groups: ['Tech Innovators', 'Startup Founders', 'Social Media Pioneers'],
      maritalStatus: 'Married'
    });

    await user.save();
    console.log('User seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding user:', error);
    process.exit(1);
  }
};

seedUser();
