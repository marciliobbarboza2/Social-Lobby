# 🚀 Manual Deployment Steps - Social Lobby

## ⚠️ IMPORTANT: Manual Steps Required

I cannot automatically deploy to Render, Vercel, or MongoDB Atlas as they require:
- Web browser authentication
- Credit card verification (even for free tiers)
- Manual service creation through dashboards

Follow these steps in order:

---

## Step 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create Free Cluster
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up or log in
3. Click "Build a Database" → Choose **FREE** (M0)
4. Select **AWS** as provider
5. Choose closest region (e.g., US East)
6. Cluster Name: `SocialLobby`
7. Click "Create"

### 1.2 Create Database User
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `socialobby`
4. Password: **Generate a secure password** (save it!)
5. Database User Privileges: `Atlas admin`
6. Click "Add User"

### 1.3 Whitelist All IPs
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP Address: `0.0.0.0/0`
5. Click "Confirm"

### 1.4 Get Connection String
1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string:
   ```
   mongodb+srv://socialobby:<password>@sociallobb.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>` with your actual password**
6. **Add database name**: Change to `mongodb+srv://socialobby:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/socialobby?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend to Render (10 minutes)

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (authorize access)

### 2.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your repository: `marciliobbarboza2/Social-Lobby`
3. Click "Connect" next to the repository

### 2.3 Configure Service
Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `socialobby-backend` |
| **Region** | Oregon (US West) |
| **Branch** | `frontend-improvements` |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | Free |

### 2.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable" for each:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1.4 |
| `JWT_SECRET` | `socialobby-super-secret-jwt-key-2024-production` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `http://localhost:5173` (update after Vercel deploy) |

### 2.5 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. **Copy your backend URL**: `https://socialobby-backend.onrender.com` (or similar)

### 2.6 Seed Production Database
1. In Render dashboard, click your service
2. Click "Shell" tab (top right)
3. Run:
   ```bash
   cd backend
   node scripts/seed.js
   ```
4. Wait for "Database seeded successfully!"

---

## Step 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub (authorize access)

### 3.2 Import Repository
1. Click "Add New..." → "Project"
2. Import `marciliobbarboza2/Social-Lobby`
3. Click "Import"

### 3.3 Configure Project
| Field | Value |
|-------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `./` (leave default) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 3.4 Add Environment Variable
1. Click "Environment Variables"
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Render backend URL from Step 2.5 (e.g., `https://socialobby-backend.onrender.com`)
3. Select all environments (Production, Preview, Development)

### 3.5 Deploy
1. Click "Deploy"
2. Wait 2-5 minutes
3. **Copy your frontend URL**: `https://socialobby.vercel.app` (or similar)

---

## Step 4: Update Backend CORS (2 minutes)

### 4.1 Add Vercel URL to Backend
1. Go back to Render dashboard
2. Click your backend service
3. Click "Environment" tab
4. Find `CLIENT_URL` variable
5. Change value to your Vercel URL from Step 3.5
6. Click "Save Changes"
7. Render will automatically redeploy (wait 2-3 minutes)

---

## Step 5: Test Your Deployment (5 minutes)

### 5.1 Open Your App
1. Go to your Vercel URL: `https://socialobby.vercel.app`
2. You should see the login page

### 5.2 Test Login
1. Username: `marcilio`
2. Password: `password123`
3. Click "Login"

### 5.3 Verify Features
- ✅ Feed loads with posts
- ✅ Like button works
- ✅ Comments load and display
- ✅ Search filter works
- ✅ Profile page loads
- ✅ Online status updates
- ✅ Create new post
- ✅ Edit/delete your own posts/comments

---

## Step 6: Update README (Optional)

Once deployed, update your README with live URLs:

```markdown
## 🌐 Live Demo

- **Frontend**: https://socialobby.vercel.app
- **Backend API**: https://socialobby-backend.onrender.com
- **Database**: MongoDB Atlas

### Test Credentials
- Username: `marcilio`
- Password: `password123`
```

---

## 🐛 Troubleshooting

### Backend won't deploy
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend can't connect to backend
- Check browser console for CORS errors
- Verify `VITE_API_URL` environment variable in Vercel
- Verify `CLIENT_URL` in Render matches your Vercel URL

### Database connection fails
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify database user has correct permissions
- Ensure password in connection string has no special characters (or properly encoded)

### Free tier limitations
- **Render**: Backend sleeps after 15 minutes of inactivity (first request takes 30-60 seconds)
- **Vercel**: 100GB bandwidth/month
- **MongoDB Atlas**: 512MB storage

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist set to 0.0.0.0/0
- [ ] Connection string copied and password replaced
- [ ] Render account created
- [ ] Backend service deployed to Render
- [ ] All environment variables added to Render
- [ ] Production database seeded
- [ ] Backend URL copied
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] VITE_API_URL environment variable added
- [ ] Frontend URL copied
- [ ] CLIENT_URL updated in Render
- [ ] Backend redeployed with new CORS
- [ ] Login tested successfully
- [ ] All features verified working

---

## 🎉 After Deployment

Your Social Lobby app is now live and accessible worldwide!

**Share your links:**
- Frontend: https://your-app.vercel.app
- Backend: https://your-backend.onrender.com

**Note**: Free tier backends on Render sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds to wake up.
