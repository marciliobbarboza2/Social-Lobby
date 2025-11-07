# Developer Guide for Social Lobby

This guide helps contributors understand key patterns and workflows in the Social Lobby codebase.

## Architecture Overview

Social Lobby is a full-stack social media platform with these key components:

- **Frontend (React + Vite)**: `/src` contains component-based UI with real-time features
- **Backend (Node + Express)**: `/backend` implements REST API and WebSocket server
- **Database**: MongoDB with Mongoose schemas for Users, Posts, Comments, and Stories

### Key Integration Points

1. **WebSocket Integration**: 
   - Socket.io setup in `backend/socket/chat.js`
   - Client connection in `src/SocialLobbyContext.jsx`
   - Used for real-time chat and notifications

2. **Authentication Flow**:
   - JWT tokens managed in `backend/middleware/verifyToken.js`
   ```javascript
   // Example token verification pattern:
   const token = req.header('Authorization')?.replace('Bearer ', '');
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   const user = await User.findById(decoded.id).select('-password');
   ```

3. **Data Flow**:
   - Frontend state management via React Context
   - Optimistic updates with error rollback (see `src/components/Comment.jsx`)
   - Real-time sync using WebSocket events

## Development Workflow

### Local Setup
```bash
# Frontend development
npm install
npm run dev  # Runs Vite dev server at :5173

# Backend development
cd backend
npm install
npm run dev  # Runs Express server at :5000
```

### Testing
- Backend tests use Jest: `cd backend && npm test`
- Frontend linting: `npm run lint`
- Test WebSocket: `cd backend/tests && node useWebSocket.js`

## Project Conventions

### Frontend Patterns
1. **Component Structure**:
   - Pages in `src/views/`
   - Reusable components in `src/components/`
   - Hooks in `src/hooks/`

2. **State Management**:
   ```jsx
   // Example of optimistic updates in components:
   const handleDeleteComment = async () => {
     if (window.confirm('Are you sure?')) {
       try {
         await deleteComment(postId, comment.id);
       } catch (error) {
         console.error('Error:', error);
         alert('Failed to delete comment');
       }
     }
   };
   ```

### Backend Patterns
1. **API Controllers**:
   ```javascript
   // Standard controller pattern with pagination
   const getPosts = async (req, res, next) => {
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 20;
     const options = {
       page,
       limit,
       sort: { publishedAt: -1 },
       populate: {
         path: 'author',
         select: 'username firstName lastName avatar'
       }
     };
     const result = await Post.paginate(query, options);
     res.json({
       success: true,
       data: result.docs,
       pagination: {/*...*/}
     });
   };
   ```

2. **Testing Patterns**:
   ```javascript
   // Example test structure from post.test.js
   describe('Post Model', () => {
     beforeAll(async () => {
       await mongoose.connect(process.env.MONGODB_URI);
     });
     
     beforeEach(async () => {
       await User.deleteMany({});
       await Post.deleteMany({});
     });
     
     it('should create post with valid data', async () => {
       // Test implementation
     });
   });
   ```

### Security Practices
- CSRF protection enabled
- Rate limiting on auth endpoints
- Helmet security headers configured in `server.js`
- Input sanitization using DOMPurify in frontend
- Input validation using express-validator

## Common Tasks

1. **Adding New Features**:
   - Add route in `backend/routes/`
   - Implement controller with validation and pagination
   - Create frontend component with optimistic updates
   - Add WebSocket events if real-time needed

2. **Real-time Features**:
   - Add socket event handler in backend
   - Listen in frontend context
   - Update UI optimistically with rollback
   - Handle reconnection scenarios

3. **Testing New Features**:
   - Add Jest tests in `backend/tests/`
   - Test both success and error cases
   - Include WebSocket testing if relevant