# Social Lobby - Complete Social Media Platform

Welcome to **Social Lobby** - your comprehensive social media platform! This is a full-featured social media application built with modern web technologies. Connect with friends, share your thoughts, engage with content through likes and comments, and build meaningful relationships online.

## 🚀 Live Demo

- **Frontend:** [Deployed on Vercel](https://social-lobby.vercel.app)
- **Backend API:** [Deployed on Render](https://social-lobby-backend.onrender.com)
- **GitHub Repository:** [View Source Code](https://github.com/marciliobbarboza2/Social-Lobby)

## 📋 Project Overview

**Social Lobby** is a comprehensive social media platform that provides all the essential features of modern social networking sites. From secure user authentication to interactive content engagement, real-time messaging, and advanced social features.

### Tech Stack
- **Frontend:** React.js + Vite (lightning-fast development and builds)
- **Backend:** Node.js + Express.js + MongoDB
- **Real-time:** Socket.io for live chat and notifications
- **Authentication:** JWT tokens with bcrypt password hashing
- **Database:** MongoDB Atlas (cloud-hosted)
- **Deployment:** Vercel (frontend) + Render (backend)

## ✨ Features

### Core Social Features
- 🔐 **Secure Authentication** - JWT-based login/signup with encrypted passwords
- 👤 **User Profiles** - Create and customize profiles with bio and avatar
- 📝 **Content Creation** - Create, edit, and manage posts with rich text support
- 💬 **Interactive Comments** - Nested comment system for threaded discussions
- ❤️ **Like System** - Like posts and comments to show appreciation
- 🔍 **Search & Filter** - Find posts by content, tags, or categories
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Advanced Features
- 💬 **Real-time Chat** - Live messaging with Socket.io integration
- 📖 **Stories** - Share temporary content that expires after 24 hours
- 🏷️ **Content Categories** - Organize posts by topics for better discovery
- 🔔 **Toast Notifications** - User feedback for actions and errors
- ⚡ **Optimistic Updates** - Instant UI updates with error rollback
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks (useAuth, useWebSocket)
├── views/              # Page-level components (Feed, Profile)
├── utils/              # Utility functions and mappers
├── data/               # Static data and mock content
├── SocialLobbyContext.jsx  # Global state management
└── App.jsx             # Main application component
```

### Backend Architecture
```
backend/
├── models/             # Mongoose schemas (User, Post, Comment)
├── routes/             # API endpoints (auth, posts, comments)
├── controllers/        # Business logic layer
├── middleware/         # Auth, validation, error handling
├── socket/             # Real-time chat implementation
└── server.js           # Main server with Express setup
```

### Database Schema
- **Users:** Authentication, profiles, social connections
- **Posts:** Content, metadata, engagement metrics
- **Comments:** Threaded discussions with nesting support
- **Stories:** Temporary content with expiration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/marciliobbarboza2/Social-Lobby.git
   cd Social-Lobby
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in backend/ directory
   cd backend
   cp .env.example .env
   ```

   Configure the following environment variables:
   ```env
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/sociallobby
   NODE_ENV=development
   PORT=5000
   ```

4. **Start MongoDB**
   - Local: Ensure MongoDB is running on port 27017
   - Or use MongoDB Atlas and update MONGODB_URI

5. **Run the application**
   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm run dev

   # Terminal 2: Start frontend development server
   cd ..
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/signup` | User registration |
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |
| POST | `/api/comments` | Add comment |
| GET | `/api/users/profile` | Get user profile |

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page)

### Feed View
![Feed View](https://via.placeholder.com/800x400?text=Feed+View)

### User Profile
![User Profile](https://via.placeholder.com/800x400?text=User+Profile)

### Real-time Chat
![Chat Feature](https://via.placeholder.com/800x400?text=Chat+Feature)

## 🔧 Environment Variables

### Backend (.env)
```env
JWT_SECRET=your_super_secret_jwt_key
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sociallobby
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend linting
cd ..
npm run lint
```

## 📚 Documentation

- [Database Schema](./docs/database-schema.md) - Detailed database design
- [Wireframes](./docs/simple-wireframes.md) - UI design concepts
- [API Documentation](./docs/api-docs.md) - Complete API reference

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React, Vite, Node.js, Express, and MongoDB
- Real-time features powered by Socket.io
- UI components styled with modern CSS
- Deployed on Vercel and Render

---

**Happy socializing on Social Lobby!** 🎉

Remember, meaningful connections start with authentic interactions. Build your online community thoughtfully and enjoy connecting with others.
