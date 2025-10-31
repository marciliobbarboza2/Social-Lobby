import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const RightSidebar = () => {
  const { dataProps, viewProps, authProps } = useSocialLobbyContext();
  const { handleOpenChat, setCurrentView } = viewProps;
  const { users, setFilterTopic } = dataProps;
  const { currentUser } = authProps;

  const trendingTopics = ['#ReactJS', '#NodeJS', '#WebDev', '#SocialLobby', '#FinalProject', '#JavaScript', '#Python', '#AI', '#MachineLearning'];

  // Get contacts (excluding current user)
  const contacts = users
    .filter(user => user._id !== currentUser?._id)
    .slice(0, 8); // Show up to 8 contacts

  return (
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
            <div key={user._id} className="contact online" onClick={() => handleOpenChat(user)}>
              <img src={user.avatar} alt={user.name} className="user-avatar" onClick={() => dataProps.setSelectedUser(user._id) || setCurrentView('profile')} style={{cursor: 'pointer', borderRadius: '50%'}} />
              <span>{user.name.split(' ')[0]}</span>
              <div className="online-indicator"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section trending-topics">
        <h3>Trending for you</h3>
        <div className="trending-list">
          {trendingTopics.map(topic => (
            <div key={topic} className="trend-item" onClick={() => { setFilterTopic && setFilterTopic(topic); setCurrentView('feed'); }}>
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
  );
};

export default RightSidebar;