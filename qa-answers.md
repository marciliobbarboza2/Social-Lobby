# Social Lobby Blogging Platform - Q&A Preparation

## Technical Questions

### Architecture & Tech Stack
**Q: Why did you choose React for the frontend?**
A: React provides excellent component reusability, virtual DOM for performance, and a large ecosystem. The hooks system (useState, useContext) made state management clean and predictable.

**Q: Why Express.js and MongoDB?**
A: Express.js is lightweight and flexible for building REST APIs. MongoDB's document-based structure fits well with JSON data and provides easy scaling. Mongoose ODM adds schema validation and helpful middleware.

**Q: How does the Context API work for state management?**
A: We use React Context to provide global state (auth, posts, view) to all components. The SocialLobbyProvider wraps the app and custom hooks consume the context. This avoids prop drilling while keeping state centralized.

### Authentication
**Q: How does JWT authentication work?**
A: User logs in → Server validates credentials → Returns JWT token → Token stored in localStorage → Subsequent requests include "Authorization: Bearer {token}" header → Server verifies token with middleware.

**Q: How do you handle token expiration?**
A: Tokens expire after 7 days. On app load, we check for existing token and verify it with `/api/auth/me`. If invalid/expired, user is logged out automatically.

**Q: What about security?**
A: Passwords hashed with bcrypt, JWT tokens signed with secret key, input validation on both frontend and backend, CORS configured properly.

### Database Design
**Q: Why separate collections for posts and comments?**
A: Allows for efficient querying - posts can be fetched with comment counts without loading all comments. Comments reference posts for relationships, supports nested replies.

**Q: How do you handle post-comment relationships?**
A: Comments have `post` field referencing Post _id. Posts have `commentsCount` field updated when comments are added/deleted. This avoids expensive count queries.

### CRUD Operations
**Q: How do optimistic updates work?**
A: When user performs action (like/edit/delete), UI updates immediately for better UX. If API call fails, state reverts to previous version. This makes the app feel faster.

**Q: How do you handle concurrent edits?**
A: Last-write-wins approach. If multiple users edit simultaneously, the last successful save overwrites previous changes. For production, we'd add version numbers or conflict resolution.

## Implementation Questions

### Frontend Challenges
**Q: How did you manage complex state?**
A: Split state logically: auth state, post data, view state (modals). Used custom hooks to encapsulate business logic. Context provides global access while keeping components focused.

**Q: How do you handle loading and error states?**
A: Each async operation has loading/error state. Loading spinners during API calls, error messages displayed to users. Network errors trigger fallbacks.

### Backend Challenges
**Q: How do you validate input?**
A: Express-validator middleware for server-side validation. Frontend validation for immediate feedback. Both check length, format, required fields.

**Q: How do you handle comment deletion with replies?**
A: When deleting a comment, we recursively delete all its replies using MongoDB transactions. Update the post's comment count by the total number deleted.

### Performance
**Q: How do you optimize rendering?**
A: React.memo for expensive components, useMemo for computed values, proper key props for lists. Virtual scrolling could be added for large feeds.

**Q: Database query optimization?**
A: Indexes on frequently queried fields (author, createdAt). Populate only necessary fields. Pagination for large result sets.

## Project Decisions

### Why this specific tech stack?
- **React:** Industry standard, great for interactive UIs
- **Express/MongoDB:** Full-stack JavaScript, easy deployment
- **JWT:** Stateless authentication, works well with SPAs
- **Context API:** Simple state management without external libraries

### What would you do differently?
- Add TypeScript for better type safety
- Implement real-time updates with WebSockets
- Add comprehensive testing (unit, integration, e2e)
- Use React Query for better data fetching/cache management

### Future Enhancements
- Image uploads with Cloudinary
- Rich text editor (Quill.js)
- Notifications system
- Groups and private messaging
- Advanced search and filtering

## Edge Cases & Error Handling

**Q: What happens if the server crashes during an operation?**
A: Frontend handles network errors gracefully. Optimistic updates revert on failure. User sees error message and can retry.

**Q: How do you handle deleted user accounts?**
A: Soft deletes - mark users as inactive rather than removing data. Comments/posts remain but show "Deleted User".

**Q: What about rate limiting?**
A: Basic rate limiting on auth endpoints. For production, would add Redis-based rate limiting for all endpoints.

## Demo-Specific Questions

**Q: Why is the UI so minimal?**
A: Focused on core functionality for Week 2. Removed chat, complex modals, and extra features to keep demo clear and focused.

**Q: How much data is seeded?**
A: Sample users, posts, and comments for testing. Real app would have proper data seeding scripts.

**Q: Can you show the database directly?**
A: Using MongoDB Compass or Studio 3T to show collections and documents. Can demonstrate queries and relationships.
