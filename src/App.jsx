import { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import Header from './components/Header';
import { notifications as initialNotifications } from './data/notifications.js';
import { groups as initialGroups } from './data/groups.js';
import { stories as initialStories } from './data/stories.js';
import { users as initialUsers } from './data/users.js';
import { events as initialEvents } from './data/events.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showOtherProfile, setShowOtherProfile] = useState(false);
  const [otherUser, _setOtherUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentView, setCurrentView] = useState('feed');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  const [notifications, _setNotificationsState] = useState(initialNotifications);
  const [groups, setGroups] = useState(initialGroups);
  const [stories, _setStories] = useState(initialStories);
  const [users, setUsers] = useState(initialUsers);
  const [events, _setEvents] = useState(initialEvents);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        const postsWithId = data.data.map(post => ({
          ...post,
          id: post._id,
          avatar: post.author.avatar,
          author: post.author.fullName,
          time: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'now',
          content: post.content,
          likes: post.likes,
          reaction: null,
          comments: [], // Comments not fetched in this endpoint
          liked: false,
          image: post.featuredImage
        })).sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
        setPosts(postsWithId);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const [newPost, setNewPost] = useState('');
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleLogin = () => {
    if (loginEmail === 'marciliobbarboza' && loginPassword === 'marciliobbarboza') {
      setIsLoggedIn(true);
      setCurrentUser({
        username: 'marciliobbarboza',
        name: 'Marcilio Barboza',
        avatar: 'https://picsum.photos/seed/marcilio/50',
        email: 'marciliobbarboza@gmail.com',
        bio: 'Entrepreneur and social media enthusiast',
        address: '123 Main St, Palo Alto, CA',
        phone: '+1 (555) 123-4567',
        city: 'Palo Alto',
        groups: ['Tech Innovators', 'Startup Founders', 'Social Media Pioneers'],
        maritalStatus: 'Married'
      });
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      alert('Invalid credentials. Please use marciliobbarboza for both email and password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEditingPost(null);
    setEditingComment(null);
  };

  const handleEditPost = (postId, content) => {
    setEditingPost(postId);
    setEditContent(content);
  };

  const handleSavePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, content: editContent } : post
    ));
    setEditingPost(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditingComment(null);
    setEditContent('');
  };

  const handleEditComment = (postId, commentId, content) => {
    setEditingComment({ postId, commentId });
    setEditContent(content);
  };

  const handleSaveComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId ? { ...comment, content: editContent } : comment
            )
          }
        : post
    ));
    setEditingComment(null);
    setEditContent('');
  };

  const _handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleReaction = (postId, reaction) => {
    setPosts(posts.map(p => p.id === postId ? {...p, reaction, liked: true, likes: p.liked ? p.likes : p.likes + 1} : p));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "You",
        avatar: "https://picsum.photos/seed/you/50",
        time: "now",
        content: newPost,
        likes: 0,
        comments: [],
        liked: false,
        image: null
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleComment = (postId) => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        avatar: "https://picsum.photos/seed/you/30",
        content: newComment,
        time: "now"
      };
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, comment]
            }
          : post
      ));
      setNewComment('');
    }
  };

  const handleViewProfile = (authorName) => {
    const user = users.find(u => u.name === authorName);
    if (user) {
      setSelectedUser(user);
      setCurrentView('profile');
    }
  };

  const handleJoinGroup = (groupId) => {
    setGroups(groups.map(group =>
      group.id === groupId ? { ...group, joined: !group.joined } : group
    ));
  };

  const handleOpenChat = (friendName) => {
    const friend = users.find(u => u.name === friendName);
    if (friend) {
      setSelectedFriend(friend);
      setChatMessages([
        { id: 1, sender: friend.name, text: `Hi ${currentUser.name}! How are you?`, time: '10:30 AM' },
        { id: 2, sender: currentUser.name, text: 'Hey! I\'m good, thanks. How about you?', time: '10:32 AM' },
        { id: 3, sender: friend.name, text: 'Doing great! Just working on some projects.', time: '10:33 AM' }
      ]);
      setShowChat(true);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: currentUser.name,
        text: newMessage,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId)
          }
        : post
    ));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setUsers(users.filter(u => u.username !== currentUser.username));
    }
  };

  const getTodaysBirthdays = () => {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();
    return users.filter(user => {
      if (!user.birthday) return false;
      const [monthName, day] = user.birthday.split(' ');
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthIndex = monthNames.indexOf(monthName) + 1;
      return monthIndex === todayMonth && parseInt(day) === todayDay;
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };

  const groupPostsByDate = (posts) => {
    const grouped = {};
    posts.forEach(post => {
      const date = post.time; // since time is date string
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(post);
    });
    return grouped;
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setShowStoryModal(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-container">
          <div className="login-logo">
            <div className="logo-icon-large">🌐</div>
            <h1 className="logo-text">Sociallobby</h1>
          </div>
          <h2>Login to Sociallobby</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="login-input"
          />
          <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="socialobby-container">
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
        setShowNotifications={setShowNotifications}
        setCurrentView={setCurrentView}
        setSelectedUser={setSelectedUser}
        isLoggedIn={isLoggedIn}
        currentView={currentView}
        onLogoClick={() => setCurrentView('feed')}
      />

      {currentView === 'feed' ? (
        <div className="socialobby-main">
          <aside className="socialobby-sidebar">
            <div className="sidebar-section navigation-section">
              <h3>Navigation</h3>
              <ul>
                <li onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>🏠 Feed</li>
                <li onClick={() => setCurrentView('friends')} style={{cursor: 'pointer'}}>👥 Friends</li>
                <li onClick={() => setCurrentView('messages')} style={{cursor: 'pointer'}}>💬 Messages</li>
                <li onClick={() => setCurrentView('photos')} style={{cursor: 'pointer'}}>📷 Photos</li>
                <li onClick={() => setCurrentView('events')} style={{cursor: 'pointer'}}>📅 Events</li>
                <li onClick={() => setShowGroups(true)} style={{cursor: 'pointer'}}>👪 Groups</li>
                <li onClick={() => setCurrentView('pages')} style={{cursor: 'pointer'}}>📰 Pages</li>
              </ul>
            </div>
            <div className="sidebar-section your-shortcuts">
              <h3>Your Shortcuts</h3>
              <ul>
                <li>🎨 Art Community</li>
                <li>💻 Tech Talk</li>
                <li>🍳 Food Lovers</li>
                <li>🏃 Fitness Friends</li>
              </ul>
            </div>
          </aside>

          <main className="socialobby-content">
            <div className="stories-section">
              <div className="stories-container">
                <div className="story-item add-story">
                  <div className="story-avatar">
                    <img src="https://picsum.photos/seed/you/50" alt="You" />
                    <div className="add-icon">+</div>
                  </div>
                  <span>Add Story</span>
                </div>
                {stories.map(story => (
                  <div key={story.id} className="story-item" onClick={() => handleStoryClick(story)}>
                    <div className="story-avatar">
                      <img src={story.avatar} alt={story.author} />
                    </div>
                    <span>{story.author.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="create-post">
              <div className="post-composer">
                <div className="composer-input">
                  <img src="https://picsum.photos/seed/you/40" alt="You" className="user-avatar" />
                  <textarea
                    placeholder="What\'s happening in your world?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="post-input"
                  />
                </div>
                <div className="composer-actions">
                  <button className="media-btn">📷 Photo</button>
                  <button className="media-btn">📹 Video</button>
                  <button className="media-btn">📍 Location</button>
                  <button className="media-btn">😊 Feeling</button>
                  <button
                    className="post-btn"
                    onClick={handlePost}
                    disabled={!newPost.trim()}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>

            {getTodaysBirthdays().length > 0 && (
              <div className="birthdays-section">
                <h3>🎂 Birthdays Today</h3>
                <div className="birthdays-list">
                  {getTodaysBirthdays().map(user => (
                    <div key={user.username} className="birthday-item">
                      <img src={user.avatar} alt={user.name} className="birthday-avatar" />
                      <span>{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {getUpcomingEvents().length > 0 && (
              <div className="events-section">
                <h3>📅 Upcoming Events</h3>
                <div className="events-list">
                  {getUpcomingEvents().map(event => (
                    <div key={event.id} className="event-item">
                      <img src={event.image} alt={event.title} className="event-image" />
                      <div className="event-info">
                        <h4>{event.title}</h4>
                        <p>{event.date} • {event.location}</p>
                        <p>{event.attendees} attending</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="posts-feed">
              {isLoading ? (
                <p>Loading posts...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                Object.entries(groupPostsByDate(posts)).map(([date, datePosts]) => (
                  <div key={date} className="date-group">
                    <h4 className="date-header">{date}</h4>
                    {datePosts.map(post => (
                      <Post
                        key={post._id}
                        post={post}
                        isLoggedIn={isLoggedIn}
                        handleEditPost={handleEditPost}
                        handleDeletePost={handleDeletePost}
                        editingPost={editingPost}
                        editContent={editContent}
                        setEditContent={setEditContent}
                        handleSavePost={handleSavePost}
                        handleCancelEdit={handleCancelEdit}
                        handleReaction={handleReaction}
                        toggleComments={toggleComments}
                        showComments={showComments}
                        newComment={newComment}
                        setNewComment={setNewComment}
                        handleComment={handleComment}
                        handleViewProfile={handleViewProfile}
                        handleEditComment={handleEditComment}
                        handleDeleteComment={handleDeleteComment}
                        editingComment={editingComment}
                        handleSaveComment={handleSaveComment}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
          </main>

          <aside className="socialobby-right-sidebar">
            <div className="sidebar-section online-friends">
              <h3>Messenger</h3>
              <div className="contacts-list">
                <div className="contact online" onClick={() => handleOpenChat('Emma Rodriguez')}>🟢 Emma Rodriguez</div>
                <div className="contact online" onClick={() => handleOpenChat('David Kim')}>🟢 David Kim</div>
                <div className="contact" onClick={() => handleOpenChat('Sophie Anderson')}>⚪ Sophie Anderson</div>
                <div className="contact online" onClick={() => handleOpenChat('Carlos Mendoza')}>🟢 Carlos Mendoza</div>
                <div className="contact" onClick={() => handleOpenChat('Alex Chen')}>⚪ Alex Chen</div>
                <div className="contact online" onClick={() => handleOpenChat('Lisa Thompson')}>🟢 Lisa Thompson</div>
              </div>
            </div>
            <div className="sidebar-section trending-topics">
              <h3>Trending on Google</h3>
              <div className="trending-list">
                <div className="trend-item">
                  <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('AI Revolution')}`} target="_blank" className="trend-link">AI Revolution</a>
                  <span className="trend-count">+150%</span>
                </div>
                <div className="trend-item">
                  <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Sustainable Living')}`} target="_blank" className="trend-link">Sustainable Living</a>
                  <span className="trend-count">+120%</span>
                </div>
                <div className="trend-item">
                  <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Remote Work Tips')}`} target="_blank" className="trend-link">Remote Work Tips</a>
                  <span className="trend-count">+95%</span>
                </div>
                <div className="trend-item">
                  <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Mental Health Awareness')}`} target="_blank" className="trend-link">Mental Health Awareness</a>
                  <span className="trend-count">+80%</span>
                </div>
                <div className="trend-item">
                  <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Electric Vehicles')}`} target="_blank" className="trend-link">Electric Vehicles</a>
                  <span className="trend-count">+75%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : currentView === 'friends' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Friends</h2>
            <div className="friends-list">
              {users.map(user => (
                <div key={user.username} className="friend-item">
                  <img src={user.avatar} alt={user.name} className="friend-avatar" />
                  <div className="friend-info">
                    <h3>{user.name}</h3>
                    <p>{user.bio}</p>
                  </div>
                  <button className="friend-btn" onClick={() => handleViewProfile(user.name)}>View Profile</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : currentView === 'messages' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Messages</h2>
            <div className="messages-list">
              {users.slice(0, 5).map(user => (
                <div key={user.username} className="message-item" onClick={() => handleOpenChat(user.name)}>
                  <img src={user.avatar} alt={user.name} className="message-avatar" />
                  <div className="message-info">
                    <h3>{user.name}</h3>
                    <p>Last message...</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : currentView === 'photos' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Photos</h2>
            <div className="photos-grid">
              {posts.filter(p => p.image).map(post => (
                <img key={post.id} src={post.image} alt="Post" className="photo-item" />
              ))}
            </div>
          </main>
        </div>
      ) : currentView === 'events' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Events</h2>
            <div className="events-list">
              <div className="event-item">
                <h3>Tech Conference 2024</h3>
                <p>January 15, 2024 - San Francisco</p>
                <button className="event-btn">Attend</button>
              </div>
              <div className="event-item">
                <h3>Food Festival</h3>
                <p>February 20, 2024 - New York</p>
                <button className="event-btn">Attend</button>
              </div>
            </div>
          </main>
        </div>
      ) : currentView === 'pages' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Pages</h2>
            <div className="pages-list">
              <div className="page-item">
                <h3>React Developers</h3>
                <p>Community for React enthusiasts</p>
                <button className="page-btn">Like</button>
              </div>
              <div className="page-item">
                <h3>Healthy Living</h3>
                <p>Tips for a healthy lifestyle</p>
                <button className="page-btn">Like</button>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="profile-page">
          {selectedUser && (
            <>
              <div className="profile-cover" style={{backgroundImage: `url(${selectedUser.coverPhoto})`}}>
                <div className="profile-avatar-large">
                  <img src={selectedUser.avatar} alt={selectedUser.name} />
                </div>
              </div>
              <div className="profile-info">
                <h2>{selectedUser.name}</h2>
                <p>@{selectedUser.username}</p>
                <p>{selectedUser.bio}</p>
                <div className="profile-details">
                  <div className="detail-row">
                    <strong>Birthday:</strong> {selectedUser.birthday}
                  </div>
                  <div className="detail-row">
                    <strong>Profession:</strong> {selectedUser.profession}
                  </div>
                  <div className="detail-row">
                    <strong>Location:</strong> {selectedUser.location}
                  </div>
                  <div className="detail-row">
                    <strong>Education:</strong> {selectedUser.education}
                  </div>
                  <div className="detail-row">
                    <strong>Work:</strong> {selectedUser.work}
                  </div>
                  <div className="detail-row">
                    <strong>Relationship:</strong> {selectedUser.relationship}
                  </div>
                  <div className="detail-row">
                    <strong>Phone:</strong> {selectedUser.phone}
                  </div>
                  <div className="detail-row">
                    <strong>Address:</strong> {selectedUser.address}
                  </div>
                  <div className="detail-row">
                    <strong>City:</strong> {selectedUser.city}
                  </div>
                  <div className="detail-row">
                    <strong>Groups:</strong> {selectedUser.groups.join(', ')}
                  </div>
                  <div className="detail-row">
                    <strong>Joined:</strong> {selectedUser.joined}
                  </div>
                </div>
              </div>
              <div className="profile-posts">
                <h3>Posts</h3>
                {posts.filter(post => post.author === selectedUser.name).map(post => (
                  <article key={post.id} className="post">
                    <div className="post-content">
                      <p>{post.content}</p>
                      {post.image && <img src={post.image} alt="Post" className="post-image-img" />}
                    </div>
                    <div className="post-stats">
                      <span>{post.likes} likes</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="modal-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="modal-input"
            />
            <button className="modal-btn" onClick={handleLogin}>Login</button>
            <button className="modal-btn cancel" onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showProfile && currentUser && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Profile</h2>
            <div className="profile-header">
              <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
              <div>
                <h3>{currentUser.name}</h3>
                <p>@{currentUser.username}</p>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Bio:</strong> {currentUser.bio}</p>
              <p><strong>Address:</strong> {currentUser.address}</p>
              <p><strong>Phone:</strong> {currentUser.phone}</p>
              <p><strong>City:</strong> {currentUser.city}</p>
              <p><strong>Marital Status:</strong> {currentUser.maritalStatus}</p>
              <p><strong>Groups:</strong> {currentUser.groups.join(', ')}</p>
            </div>
            <div className="profile-actions">
              <button className="modal-btn" onClick={() => setShowProfile(false)}>Close</button>
              <button className="modal-btn delete" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
        </div>
      )}

      {showOtherProfile && otherUser && (
        <div className="modal-overlay" onClick={() => setShowOtherProfile(false)}>
          <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Profile</h2>
            <div className="profile-header">
              <img src={otherUser.avatar} alt={otherUser.name} className="profile-avatar" />
              <div>
                <h3>{otherUser.name}</h3>
                <p>@{otherUser.username}</p>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Email:</strong> {otherUser.email}</p>
              <p><strong>Bio:</strong> {otherUser.bio}</p>
              <p><strong>Address:</strong> {otherUser.address}</p>
              <p><strong>Phone:</strong> {otherUser.phone}</p>
              <p><strong>City:</strong> {otherUser.city}</p>
              <p><strong>Marital Status:</strong> {otherUser.maritalStatus}</p>
              <p><strong>Groups:</strong> {otherUser.groups.join(', ')}</p>
            </div>
            <button className="modal-btn" onClick={() => setShowOtherProfile(false)}>Close</button>
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="modal-overlay" onClick={() => setShowNotifications(false)}>
          <div className="modal notifications-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Notifications</h2>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              ))}
            </div>
            <button className="modal-btn" onClick={() => setShowNotifications(false)}>Close</button>
          </div>
        </div>
      )}

      {showGroups && (
        <div className="modal-overlay" onClick={() => setShowGroups(false)}>
          <div className="modal groups-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Groups</h2>
            <div className="groups-list">
              {groups.map(group => (
                <div key={group.id} className="group-item">
                  <img src={group.avatar} alt={group.name} className="group-avatar" />
                  <div className="group-info">
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <div className="group-stats">
                      <span>{group.members} members</span>
                      <span>{group.posts} posts</span>
                    </div>
                  </div>
                  <button
                    className={`join-btn ${group.joined ? 'joined' : ''}`}
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    {group.joined ? 'Leave' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
            <button className="modal-btn" onClick={() => setShowGroups(false)}>Close</button>
          </div>
        </div>
      )}

      {showChat && selectedFriend && (
        <div className="modal-overlay" onClick={() => setShowChat(false)}>
          <div className="modal chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <img src={selectedFriend.avatar} alt={selectedFriend.name} className="chat-avatar" />
              <h3>{selectedFriend.name}</h3>
              <span className="online-status">🟢 Online</span>
              <button className="close-btn" onClick={() => setShowChat(false)}>×</button>
            </div>
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className={`message ${message.sender === currentUser.name ? 'sent' : 'received'}`}>
                  <p>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="message-input"
              />
              <button className="send-btn" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}

      {showStoryModal && selectedStory && (
        <div className="modal-overlay" onClick={() => setShowStoryModal(false)}>
          <div className="modal story-modal" onClick={(e) => e.stopPropagation()}>
            <div className="story-view">
              <img src={selectedStory.image} alt="Story" className="story-image" />
              <div className="story-info">
                <img src={selectedStory.avatar} alt={selectedStory.author} className="story-author-avatar" />
                <span>{selectedStory.author}</span>
                <span>{selectedStory.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="chat-bar">
        {users.slice(0,5).map(user => (
          <img key={user.username} src={user.avatar} alt={user.name} className="chat-icon" onClick={() => {setSelectedFriend(user); setShowChat(true);}} />
        ))}
      </div>
    </div>
  );
}

export default App;
