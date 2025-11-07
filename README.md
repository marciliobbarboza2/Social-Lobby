# 🌟 Social Lobby - Connect, Share, Engage

Welcome to **Social Lobby** - your comprehensive social media platform built with modern web technologies!

> A full-featured social networking application with real-time updates, search functionality, and beautiful high-contrast UI.

## 🔗 Live Demo

- **Frontend**: [https://your-app.vercel.app](https://your-app.vercel.app) _(Update after deployment)_
- **Backend API**: [https://socialobby-backend.onrender.com](https://socialobby-backend.onrender.com) _(Update after deployment)_
- **Repository**: [https://github.com/marciliobbarboza2/Social-Lobby](https://github.com/marciliobbarboza2/Social-Lobby)

## 📸 Screenshots

_Add screenshots here after deployment_

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Context API** - Global state management
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **Socket.IO** - WebSocket server

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## ✨ Features

### 🔐 Authentication & Security
- ✅ Secure JWT-based authentication
- ✅ Password encryption with bcrypt
- ✅ Protected routes and API endpoints
- ✅ Session management

### 📱 Social Features
- ✅ Create, edit, and delete posts
- ✅ Like and comment on posts
- ✅ Nested comment threads
- ✅ User profiles with customization
- ✅ Real-time online status tracking
- ✅ WebSocket-based chat system

### 🔍 Search & Discovery
- ✅ Advanced search functionality
- ✅ Filter by title, content, or author
- ✅ Live search results
- ✅ Post sorting (recent/popular)

### 🎨 UI/UX
- ✅ High-contrast 3-color design system
- ✅ Responsive layout (mobile/tablet/desktop)
- ✅ Loading skeletons for better UX
- ✅ Error boundaries for crash protection
- ✅ Accessible with ARIA labels
- ✅ Settings page for preferences

### ⚙️ Settings & Customization
- ✅ Privacy settings (private profile, online status)
- ✅ Notification preferences
- ✅ Theme selection
- ✅ Profile customization

## 🗂️ Project Structure
```
socialobby/
├── src/                     # React frontend source
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components (Home, Profile, Login, etc.)
```
socialobby/
├── src/                      # React frontend
│   ├── components/           # UI components (Post, Comment, Header, etc.)
│   ├── views/                # Page views (Feed, Profile, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── assets/               # Images and static files
│   └── SocialLobbyContext.jsx # Global state management
├── backend/                  # Node.js backend
│   ├── models/               # Mongoose schemas (User, Post, Comment)
│   ├── routes/               # API endpoints (auth, posts, comments, users)
│   ├── middleware/           # Auth verification, error handling
│   ├── controllers/          # Route logic
│   ├── scripts/              # Database seeding scripts
│   ├── socket/               # WebSocket server
│   └── server.js             # Express server
├── docs/                     # Documentation
│   ├── database-schema.md    # Database design
│   └── wireframes.md         # UI mockups
├── DEPLOYMENT.md             # Deployment instructions
└── README.md                 # This file
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/marciliobbarboza2/Social-Lobby.git
cd Social-Lobby
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ..
npm install
```

### 3. Set Up Environment Variables

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/socialobby
JWT_SECRET=your-secret-key-change-this
PORT=5000
```

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:5000
```

### 4. Seed the Database
```bash
cd backend
node scripts/seed.js
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Open Application
Visit [http://localhost:5173](http://localhost:5173)

**Default Login Credentials:**
- Email: `marciliobbarboza@gmail.com`
- Password: `marciliobbarboza`

## 🚢 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

**Quick Steps:**
1. Deploy backend to [Render](https://render.com)
2. Deploy frontend to [Vercel](https://vercel.com)
3. Set up MongoDB Atlas for cloud database
4. Configure environment variables
5. Update CORS origins

## 📚 Database Schema

### Users Collection
- Authentication (email, password hash)
- Profile (name, bio, avatar, cover photo)
- Social data (followers, following, groups)
- Settings (privacy, notifications)

### Posts Collection
- Content (title, body, images)
- Metadata (author, timestamp, tags)
- Engagement (likes, comments, shares)

### Comments Collection
- Content and author
- Parent post/comment reference
- Nested replies support
- Timestamps

See [docs/database-schema.md](./docs/database-schema.md) for detailed schema.

## 🎨 Design System

### 3-Color High-Contrast Theme
- **Deep Blue-Black**: `#0a0e1a`, `#111827`, `#1a2332` (backgrounds)
- **Electric Blue**: `#3b82f6`, `#60a5fa`, `#2563eb` (accents)
- **Pure White**: `#ffffff`, `#e5e7eb`, `#9ca3af` (text)

### Design Principles
- 2px borders throughout
- Bold font weights (700-800)
- Blue glow effects on interactive elements
- Smooth 0.2s transitions
- Mobile-first responsive design

## 🧪 Testing

**Backend API Endpoints:**
- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

**Frontend Components:**
- CreatePost - Post creation form
- SearchFilter - Search and filter posts
- SettingsPage - User preferences
- ErrorBoundary - Error handling
- LoadingSkeleton - Loading states

## 📝 API Documentation

### Authentication
```javascript
// Login
POST /api/auth/login
Body: { email, password }
Response: { token, user }

// Register
POST /api/auth/register
Body: { username, email, password, firstName, lastName }
Response: { token, user }
```

### Posts
```javascript
// Get all posts
GET /api/posts
Headers: { Authorization: Bearer <token> }
Response: { posts: [...] }

// Create post
POST /api/posts
Headers: { Authorization: Bearer <token> }
Body: { title, content }
Response: { post: {...} }
```

### Comments
```javascript
// Add comment
POST /api/posts/:postId/comments
Headers: { Authorization: Bearer <token> }
Body: { content }
Response: { comment: {...} }
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

**Marcilio Barboza**
- GitHub: [@marciliobbarboza2](https://github.com/marciliobbarboza2)
- Email: marciliobbarboza@gmail.com

## 🙏 Acknowledgments

- React team for amazing framework
- Vite for lightning-fast development
- MongoDB for flexible database
- Express for robust backend framework
- Socket.IO for real-time features

## 📞 Support

If you have any questions or run into issues:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review [docs/database-schema.md](./docs/database-schema.md)
3. Open an issue on GitHub
4. Contact: marciliobbarboza@gmail.com

---

**Built with ❤️ for Week 4 Final Project**

*Happy socializing on Social Lobby! Connect, share, and engage with meaningful content.* 🌟