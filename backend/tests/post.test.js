const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

describe('Post Model', () => {
  let testUser;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
    await testUser.save();
  });

  it('should create a post with valid data', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post content with enough length to pass validation.',
      author: testUser._id
    };

    const post = new Post(postData);
    const savedPost = await post.save();

    expect(savedPost.title).toBe(postData.title);
    expect(savedPost.content).toBe(postData.content);
    expect(savedPost.author.toString()).toBe(testUser._id.toString());
    expect(savedPost.status).toBe('draft');
    expect(savedPost.slug).toBe('test-post');
  });

  it('should generate excerpt from content', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a very long content that should be truncated to create an excerpt automatically. We need enough text to exceed the 300 character limit for excerpts.',
      author: testUser._id
    };

    const post = new Post(postData);
    const savedPost = await post.save();

    expect(savedPost.excerpt).toBeDefined();
    expect(savedPost.excerpt.length).toBeLessThanOrEqual(300);
    expect(savedPost.excerpt.endsWith('...')).toBe(true);
  });

  it('should set publishedAt when status changes to published', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post content with enough length to pass validation.',
      author: testUser._id,
      status: 'published'
    };

    const post = new Post(postData);
    const savedPost = await post.save();

    expect(savedPost.publishedAt).toBeDefined();
    expect(savedPost.status).toBe('published');
  });

  it('should increment views', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post content with enough length to pass validation.',
      author: testUser._id
    };

    const post = new Post(postData);
    await post.save();

    expect(post.views).toBe(0);

    await post.incrementViews();

    expect(post.views).toBe(1);
  });

  it('should toggle like correctly', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post content with enough length to pass validation.',
      author: testUser._id
    };

    const post = new Post(postData);
    await post.save();

    expect(post.likes).toBe(0);
    expect(post.likedBy).toHaveLength(0);

    // Like the post
    await post.toggleLike(testUser._id);

    expect(post.likes).toBe(1);
    expect(post.likedBy).toContain(testUser._id);

    // Unlike the post
    await post.toggleLike(testUser._id);

    expect(post.likes).toBe(0);
    expect(post.likedBy).not.toContain(testUser._id);
  });

  it('should get published posts', async () => {
    // Create draft post
    const draftPost = new Post({
      title: 'Draft Post',
      content: 'This is a draft post.',
      author: testUser._id,
      status: 'draft'
    });
    await draftPost.save();

    // Create published post
    const publishedPost = new Post({
      title: 'Published Post',
      content: 'This is a published post.',
      author: testUser._id,
      status: 'published'
    });
    await publishedPost.save();

    const publishedPosts = await Post.getPublished();

    expect(publishedPosts).toHaveLength(1);
    expect(publishedPosts[0].title).toBe('Published Post');
  });
});
