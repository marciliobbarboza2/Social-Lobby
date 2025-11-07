# Screenshots Instructions

## 📸 How to Take Screenshots for Week 4 Submission

After deploying your app, take the following screenshots:

### Required Screenshots (6 total)

#### 1. Login Page (`login.png`)
- Navigate to your Vercel URL
- Show the login form
- Make sure the Social Lobby branding is visible
- Screenshot the entire page

#### 2. Feed with Posts (`feed.png`)
- Login as user: `marcilio` / `password123`
- Show the main feed with multiple posts
- Include visible posts with likes, comments
- Show the "Create Post" section at top

#### 3. Search/Filter Feature (`search.png`)
- In the feed, use the search bar
- Type a search term (e.g., "gaming")
- Select a filter option (Title, Content, or Author)
- Show the filtered results with the search info banner

#### 4. User Profile (`profile.png`)
- Click on your profile (top right menu → Profile)
- Show the profile page with:
  - Avatar
  - Bio, location, website
  - User's posts
  - Stats (posts, followers, following)

#### 5. Settings Page (`settings.png`)
- Click menu → Settings
- Show the settings form with:
  - Display name field
  - Bio textarea
  - Location field
  - Website field
  - Save Changes button

#### 6. Mobile Responsive (`mobile.png`)
- Press F12 to open DevTools
- Click the device toggle (phone icon)
- Select iPhone or Android device
- Show the feed in mobile view
- Screenshot showing responsive design

### Optional Screenshots

#### 7. Post Creation (`create-post.png`)
- Show the "Create a Post" form expanded
- Fill in some content
- Show the "Post" button

#### 8. Comments Section (`comments.png`)
- Click on a post to view comments
- Show nested comment thread
- Show edit/delete options on your own comments

#### 9. Online Status (`online-status.png`)
- Show multiple users with online status indicators
- Green dot = online, Gray = offline

### How to Save Screenshots

1. Take screenshot using:
   - **Windows**: `Windows + Shift + S` (Snipping Tool)
   - **Mac**: `Command + Shift + 4`

2. Save to: `c:\Users\Administrator\Desktop\socialobby\docs\screenshots\`

3. Name files exactly as listed above:
   - `login.png`
   - `feed.png`
   - `search.png`
   - `profile.png`
   - `settings.png`
   - `mobile.png`

### After Taking Screenshots

1. Commit screenshots:
   ```powershell
   git add docs/screenshots/
   git commit -m "Add deployment screenshots for Week 4 submission"
   git push origin frontend-improvements
   ```

2. Update README.md to include screenshot links

3. Submit your deployed URLs along with GitHub repository link

---

## 🖼️ Screenshot Quality Tips

- **Resolution**: Use full resolution (not zoomed in/out)
- **Browser**: Use Chrome or Edge for consistency
- **Window Size**: Use standard desktop size (1920x1080 or similar)
- **Content**: Make sure all UI elements are visible
- **No Personal Info**: Don't include any real personal information
- **Clean UI**: Close browser extensions, bookmarks bar

---

## Example README Screenshot Section

Once you have screenshots, add this to your README.md:

```markdown
## 📸 Screenshots

### Login Page
![Login Page](docs/screenshots/login.png)

### Feed with Posts
![Feed](docs/screenshots/feed.png)

### Search & Filter
![Search Filter](docs/screenshots/search.png)

### User Profile
![Profile](docs/screenshots/profile.png)

### Settings
![Settings](docs/screenshots/settings.png)

### Mobile Responsive
![Mobile View](docs/screenshots/mobile.png)
```

---

**Take these screenshots AFTER deployment to show the live, working application!**
