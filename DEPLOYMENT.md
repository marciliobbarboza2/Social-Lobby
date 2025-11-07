# 🚀 Social Lobby - Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (for cloud database)
- Render account (for backend deployment)
- Vercel account (for frontend deployment)
- GitHub repository with your code

## 🔧 Backend Deployment (Render)

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist all IPs (0.0.0.0/0) for connection
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/socialobby?retryWrites=true&w=majority
   ```

### Step 2: Deploy Backend to Render

1. Go to [Render](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `socialobby-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=production
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Note your backend URL: `https://socialobby-backend.onrender.com`

### Step 3: Update Backend CORS

In `backend/server.js`, update the CORS configuration:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend-app.vercel.app' // Add your Vercel URL
  ],
  credentials: true
};
```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update Frontend API URL

Create a `.env.production` file in the root directory:

```env
VITE_API_URL=https://socialobby-backend.onrender.com
```

Update all `fetch` calls in your code to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
fetch(`${API_URL}/api/posts`)
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   ```
   VITE_API_URL=https://socialobby-backend.onrender.com
   ```

6. Click "Deploy"
7. Wait for deployment (2-5 minutes)
8. Your app will be live at: `https://your-app.vercel.app`

## 🔄 Post-Deployment Steps

### Update Backend CORS with Vercel URL

1. Go back to Render dashboard
2. Update the CORS origins in your backend code
3. Redeploy the backend service

### Seed Production Database

1. Update `backend/scripts/seed.js` to use production MongoDB URI
2. Run the seed script:
   ```bash
   cd backend
   node scripts/seed.js
   ```

### Test the Deployment

1. Visit your Vercel frontend URL
2. Create a test account
3. Test features:
   - ✅ User registration/login
   - ✅ Create post
   - ✅ Like/comment
   - ✅ Search/filter
   - ✅ Edit/delete
   - ✅ Settings page
   - ✅ Real-time updates

## 📝 Environment Variables Summary

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/socialobby
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=production
```

### Frontend (Vercel)
```env
VITE_API_URL=https://socialobby-backend.onrender.com
```

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Can't connect to database
- **Solution**: Check MongoDB Atlas IP whitelist includes 0.0.0.0/0

**Problem**: CORS errors
- **Solution**: Verify Vercel URL is in CORS origins list

**Problem**: Server timeout
- **Solution**: Render free tier sleeps after inactivity (cold start takes ~30s)

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Verify VITE_API_URL environment variable is set correctly

**Problem**: Routes not working
- **Solution**: Ensure `vercel.json` rewrites are configured

**Problem**: Images not loading
- **Solution**: Check external image URLs are accessible from production

## 📊 Performance Tips

1. **Enable Caching**: Add caching headers in backend
2. **Optimize Images**: Use CDN for avatars and cover photos
3. **Code Splitting**: Vite automatically splits code
4. **Compress Assets**: Enable gzip compression on Render
5. **Monitor Logs**: Use Render logs to debug production issues

## 🎯 Final Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Database seeded with initial data
- [ ] Frontend deployed to Vercel
- [ ] VITE_API_URL set on Vercel
- [ ] CORS updated with Vercel URL
- [ ] All features tested in production
- [ ] README updated with deployment links
- [ ] Screenshots added to repository

## 🔗 Deployment Links

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://socialobby-backend.onrender.com
- **GitHub**: https://github.com/marciliobbarboza2/Social-Lobby

## 📸 Screenshots

Add screenshots to `docs/screenshots/` folder:
- Login screen
- Feed with posts
- Search functionality
- Settings page
- Mobile responsive views

---

**Note**: Free tier limitations:
- Render: Server sleeps after 15 min of inactivity
- MongoDB Atlas: 512MB storage limit
- Vercel: 100GB bandwidth per month

For production apps, consider upgrading to paid tiers.
