# 🚀 DEPLOYMENT INSTRUCTIONS - Follow These Steps

## ✅ Pre-Deployment Checklist
- [x] All code committed and pushed to GitHub
- [x] Environment variables configured
- [x] API URLs using environment variables
- [x] Like button functional
- [x] Edit/delete working for all posts/comments
- [x] Notifications clickable
- [x] Search/filter implemented

---

## 📦 Step 1: Deploy Backend to Render (15 minutes)

### 1.1 Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create account
3. Create a **FREE** cluster
4. Click "Database Access" → Add user:
   - Username: `socialobby`
   - Password: Generate secure password (save it!)
5. Click "Network Access" → Add IP Address:
   - Allow access from **anywhere**: `0.0.0.0/0`
6. Click "Database" → "Connect" → "Connect your application"
7. Copy connection string:
   ```
   mongodb+srv://socialobby:<password>@cluster0.xxxxx.mongodb.net/socialobby?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password

### 1.2 Deploy to Render
1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect repository: `marciliobbarboza2/Social-Lobby`
5. Configure:
   ```
   Name: socialobby-backend
   Branch: frontend-improvements
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```

### 1.3 Add Environment Variables
Click "Environment" tab and add:
```
MONGODB_URI=mongodb+srv://socialobby:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/socialobby?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
PORT=5000
NODE_ENV=production
```

### 1.4 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. **Copy your backend URL**: `https://socialobby-backend.onrender.com`
4. Test it: Visit `https://socialobby-backend.onrender.com/api/posts`

### 1.5 Seed Production Database
1. In Render dashboard, click **"Shell"** tab
2. Run:
   ```bash
   cd backend
   node scripts/seed.js
   ```
3. Verify data seeded successfully

---

## 🎨 Step 2: Deploy Frontend to Vercel (10 minutes)

### 2.1 Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Import: `marciliobbarboza2/Social-Lobby`
5. Configure:
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### 2.2 Add Environment Variable
Click "Environment Variables" and add:
```
Name: VITE_API_URL
Value: https://socialobby-backend.onrender.com
```
(Use YOUR actual Render backend URL!)

### 2.3 Deploy
1. Click **"Deploy"**
2. Wait 2-5 minutes
3. **Copy your frontend URL**: `https://socialobby.vercel.app`

---

## 🔧 Step 3: Update Backend CORS (5 minutes)

### 3.1 Update CORS Configuration
Your backend needs to accept requests from Vercel.

1. In your local code, open `backend/server.js`
2. Find the CORS configuration (around line 20-30)
3. Update to include your Vercel URL:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:5173',
       'http://localhost:3000',
       'https://socialobby.vercel.app',  // Add your Vercel URL here
       'https://your-app.vercel.app'      // If different
     ],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
   };
   
   app.use(cors(corsOptions));
   ```

### 3.2 Commit and Push
```bash
git add backend/server.js
git commit -m "Update CORS for Vercel deployment"
git push origin frontend-improvements
```

### 3.3 Redeploy Backend
Render will automatically redeploy when you push to GitHub.
Wait 3-5 minutes for the update.

---

## 🧪 Step 4: Test Your Deployment (10 minutes)

### 4.1 Test Backend API
Visit these URLs in your browser:
- `https://socialobby-backend.onrender.com/api/posts` - Should return posts
- `https://socialobby-backend.onrender.com/health` - Should return OK

### 4.2 Test Frontend
Visit your Vercel URL: `https://socialobby.vercel.app`

Test all features:
- [x] Login with: `marciliobbarboza@gmail.com` / `marciliobbarboza`
- [x] Create a new post
- [x] Like a post
- [x] Comment on a post
- [x] Edit your post
- [x] Delete your comment
- [x] Use search/filter
- [x] Open notifications
- [x] Check settings page
- [x] Test on mobile browser

### 4.3 Check Browser Console
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - all API calls should succeed

---

## 📝 Step 5: Update README (5 minutes)

Update your README.md with deployment links:

```markdown
## 🔗 Live Demo

- **Frontend**: https://socialobby.vercel.app
- **Backend API**: https://socialobby-backend.onrender.com
- **GitHub**: https://github.com/marciliobbarboza2/Social-Lobby
```

Commit and push:
```bash
git add README.md
git commit -m "Add live deployment links to README"
git push origin frontend-improvements
```

---

## 🎉 Step 6: Final Submission

### 6.1 Create Screenshot Folder
Create `docs/screenshots/` and add:
- Login screen
- Feed with posts
- Search functionality
- Settings page
- Mobile view

### 6.2 Final Push
```bash
git add docs/screenshots/
git commit -m "Add deployment screenshots"
git push origin frontend-improvements
```

### 6.3 Submit
Submit these links before **Nov 6, 11:59 PM**:
- Frontend: `https://socialobby.vercel.app`
- Backend: `https://socialobby-backend.onrender.com`
- GitHub: `https://github.com/marciliobbarboza2/Social-Lobby`

---

## 🐛 Troubleshooting

### Backend Issues
**Problem**: Can't connect to MongoDB
- **Solution**: Check IP whitelist is `0.0.0.0/0` in MongoDB Atlas

**Problem**: CORS errors
- **Solution**: Verify Vercel URL in backend CORS origins

**Problem**: Server timeout on first load
- **Solution**: Render free tier sleeps after inactivity (~30s cold start)

### Frontend Issues
**Problem**: API calls failing
- **Solution**: Check VITE_API_URL environment variable in Vercel

**Problem**: "Failed to fetch"
- **Solution**: Backend might be sleeping, wait 30 seconds and retry

**Problem**: Routes not working
- **Solution**: Vercel should auto-detect Vite, but verify `vercel.json` exists

### Performance
**Problem**: Slow loading
- **Solution**: Normal for free tiers. First load takes 30-60 seconds.

---

## ✅ Deployment Complete!

Your app is now live! 🎊

**Next Steps:**
1. Share your deployed link with classmates
2. Add to your portfolio
3. Continue adding features
4. Consider upgrading to paid tier for production use

**Free Tier Limitations:**
- Render: Sleeps after 15min inactivity, ~30s cold start
- MongoDB Atlas: 512MB storage limit
- Vercel: 100GB bandwidth/month

For serious production use, upgrade to paid tiers.

---

**Need Help?** Check:
- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
