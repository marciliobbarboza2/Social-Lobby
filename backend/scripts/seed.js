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
    bio: 'Software developer passionate about creating user-friendly applications and innovative solutions',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=marciliobbarboza',
    address: '123 Tech St, San Francisco, CA',
    phone: '+1 (555) 111-2222',
    city: 'San Francisco',
    groups: ['Tech Innovators', 'Women in Tech', 'React Developers'],
    maritalStatus: 'Single',
    birthday: 'March 15, 1995',
    profession: 'Software Developer',
    location: 'San Francisco, CA',
    education: 'Stanford University',
    work: 'TechCorp Inc.',
    relationship: 'Single',
    joined: 'January 2020',
    gender: 'Male',
    website: 'https://marciliobbarboza.dev',
    languages: ['English', 'Portuguese'],
    interests: ['Programming', 'Open Source', 'Technology', 'Web Development', 'UI/UX Design'],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'TypeScript'],
    isOnline: true,
    role: 'admin'
  },
  {
    username: 'admin',
    email: 'admin@socialobby.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    bio: 'System administrator',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=admin',
    address: 'System Admin St, System City, SC',
    phone: '+1 (555) 000-0000',
    city: 'System City',
    groups: ['Admins'],
    maritalStatus: 'Single',
    birthday: 'January 1, 2000',
    profession: 'System Administrator',
    location: 'System City, SC',
    education: 'System University',
    work: 'Socialobby Inc.',
    relationship: 'Single',
    joined: 'January 2020',
    gender: 'Other',
    website: 'https://socialobby.com',
    languages: ['English'],
    interests: ['System Administration', 'Security', 'Technology'],
    skills: ['System Admin', 'Security', 'Database Management'],
    isOnline: true,
    role: 'admin'
  },
  {
    username: 'emma_rodriguez',
    email: 'emma@example.com',
    password: 'password123',
    firstName: 'Emma',
    lastName: 'Rodriguez',
    bio: 'Software developer and tech enthusiast 🚀',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=emma',
    city: 'San Francisco',
    profession: 'Software Developer',
    location: 'San Francisco, CA',
    interests: ['Coding', 'React', 'Web Development', 'Open Source'],
    isOnline: true,
    role: 'user'
  },
  {
    username: 'david_kim',
    email: 'david@example.com',
    password: 'password123',
    firstName: 'David',
    lastName: 'Kim',
    bio: 'Food lover and home chef 🍕',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=david',
    city: 'Los Angeles',
    profession: 'Chef',
    location: 'Los Angeles, CA',
    interests: ['Cooking', 'Food Photography', 'Italian Cuisine'],
    isOnline: false,
    role: 'user'
  },
  {
    username: 'sophie_anderson',
    email: 'sophie@example.com',
    password: 'password123',
    firstName: 'Sophie',
    lastName: 'Anderson',
    bio: 'Nature enthusiast and outdoor adventurer 🌳',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=sophie',
    city: 'Portland',
    profession: 'Environmental Consultant',
    location: 'Portland, OR',
    interests: ['Hiking', 'Nature Photography', 'Conservation'],
    isOnline: true,
    role: 'user'
  },
  {
    username: 'carlos_mendoza',
    email: 'carlos@example.com',
    password: 'password123',
    firstName: 'Carlos',
    lastName: 'Mendoza',
    bio: 'Paramedic dedicated to saving lives 🚑',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=carlos',
    city: 'Miami',
    profession: 'Paramedic',
    location: 'Miami, FL',
    interests: ['Emergency Medicine', 'Community Service', 'Fitness'],
    isOnline: false,
    role: 'user'
  },
  {
    username: 'lisa_thompson',
    email: 'lisa@example.com',
    password: 'password123',
    firstName: 'Lisa',
    lastName: 'Thompson',
    bio: 'Marketing strategist and brand builder 📊',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=lisa',
    city: 'New York',
    profession: 'Marketing Manager',
    location: 'New York, NY',
    interests: ['Marketing', 'Branding', 'Digital Strategy'],
    isOnline: true,
    role: 'user'
  },
  {
    username: 'mike_johnson',
    email: 'mike@example.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Johnson',
    bio: 'Fitness coach helping people achieve their goals 💪',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=mike',
    city: 'Austin',
    profession: 'Fitness Coach',
    location: 'Austin, TX',
    interests: ['Fitness', 'Nutrition', 'Wellness'],
    isOnline: true,
    role: 'user'
  },
  {
    username: 'anna_petrov',
    email: 'anna@example.com',
    password: 'password123',
    firstName: 'Anna',
    lastName: 'Petrov',
    bio: 'Teacher passionate about education 📚',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=anna',
    city: 'Boston',
    profession: 'Teacher',
    location: 'Boston, MA',
    interests: ['Education', 'Reading', 'Learning'],
    isOnline: false,
    role: 'user'
  },
  {
    username: 'david_lee',
    email: 'davidlee@example.com',
    password: 'password123',
    firstName: 'David',
    lastName: 'Lee',
    bio: 'Photographer capturing life\'s moments 📷',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=davidlee',
    city: 'Seattle',
    profession: 'Photographer',
    location: 'Seattle, WA',
    interests: ['Photography', 'Travel', 'Art'],
    isOnline: true,
    role: 'user'
  },
  {
    username: 'jessica_martinez',
    email: 'jessica@example.com',
    password: 'password123',
    firstName: 'Jessica',
    lastName: 'Martinez',
    bio: 'UX designer crafting delightful experiences ✨',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=jessica',
    city: 'Denver',
    profession: 'UX Designer',
    location: 'Denver, CO',
    interests: ['Design', 'User Experience', 'Prototyping'],
    isOnline: true,
    role: 'user'
  },
  {
    username: 'alex_chen',
    email: 'alex@example.com',
    password: 'password123',
    firstName: 'Alex',
    lastName: 'Chen',
    bio: 'Data analyst turning numbers into insights 📊',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=alex',
    city: 'San Jose',
    profession: 'Data Analyst',
    location: 'San Jose, CA',
    interests: ['Data Science', 'Analytics', 'Visualization'],
    isOnline: false,
    role: 'user'
  },
  {
    username: 'maya_patel',
    email: 'maya@example.com',
    password: 'password123',
    firstName: 'Maya',
    lastName: 'Patel',
    bio: 'Climate scientist fighting for our planet 🌍',
    avatar: 'https://randomuser.me/api/portraits/women/58.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=maya',
    city: 'Chicago',
    profession: 'Climate Scientist',
    location: 'Chicago, IL',
    interests: ['Climate Science', 'Environmental Policy', 'Research'],
    isOnline: true,
    role: 'user'
  },
  {
    username: 'jordan_williams',
    email: 'jordan@example.com',
    password: 'password123',
    firstName: 'Jordan',
    lastName: 'Williams',
    bio: 'Music producer creating beats and vibes 🎵',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    coverPhoto: 'https://picsum.photos/800/300?random=jordan',
    city: 'Atlanta',
    profession: 'Music Producer',
    location: 'Atlanta, GA',
    interests: ['Music Production', 'Sound Design', 'Electronic Music'],
    isOnline: true,
    role: 'user'
  }
];

