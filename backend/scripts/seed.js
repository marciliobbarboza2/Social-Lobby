const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
require('dotenv').config();

const users = [
  {
    username: 'marciliobbarboza',
    email: 'marciliobbarboza@gmail.com',
    password: 'marciliobbarboza',
    firstName: 'Marcilio',
    lastName: 'Barboza',
    bio: 'Software developer passionate about creating user-friendly applications',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
    city: 'San Francisco',
    groups: ['Tech Innovators', 'Developers'],
    maritalStatus: 'Single',
    birthday: 'March 15, 1995',
    profession: 'Software Developer',
    work: 'TechCorp Inc.',
    education: 'Stanford University',
    role: 'admin'
  },
  {
    username: 'admin',
    email: 'admin@socialobby.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    bio: 'System administrator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
    city: 'System',
    groups: ['Administrators'],
    maritalStatus: 'Single',
    role: 'admin'
  },
  {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Tech enthusiast and blogger',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
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
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
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
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
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
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
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
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    city: 'Chicago',
    groups: ['Business Professionals', 'Entrepreneurs'],
    maritalStatus: 'Married'
  }
];

const posts = [
  {
    title: 'Sustainable Living: Small Changes for a Big Impact',
    content: 'Making small changes in our daily lives can have a significant impact on the environment. From reducing plastic use to conserving energy, every little effort counts. In this post, we share practical tips for living more sustainably and why it matters for our planet.',
    excerpt: 'Practical tips for sustainable living and environmental conservation.',
    category: 'lifestyle',
    tags: ['Sustainability', 'Environment', 'Eco-Friendly'],
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
  },
  {
    title: 'The Future of Artificial Intelligence in Daily Life',
    content: 'Artificial Intelligence is no longer just a concept from science fiction movies. It\'s becoming an integral part of our daily lives, from voice assistants to smart home devices. This post explores how AI is transforming various aspects of our routine and what we can expect in the coming years.',
    excerpt: 'How AI is changing our daily lives and what to expect next.',
    category: 'technology',
    tags: ['AI', 'Technology', 'Future', 'Innovation'],
    status: 'published'
  },
  {
    title: 'Mindful Meditation: A Beginner\'s Guide',
    content: 'In our fast-paced world, finding moments of peace and mindfulness is crucial for mental well-being. Meditation doesn\'t have to be complicated or time-consuming. Learn simple techniques to incorporate mindfulness into your daily routine and experience the benefits of reduced stress and improved focus.',
    excerpt: 'Simple meditation techniques for beginners to reduce stress.',
    category: 'health',
    tags: ['Meditation', 'Mindfulness', 'Wellness', 'Mental Health'],
    status: 'published'
  },
  {
    title: 'Exploring Street Food Culture Around the World',
    content: 'Street food is more than just convenient meals on the go. It\'s a window into local cultures, traditions, and culinary creativity. From bustling markets in Bangkok to food trucks in New York, street food tells stories of communities and their gastronomic heritage.',
    excerpt: 'A culinary journey through global street food cultures.',
    category: 'food',
    tags: ['Street Food', 'Culture', 'Travel', 'Cuisine'],
    status: 'published'
  },
  {
    title: 'The Psychology of Social Media Addiction',
    content: 'Social media has become an integral part of modern life, but it can also lead to addiction and negative mental health effects. Understanding the psychological mechanisms behind social media addiction can help us develop healthier digital habits and maintain better work-life balance.',
    excerpt: 'Understanding the psychological impact of social media addiction.',
    category: 'other',
    tags: ['Psychology', 'Social Media', 'Mental Health', 'Digital Wellness'],
    status: 'published'
  },
  {
    title: 'Sustainable Fashion: Making Conscious Clothing Choices',
    content: 'The fashion industry has a significant environmental impact, but consumers can make a difference through conscious choices. Learn about sustainable fashion practices, ethical brands, and how to build a wardrobe that\'s both stylish and environmentally responsible.',
    excerpt: 'How to make sustainable and ethical fashion choices.',
    category: 'other',
    tags: ['Sustainable Fashion', 'Ethics', 'Environment', 'Style'],
    status: 'published'
  },
  {
    title: 'The Art of Digital Photography: Tips for Beginners',
    content: 'Digital photography has become more accessible than ever with smartphone cameras and affordable DSLRs. Learn the fundamentals of composition, lighting, and post-processing to take your photos from good to great. Discover how to capture stunning images in any situation.',
    excerpt: 'Essential tips for improving your digital photography skills.',
    category: 'technology',
    tags: ['Photography', 'Digital Art', 'Creativity', 'Technology'],
    status: 'published'
  },
  {
    title: 'Mental Health Awareness: Breaking the Stigma',
    content: 'Mental health is just as important as physical health, yet it often carries an unfair stigma. This post explores common mental health challenges, the importance of seeking help, and how we can support each other in building a more compassionate society.',
    excerpt: 'Understanding and supporting mental health in our communities.',
    category: 'health',
    tags: ['Mental Health', 'Wellness', 'Community', 'Support'],
    status: 'published'
  },
  {
    title: 'Home Gardening: Growing Your Own Food',
    content: 'Growing your own vegetables and herbs can be incredibly rewarding and cost-effective. Whether you have a large backyard or just a windowsill, learn how to start a home garden, choose the right plants for your climate, and maintain healthy, productive plants.',
    excerpt: 'A beginner\'s guide to starting and maintaining a home garden.',
    category: 'lifestyle',
    tags: ['Gardening', 'Sustainability', 'Food', 'DIY'],
    status: 'published'
  },
  {
    title: 'The Future of Work: Remote vs Office Dynamics',
    content: 'The COVID-19 pandemic accelerated the shift to remote work, but what does the future hold? This post examines the pros and cons of remote work versus traditional office environments, and explores hybrid models that might become the new normal.',
    excerpt: 'Exploring the evolving landscape of work environments.',
    category: 'business',
    tags: ['Remote Work', 'Future of Work', 'Productivity', 'Business'],
    status: 'published'
  },
  {
    title: 'Cultural Cuisine: Exploring Global Flavors',
    content: 'Food is a universal language that tells stories of culture, history, and tradition. From spicy curries in India to fresh seafood in Mediterranean countries, discover the diverse culinary traditions around the world and how they reflect local customs and ingredients.',
    excerpt: 'A culinary journey through different cultures and their cuisines.',
    category: 'food',
    tags: ['Cuisine', 'Culture', 'Travel', 'Food'],
    status: 'published'
  },
  {
    title: 'Financial Planning for Young Professionals',
    content: 'Building financial stability early in your career can set you up for long-term success. Learn about budgeting, saving, investing, and debt management strategies that are specifically tailored for young professionals starting their financial journey.',
    excerpt: 'Essential financial planning tips for career starters.',
    category: 'business',
    tags: ['Finance', 'Planning', 'Investment', 'Career'],
    status: 'published'
  },
  {
    title: 'The Science of Sleep: Optimizing Your Rest',
    content: 'Quality sleep is crucial for physical and mental health, yet many people struggle with sleep issues. Discover the science behind sleep cycles, learn how to create an optimal sleep environment, and adopt habits that promote better rest and recovery.',
    excerpt: 'Understanding sleep science and improving sleep quality.',
    category: 'health',
    tags: ['Sleep', 'Health', 'Wellness', 'Science'],
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
