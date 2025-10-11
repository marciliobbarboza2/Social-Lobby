# My Blogging Space

Welcome to your personal corner of the internet!

This is a blogging platform built using React and Vite. Whether you're sharing your thoughts, stories, or creative ideas, this is your space to express yourself freely.

## Project Overview

Tech Stack Chosen:
- Frontend: React + Vite (for lightning-fast development)
- Backend: Node.js + Express + MongoDB
- Database: MongoDB with Mongoose ODM
- Authentication: JWT tokens
- Deployment: Ready for Vercel/Netlify (frontend) and Railway/Render (backend)

## What's This All About?

This blogging platform is designed to be simple, fast, and enjoyable to use. No complicated setup, no overwhelming features - just you and your words.

### Features

- Lightning Fast - Built with Vite for instant updates while you write
- Beautiful & Clean - A distraction-free writing experience
- Easy to Use - Start writing in seconds, no tech degree required
- Fully Yours - Customize it however you like!
- User Authentication - Secure login and registration
- Rich Blog Posts - Full-featured post creation and management
- Comments System - Engage with your readers
- Categories & Tags - Organize your content
- Responsive Design - Looks great on all devices

## Getting Started

Ready to start your blogging journey? It's super easy!

### Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

Visit http://localhost:5173 to see your blogging space!

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection and other settings

# Start the backend server
npm run dev
```

The API will be available at http://localhost:5000

### Database Setup

Make sure you have MongoDB running locally or use a cloud service like MongoDB Atlas.

## Project Structure

```
blogging-platform/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # CSS styles
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── controllers/         # Route controllers
│   ├── config/              # Configuration files
│   └── package.json
├── docs/                    # Documentation
│   ├── database-schema.md   # Database design
│   └── wireframes.md        # UI wireframes
└── README.md               # This file
```

## Database Schema

Our MongoDB database includes these main collections:

- Users: User accounts with authentication
- Posts: Blog posts with rich content
- Comments: Nested comment system
- Categories: Content organization (future feature)

See docs/database-schema.md for detailed schema information.

## Wireframes

Check out our hand-drawn wireframes for the core user interface:

- Home Page: Welcoming landing with featured posts
- Authentication: Login and registration flows
- Post View: Individual blog post reading experience
- Dashboard: Content management for authors
- Writing Interface: Rich text editor for creating posts

See docs/wireframes.md for all wireframe designs.

## Tips for Your Blogging Journey

- Write from the heart - Authenticity resonates with readers
- Be consistent - Regular posts help build your audience
- Have fun - If you're not enjoying it, your readers won't either!
- Experiment - Try different styles and topics to find your voice

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

Happy Blogging! Remember, your voice matters and your stories are worth sharing. Now go create something amazing!
