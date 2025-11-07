import React, { useMemo, useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const RightSidebar = () => {
  const { dataProps, viewProps, authProps } = useSocialLobbyContext();
  const { handleOpenChat, setCurrentView } = viewProps;
  const { users, setFilterTopic } = dataProps;
  const { currentUser } = authProps;

  const trendingTopics = ['#ReactJS', '#NodeJS', '#WebDev', '#SocialLobby', '#FinalProject', '#JavaScript', '#Python', '#OpenSource', '#UXDesign'];
  
  // Get contacts (excluding current user)
  const contacts = useMemo(() => users
    .filter(user => user._id !== currentUser?._id)
    .slice(0, 20), [users, currentUser?._id]); // more contacts for messenger feel

  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return contacts;
    return contacts.filter(u => (u.name || '').toLowerCase().includes(term));
  }, [search, contacts]);

  return (
    <aside className="socialobby-right-sidebar">
      <div className="sidebar-section sponsored">
        <h3>Sponsored</h3>
        <div className="sponsored-item" style={{ cursor: 'pointer' }} onClick={() => window.open('https://socialobby.com/premium', '_blank')}>
          <img src="https://picsum.photos/seed/sponsored2/80/60" alt="Sponsored" className="sponsored-image" />
          <div className="sponsored-content">
            <h4>Pro Membership</h4>
            <p>Get unlimited features</p>
            <button className="upgrade-btn">Upgrade Now</button>
          </div>
        </div>
      </div>

      <div className="sidebar-section birthday-section">
        <h3>Birthdays</h3>
        <div className="birthday-item" onClick={() => setCurrentView('friends')} style={{ cursor: 'pointer' }}>
          <div className="birthday-icon">🎂</div>
          <p><strong>John Doe</strong>'s birthday is today</p>
        </div>
      </div>

      <div className="sidebar-section messenger-panel">
        <div className="messenger-header">
          <h3>Messenger</h3>
          <div className="messenger-actions">
            <button className="icon-btn" title="New call" onClick={() => setCurrentView('messages')}>🎥</button>
            <button className="icon-btn" title="New chat" onClick={() => setCurrentView('messages')}>✉️</button>
            <button className="icon-btn" title="Options">⋯</button>
          </div>
        </div>
        <input
          className="messenger-search"
          placeholder="Search Messenger"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="messenger-list">
          {filtered.map(user => (
            <div key={user._id} className="messenger-contact" onClick={() => handleOpenChat(user)}>
              <div className="avatar-wrap">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="user-avatar"
                  onError={(e) => {
                    console.log(`[RightSidebar] Avatar failed for ${user.name}:`, user.avatar);
                    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=40&background=3b82f6&color=fff&bold=true&rounded=true`;
                    e.target.src = fallbackUrl;
                  }}
                />
                <span className="active-dot" />
              </div>
              <div className="messenger-contact-info">
                <div className="name-row">
                  <span className="name">{user.name.split(' ')[0]}</span>
                </div>
                <div className="subtext">Active now</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="messenger-empty">No conversations found</div>
          )}
        </div>
      </div>

      <div className="sidebar-section trending-topics">
        <h3>Trending for you</h3>
        <div className="trending-list">
          {trendingTopics.map(topic => (
            <div key={topic} className="trend-item" onClick={() => { setFilterTopic && setFilterTopic(topic); setCurrentView('feed'); }}>
              <a href="#" className="trend-link" onClick={(e) => e.preventDefault()}>{topic}</a>
              <span className="trend-count">{Math.floor(Math.random() * 10) + 1}k posts</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section events-section">
        <h3>Upcoming Events</h3>
        <div className="event-preview">
          <div className="event-item" onClick={() => setCurrentView('events')} style={{ cursor: 'pointer' }}>
            <div className="event-date">Dec 25</div>
            <div className="event-info">
              <h4>Christmas Party</h4>
              <p>🎄 Join us for celebrations!</p>
            </div>
          </div>
          <div className="event-item" onClick={() => setCurrentView('events')} style={{ cursor: 'pointer' }}>
            <div className="event-date">Jan 1</div>
            <div className="event-info">
              <h4>New Year Bash</h4>
              <p>🎉 Welcome 2026!</p>
            </div>
          </div>
        </div>
        <button className="see-all-btn" onClick={() => setCurrentView('events')} style={{ marginTop: '12px', width: '100%' }}>See All Events</button>
      </div>

      <div className="sidebar-section">
        <h3>Notifications</h3>
        <div className="notifications-preview">
          <div className="notification-item" onClick={() => setCurrentView('feed')} style={{ cursor: 'pointer' }}>
            <span className="notification-icon">❤️</span>
            <div className="notification-content">
              <p><strong>David Kim</strong> liked your post</p>
              <span className="notification-time">5 minutes ago</span>
            </div>
          </div>
          <div className="notification-item" onClick={() => setCurrentView('feed')} style={{ cursor: 'pointer' }}>
            <span className="notification-icon">💬</span>
            <div className="notification-content">
              <p><strong>Sophie Anderson</strong> commented on your post</p>
              <span className="notification-time">10 minutes ago</span>
            </div>
          </div>
          <div className="notification-item" onClick={() => setCurrentView('feed')} style={{ cursor: 'pointer' }}>
            <span className="notification-icon">👤</span>
            <div className="notification-content">
              <p><strong>Sophie Anderson</strong> started following you</p>
              <span className="notification-time">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
