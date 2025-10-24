# Social Lobby Blogging Platform - Week 2 Presentation

## Slide 1: Title Slide
- **Title:** Social Lobby: A Full-Stack Blogging Platform
- **Subtitle:** Week 2: Core Blogging Features
- **Presenter:** [Your Name]
- **Date:** October 24, 2024

## Slide 2: Project Overview
- **Objective:** Build a social media platform focused on blogging
- **Tech Stack:**
  - Frontend: React.js, Vite, CSS
  - Backend: Node.js, Express.js, MongoDB
  - Authentication: JWT
  - State Management: React Context + Custom Hooks
- **Week 2 Focus:** Authentication and Post CRUD

## Slide 3: Database Schema
- **Users Collection:**
  - username, email, password (hashed), firstName, lastName, avatar, role
- **Posts Collection:**
  - title, content, author (ref User), status, likes (array of user IDs), commentsCount
- **Comments Collection:**
  - content, author (ref User), post (ref Post), parentComment (for replies), likes
- **Relationships:** Posts have many comments, Users can like posts/comments

## Slide 4: App Architecture
- **Frontend Structure:**
  - `src/App.jsx`: Main component with routing and modals
  - `src/useHooks.js`: Custom hooks for auth, posts, data management
  - `src/components/`: Reusable UI components (Post, Comment, Header)
  - `src/views/`: Page-level components (Feed)
- **Backend Structure:**
  - `routes/`: API endpoints (auth, posts, comments)
  - `controllers/`: Business logic
  - `models/`: Mongoose schemas
  - `middleware/`: Auth verification

## Slide 5: Authentication Flow
- **Signup/Login:** User enters credentials → API call to `/api/auth/login`
- **Token Storage:** JWT stored in localStorage
- **Protected Routes:** `verifyToken` middleware checks token validity
- **Logout:** Clear token, reset state
- **Demo:** Show login screen, successful login, token persistence

## Slide 6: Post CRUD Operations
- **Create:** User types post → API POST to `/api/posts`
- **Read:** Fetch posts on app load → GET `/api/posts`
- **Update:** Edit button → PUT `/api/posts/:id`
- **Delete:** Delete button → DELETE `/api/posts/:id`
- **Likes:** Toggle like → POST `/api/posts/:id/like`
- **Demo:** Create a post, edit it, like it, delete it

## Slide 7: Comments System
- **Create Comment:** User types comment → POST `/api/comments`
- **Edit/Delete:** Owner can edit/delete → PUT/DELETE `/api/comments/:id`
- **Nested Comments:** Support for replies (parentCommentId)
- **Like Comments:** Toggle like on comments
- **Demo:** Add comment, edit it, delete it

## Slide 8: Frontend State Management
- **Custom Hooks:**
  - `useAuth`: Login/logout, token verification
  - `usePosts`: CRUD operations, optimistic updates
  - `useData`: Static data (users, groups)
  - `useView`: Modal visibility, current view
- **Context Provider:** `SocialLobbyProvider` wraps app, provides global state

## Slide 9: API Endpoints
- **Auth:** `/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`, `/api/auth/me`
- **Posts:** `/api/posts` (GET, POST), `/api/posts/:id` (PUT, DELETE), `/api/posts/:id/like`
- **Comments:** `/api/comments` (POST), `/api/comments/:id` (PUT, DELETE), `/api/comments/:id/like`
- **Validation:** Express-validator for input sanitization

## Slide 10: Challenges & Solutions
- **Optimistic Updates:** Frontend updates UI immediately, reverts on API failure
- **Token Persistence:** Check token on app load, auto-login if valid
- **Error Handling:** User-friendly error messages, network error fallbacks
- **State Synchronization:** Context + hooks ensure consistent state across components

## Slide 11: Demo Flow
1. **Login:** Enter credentials, show successful authentication
2. **View Feed:** Display posts in reverse chronological order
3. **Create Post:** Type and submit a new post
4. **Like Post:** Click like button, see count update
5. **Add Comment:** Write and post a comment
6. **Edit Comment:** Modify the comment content
7. **Delete Comment:** Remove the comment
8. **Edit Post:** Change post content
9. **Delete Post:** Remove the post
10. **Logout:** Clear session

## Slide 12: Testing & Validation
- **Manual Testing:** Verified all CRUD operations work
- **API Testing:** Postman for endpoint validation
- **Error Scenarios:** Invalid tokens, missing data, network failures
- **Cross-browser:** Tested on Chrome, Firefox

## Slide 13: Future Enhancements
- **Week 3:** Groups, notifications, stories
- **Week 4:** Real-time chat, advanced features
- **Improvements:** Image uploads, rich text editor, pagination

## Slide 14: Q&A
- Open floor for questions
- Key points to cover:
  - Why this tech stack?
  - How does authentication work?
  - Challenges with state management?
  - Database design decisions?
