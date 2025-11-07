import React, { useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import ChatWindow from './ChatWindow';

const RightSidebar = () => {
  const { dataProps, viewProps, authProps } = useSocialLobbyContext();
  const { handleOpenChat, setCurrentView } = viewProps;
  const { users } = dataProps;
  const { currentUser } = authProps;
  const [activeChats, setActiveChats] = useState([]);
  const [minimizedChats, setMinimizedChats] = useState([]);

  const trendingTopics = ['#ReactJS', '#NodeJS', '#WebDev', '#SocialLobby', '#FinalProject', '#JavaScript', '#Python', '#AI', '#MachineLearning'];

  // Get contacts (excluding current user)
  const contacts = users
    ?.filter(user => user._id !== currentUser?._id)
    ?.slice(0, 8) || []; // Show up to 8 contacts

  const handleChatClose = (userId, action) => {
    if (action === 'minimize') {
      setActiveChats(prev => prev.filter(id => id !== userId));
      setMinimizedChats(prev => [...prev, userId]);
    } else {
      setActiveChats(prev => prev.filter(id => id !== userId));
      setMinimizedChats(prev => prev.filter(id => id !== userId));
    }
  };

  const handleChatOpen = (userId) => {
    if (!activeChats.includes(userId)) {
      setActiveChats(prev => [...prev, userId]);
    }
    setMinimizedChats(prev => prev.filter(id => id !== userId));
  };

  return (
    <div className="right-sidebar-container">
      <aside className="socialobby-right-sidebar">
        <div className="sidebar-section sponsored">
          <h3>Sponsored</h3>
          <div className="sponsored-item" onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>
            <img src="https://picsum.photos/seed/sponsored2/80/60" alt="Sponsored" className="sponsored-image" />
            <div className="sponsored-content">
              <h4>Pro Membership</h4>
              <p>Get unlimited features</p>
              <button className="upgrade-btn" onClick={(e) => { e.stopPropagation(); setCurrentView('feed'); }}>Upgrade Now</button>
            </div>
          </div>
        </div>

        <div className="sidebar-section online-friends">
          <h3>Contacts</h3>
          <div className="contacts-list">
            {contacts.map(user => (
              <div 
                key={user._id} 
                className="contact online" 
                onClick={() => handleOpenChat(user)}
              >
                <div className="contact-avatar">
                  <img 
                    src={user.avatar || 'default-avatar.png'} 
                    alt={user.name} 
                    className="user-avatar" 
                    onClick={(e) => {
                      e.stopPropagation();
                      dataProps.setSelectedUser(user._id);
                      setCurrentView('profile');
                    }} 
                    style={{cursor: 'pointer', borderRadius: '50%'}} 
                  />
                  <span className={`online-status ${user.isOnline ? 'online' : 'offline'}`} />
                </div>
                <span className="contact-name">{user.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section trending-topics">
          <h3>Trending for you</h3>
          <div className="trending-list">
            {trendingTopics.map(topic => (
              <div key={topic} className="trend-item" onClick={() => { window.open(`https://trends.google.com/trends/explore?q=${encodeURIComponent(topic)}`, '_blank'); }}>
                <a href="#" className="trend-link">{topic}</a>
                <span className="trend-count">{Math.floor(Math.random() * 10) + 1}k posts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section events-section">
          <h3>Upcoming Events</h3>
          <div className="event-preview">
            <div className="event-item" onClick={() => setCurrentView('events')} style={{cursor: 'pointer'}}>
              <div className="event-date">Dec 25</div>
              <div className="event-info">
                <h4>Christmas Party</h4>
                <p>🎄 Join us for celebrations!</p>
              </div>
            </div>
            <div className="event-item" onClick={() => setCurrentView('events')} style={{cursor: 'pointer'}}>
              <div className="event-date">Jan 1</div>
              <div className="event-info">
                <h4>New Year Bash</h4>
                <p>🎉 Welcome 2025!</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="chat-windows-wrapper">
        <div className="chat-windows-container">
          {minimizedChats.map(userId => {
            const contact = users.find(u => u._id === userId);
            return contact ? (
              <ChatWindow
                key={userId}
                contact={contact}
                minimized={true}
                onClose={() => handleChatOpen(userId)}
              />
            ) : null;
          })}
          
          {activeChats.map(userId => {
            const contact = users.find(u => u._id === userId);
            return contact ? (
              <ChatWindow
                key={userId}
                contact={contact}
                minimized={false}
                onClose={(action) => handleChatClose(userId, action)}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;