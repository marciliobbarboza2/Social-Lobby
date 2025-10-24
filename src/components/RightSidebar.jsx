import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const RightSidebar = () => {
  const { dataProps, viewProps, setFilterTopic } = useSocialLobbyContext();
  const { users } = dataProps;
  const { handleOpenChat, setCurrentView } = viewProps;

  const trendingTopics = ['#ReactJS', '#NodeJS', '#WebDev', '#SocialLobby', '#FinalProject'];

  return (
    <aside className="socialobby-right-sidebar">
      <div className="sidebar-section online-friends">
        <h3>Contacts</h3>
        <div className="contacts-list">
          {users && users.length > 0 ? (
            users.slice(0, 7).map(user => (
              <div key={user.username} className="contact online" onClick={() => handleOpenChat(user)}>
                <img src={user.avatar} alt={user.name} className="user-avatar" onClick={() => dataProps.handleViewProfile(user)} style={{cursor: 'pointer', borderRadius: '50%'}} />
                <span>{user.name}</span>
              </div>
            ))
          ) : <p>Loading contacts...</p>}
        </div>
      </div>
      <div className="sidebar-section trending-topics">
        <h3>Trending</h3>
        <div className="trending-list">
          {trendingTopics.map(topic => (
            <div key={topic} className="trend-item" onClick={() => { setFilterTopic(topic); setCurrentView('feed'); }}>
              <a href="#" className="trend-link">{topic}</a>
              <span className="trend-count">{Math.floor(Math.random() * 5)}k</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;