const posts = [
  {
    title: 'Just launched my first React app! 🚀',
    content: 'Just launched my first React app! 🚀 The journey from idea to deployment is incredible. Grateful for the amazing developer community that helped me along the way. What\'s your biggest coding achievement this year?',
    excerpt: 'First React app launch and reflections on the journey.',
    category: 'technology',
    tags: ['React', 'Web Development', 'Programming'],
    status: 'published'
  },
  {
    title: 'Homemade pizza from scratch tonight! 🍕',
    content: 'Made homemade pizza from scratch tonight! 🍕 Nothing beats the smell of fresh dough baking. The secret is using high-quality olive oil and fresh basil. Recipe in the comments if anyone wants it!',
    excerpt: 'Homemade pizza recipe and cooking tips.',
    category: 'food',
    tags: ['Cooking', 'Pizza', 'Recipes'],
    status: 'published'
  },
  {
    title: 'Morning walk in the park 🌳',
    content: 'Morning walk in the park was exactly what I needed today. 🌳 Sometimes you just need to disconnect from screens and reconnect with nature. The birds were singing, flowers are blooming, and the air smelled fresh. How do you recharge?',
    excerpt: 'The healing power of nature walks.',
    category: 'lifestyle',
    tags: ['Nature', 'Wellness', 'Mindfulness'],
    status: 'published'
  },
  {
    title: 'Another day saving lives 🚑',
    content: 'Another day saving lives 🚑 Being a paramedic isn\'t just a job, it\'s a calling. The teamwork, dedication, and quick thinking required make every day meaningful. Proud to serve my community alongside amazing healthcare heroes.',
    excerpt: 'Life as a paramedic and community service.',
    category: 'lifestyle',
    tags: ['Healthcare', 'Community', 'Heroes'],
    status: 'published'
  },
  {
    title: 'Marketing campaign success! 📊',
    content: 'Excited to share that our latest marketing campaign exceeded all expectations! 📊 Through careful audience research and creative storytelling, we achieved a 150% ROI. The key? Understanding your audience and creating authentic connections.',
    excerpt: 'Marketing campaign results and strategies.',
    category: 'business',
    tags: ['Marketing', 'Business', 'Success'],
    status: 'published'
  },
  {
    title: 'New personal training program launch 💪',
    content: 'Just launched a new personal training program focused on sustainable fitness! 💪 No quick fixes or fad diets - just science-backed methods for long-term health. Movement is medicine, and I\'m here to help you find what works for YOUR body.',
    excerpt: 'New fitness program with sustainable approach.',
    category: 'health',
    tags: ['Fitness', 'Health', 'Training'],
    status: 'published'
  },
  {
    title: 'Teaching in the digital age 📚',
    content: 'Teaching in the digital age brings unique challenges and opportunities. 📚 Today my students created amazing multimedia presentations about historical events. Seeing them engaged and excited about learning makes every challenge worthwhile. Education is powerful!',
    excerpt: 'Digital teaching experiences and student engagement.',
    category: 'other',
    tags: ['Teaching', 'Education', 'Technology'],
    status: 'published'
  },
  {
    title: 'Seattle street photography 📷',
    content: 'Captured some incredible street photography in downtown Seattle today! 📷 The light was perfect, and the energy of the city was electric. There\'s something magical about freezing a moment in time that will never exist again.',
    excerpt: 'Street photography adventures in Seattle.',
    category: 'other',
    tags: ['Photography', 'Art', 'Seattle'],
    status: 'published'
  },
  {
    title: 'New coffee shop branding project ☕',
    content: 'Working on branding for a new coffee shop and loving every minute! ☕ Creating cohesive visual identities that tell a story is what UX design is all about. From color palettes to user flows, every detail matters.',
    excerpt: 'Coffee shop branding and UX design process.',
    category: 'other',
    tags: ['UX Design', 'Branding', 'Design'],
    status: 'published'
  },
  {
    title: 'Data visualization project 📊',
    content: 'Excited to share my latest data visualization project! 📊 Clean data tells compelling stories. This dashboard shows user engagement metrics for a social platform. What tools do you use for data viz?',
    excerpt: 'Data visualization dashboard for social platform.',
    category: 'technology',
    tags: ['Data Science', 'Visualization', 'Analytics'],
    status: 'published'
  },
  {
    title: 'Climate change research findings 🌍',
    content: 'Climate change is real and happening now. 🌍 Just presented research findings on rising sea levels to policymakers. We need urgent action. What environmental cause are you passionate about?',
    excerpt: 'Climate research and environmental advocacy.',
    category: 'other',
    tags: ['Climate', 'Environment', 'Science'],
    status: 'published'
  },
  {
    title: 'New music track dropping soon! 🎵',
    content: 'New track dropping soon! 🎵 Been working on this beat for months. Fusion of electronic and soul music. Can\'t wait to share it with you all. What\'s your favorite music genre?',
    excerpt: 'New music release - electronic and soul fusion.',
    category: 'other',
    tags: ['Music', 'Production', 'Electronic'],
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
