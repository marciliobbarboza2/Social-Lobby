const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialobby-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user with valid data', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.password).not.toBe(userData.password); // Should be hashed
  });

  it('should not create a user with duplicate username', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    await new User(userData).save();

    await expect(new User(userData).save()).rejects.toThrow();
  });

  it('should not create a user with duplicate email', async () => {
    const userData1 = {
      username: 'testuser1',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User1'
    };

    const userData2 = {
      username: 'testuser2',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User2'
    };

    await new User(userData1).save();

    await expect(new User(userData2).save()).rejects.toThrow();
  });

  it('should compare password correctly', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    const user = new User(userData);
    await user.save();

    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await user.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });

  it('should return public profile', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      bio: 'Test bio'
    };

    const user = new User(userData);
    await user.save();

    const publicProfile = user.getPublicProfile();

    expect(publicProfile.username).toBe(userData.username);
    expect(publicProfile.firstName).toBe(userData.firstName);
    expect(publicProfile.lastName).toBe(userData.lastName);
    expect(publicProfile.bio).toBe(userData.bio);
    expect(publicProfile.password).toBeUndefined();
    expect(publicProfile.email).toBeUndefined();
  });
});
