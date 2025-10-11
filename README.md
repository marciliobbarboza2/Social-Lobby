# Socialobby

Welcome to Socialobby - your comprehensive social media platform!

This is a full-featured social media platform built with React and Vite. Connect with friends, share your thoughts, engage with content through likes and comments, and build meaningful relationships online.

## Project Overview

Tech Stack Chosen:
- Frontend: React + Vite (for lightning-fast development)
- Backend: Node.js + Express + MongoDB
- Database: MongoDB with Mongoose ODM
- Authentication: JWT tokens with secure password hashing
- Deployment: Ready for Vercel/Netlify (frontend) and Railway/Render (backend)

## What's This All About?

Socialobby is designed to be comprehensive yet user-friendly, providing all the essential features of modern social media platforms. From secure user authentication to interactive content engagement, it offers everything you need to connect and share with others.

### Features

- Lightning Fast - Built with Vite for instant updates and smooth user experience
- Comprehensive Social Features - Full user authentication, profile management, and content creation
- Interactive Engagement - Like posts, leave detailed comments, and participate in discussions
- Secure Authentication - JWT-based login system with encrypted passwords
- User Profiles - Create and customize your profile with bio and avatar
- Content Management - Create, edit, and manage your posts with rich text support
- Real-time Updates - Stay connected with your social circle through dynamic feeds
- Responsive Design - Optimized for desktop, tablet, and mobile devices
- Nested Comments - Engage in threaded conversations with replies
- Content Categories - Organize posts by topics for better discovery

## Getting Started

Ready to start your social media journey? It's straightforward to get up and running!

### Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

Visit http://localhost:5173 to see your social media platform!

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection and JWT secret

# Start the backend server
npm run dev
```

The API will be available at http://localhost:5000

### Database Setup

Make sure you have MongoDB running locally or use a cloud service like MongoDB Atlas.

## Project Structure

```
socialobby/
├── src/                     # React frontend source
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components (Home, Profile, Login, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── assets/             # Images and static assets
│   └── styles/             # CSS styles and themes
├── backend/                # Node.js backend
│   ├── models/             # Mongoose data models (User, Post, Comment)
│   ├── routes/             # API routes (auth, posts, comments, users)
│   ├── middleware/         # Express middleware (auth, validation)
│   ├── controllers/        # Route controllers
│   ├── config/             # Configuration files
│   └── server.js           # Main server file
├── docs/                   # Documentation
│   ├── database-schema.md  # Database design and relationships
│   └── wireframes.md       # UI wireframes and design concepts
├── public/                 # Static assets for frontend
├── index.html              # Main HTML file
└── README.md              # This file
```

## Database Schema

Our MongoDB database includes these main collections:

- Users: User accounts with secure authentication, profiles, and social connections
- Posts: Social media posts with rich content, media support, and engagement metrics
- Comments: Nested comment system for threaded discussions and replies
- Categories: Content organization and discovery features

See docs/database-schema.md for detailed schema information and relationships.

## Wireframes

Check out our hand-drawn wireframes for the core user interface:

- Home Page: Welcoming landing with featured posts
- Authentication: Login and registration flows
- Post View: Individual blog post reading experience
- Dashboard: Content management for authors
- Writing Interface: Rich text editor for creating posts

See docs/wireframes.md for all wireframe designs.

## Tips for Your Social Journey

- Build meaningful connections - Use the platform to engage with others through thoughtful comments and replies
- Secure your account - Always use strong passwords and enable two-factor authentication when available
- Respect others - Be mindful of your comments and interactions to maintain a positive community
- Share authentically - Post content that reflects your true interests and experiences
- Engage actively - Like and comment on posts that resonate with you to build relationships
- Manage your privacy - Review your profile settings and post visibility options regularly
- Report issues - Use the platform's reporting features for inappropriate content
- Stay safe online - Never share personal information that could compromise your security

## Development

### Available Scripts

Frontend:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

Backend:
```bash
npm run dev      # Start with nodemon
npm run start    # Start production server
npm run test     # Run tests
```

### Environment Variables

Copy the example files and configure your environment:

```bash
# Frontend
cp .env.example .env

# Backend
cd backend && cp .env.example .env
```

## Need Help?

- Check out the React documentation for component tips
- Visit Vite's guide for build configuration
- Explore Express.js docs for backend development
- Learn about MongoDB for database queries
- Remember: every expert was once a beginner!

## Week 1 Deliverables

This submission includes all Week 1 requirements:

- GitHub Repository: Complete project setup with proper structure
- README: Comprehensive overview with setup instructions
- Tech Stack Decision: React/Node.js/MongoDB chosen and documented
- Database Schema: Detailed MongoDB schema with relationships
- Wireframes: Hand-drawn UI designs for core pages
- Initial Setup: Both frontend and backend skeleton projects
- Project Structure: Well-organized codebase ready for development

## Made With

- React - For building awesome user interfaces
- Vite - For blazing fast development
- Node.js - Powerful backend runtime
- Express - Minimalist web framework
- MongoDB - Flexible NoSQL database
- Mongoose - Elegant MongoDB object modeling

---

Happy socializing on Socialobby! Remember, meaningful connections start with authentic interactions. Build your online community thoughtfully and enjoy connecting with others.
