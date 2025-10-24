# Social Lobby Blogging Platform - Live Demo Script

## Demo Overview
**Duration:** 10-12 minutes
**Audience:** Instructor and classmates
**Focus:** Show authentication and CRUD functionality smoothly

## Pre-Demo Setup
- [ ] Backend server running on port 5000
- [ ] Frontend dev server running on port 5174
- [ ] MongoDB connected and seeded with sample data
- [ ] Browser open to http://localhost:5174
- [ ] Clear browser cache/cookies
- [ ] Have slides.md ready for reference

## Demo Script

### 1. Introduction (30 seconds)
"Today I'll demonstrate Social Lobby, a full-stack blogging platform built with React, Express.js, and MongoDB. The app features user authentication and complete CRUD operations for posts and comments."

### 2. Authentication Demo (2 minutes)
**Step 1: Login Screen**
- Show login form
- Enter credentials: email="test@example.com", password="password123"
- Click "Login" button
- Verify: User redirected to feed, header shows "Welcome Test User"

**Step 2: Token Persistence**
- Refresh the page
- Verify: User stays logged in (token persists in localStorage)

**Step 3: Logout**
- Click logout button in header
- Verify: Redirected to login screen

### 3. Post CRUD Demo (4 minutes)

**Step 1: View Feed**
- Login again
- Show feed with existing posts
- Point out: Posts display in reverse chronological order, show author info

**Step 2: Create Post**
- Type in composer: "This is my demo post to show CRUD functionality!"
- Click "Share" button
- Verify: New post appears at top of feed

**Step 3: Like Post**
- Click heart/like button on the new post
- Verify: Like count increases, button shows liked state

**Step 4: Edit Post**
- Click "Edit" button on your post
- Change text to: "This is my updated demo post!"
- Click "Save"
- Verify: Post content updates

**Step 5: Add Comment**
- Click "Comment" button on a post
- Type: "Great post! This is a test comment."
- Click "Post" button
- Verify: Comment appears below post

**Step 6: Edit Comment**
- Click edit icon (✏️) on your comment
- Change to: "Great post! This is my updated comment."
- Click "Save"
- Verify: Comment updates

**Step 7: Delete Comment**
- Click delete icon (🗑️) on your comment
- Confirm deletion
- Verify: Comment disappears

**Step 8: Delete Post**
- Click "Delete" button on your post
- Confirm deletion
- Verify: Post disappears from feed

### 4. Technical Explanation (2 minutes)
**Database Schema:**
- Users: username, email, password, profile info
- Posts: title, content, author, likes, commentsCount
- Comments: content, author, post, parentComment, likes

**Architecture:**
- Frontend: React with Context API for state management
- Backend: Express.js with JWT authentication
- Database: MongoDB with Mongoose ODM

**Key Features:**
- Optimistic updates for better UX
- Input validation on frontend and backend
- Error handling with user-friendly messages

### 5. Q&A Preparation (1-2 minutes)
"I'm ready for questions about the tech stack, database design, authentication flow, or any implementation details."

## Timing Checkpoints
- 0:00 - Introduction
- 0:30 - Start authentication demo
- 2:30 - Start post CRUD demo
- 6:30 - Technical explanation
- 8:30 - Open for Q&A

## Backup Plans
- If login fails: Check server logs, verify MongoDB connection
- If API calls fail: Check network tab, verify backend is running
- If UI bugs: Refresh page, clear cache
- If time runs short: Skip comment edit/delete, focus on core CRUD

## Demo Flow Checklist
- [ ] Login screen loads
- [ ] Authentication works
- [ ] Feed displays posts
- [ ] Create post works
- [ ] Edit post works
- [ ] Delete post works
- [ ] Add comment works
- [ ] Edit comment works
- [ ] Delete comment works
- [ ] Logout works
- [ ] No console errors
- [ ] Smooth transitions between actions
