# TODO Steps: Fix Social Lobby Issues

## Step 1: Fix Likes Display
1. Update `src/data/posts.js` to add some likes to static posts data
2. Modify `src/components/Post.jsx` to show likes count even if 0

## Step 2: Fix Comment Editing/Deleting
1. Review and fix `handleEditComment` and `handleSaveComment` in `src/useHooks.js` to work with backend API
2. Ensure `src/components/Comment.jsx` properly handles edit/delete buttons

## Step 3: Improve Stories Data
1. Update `src/data/stories.js` with better content and images

## Step 4: Implement Working Chat/Messenger System
1. Add WebSocket integration in `src/hooks/useWebSocket.js` (if exists) or create new
2. Implement message persistence in backend
3. Update chat components (`src/components/ChatWindow.jsx`, `src/components/ChatModal.jsx`)

## Step 5: Fix Profile Data Display
1. Update `src/components/MainContent.jsx` to handle backend-fetched users properly
2. Ensure user information shows correctly in profiles

## Step 6: Fix Broken Save Functionality
1. Test and fix post/comment saves in `src/useHooks.js`
2. Ensure API calls work correctly

## Step 7: Test All Fixes
1. Run the app and test likes, comments, stories, chat, profiles, and saves
2. Verify no regressions
