## UI Interactivity Enhancement Plan

### Step 1: Update SocialLobbyContext.jsx ✅
- Add new states: filterTopic, selectedEvent, selectedPage
- Add handlers: setFilterTopic, setSelectedEvent, setSelectedPage

### Step 2: Update RightSidebar.jsx ✅
- Change trending topic onClick to set filterTopic and navigate to feed

### Step 3: Update MainContent.jsx ✅
- Add filtering logic in feed view for filterTopic
- Change events onClick to set selectedEvent and show details
- Change pages onClick to set selectedPage and show details
- Add onClick to photos to open modal or navigate to post

### Step 4: Test Interactions
- Run app and verify clicking sections works as expected
