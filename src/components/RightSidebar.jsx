import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const RightSidebar = () => {
  const { dataProps, viewProps, setFilterTopic } = useSocialLobbyContext();
  const { handleOpenChat, setCurrentView } = viewProps;

  const trendingTopics = ['#ReactJS', '#NodeJS', '#WebDev', '#SocialLobby', '#FinalProject'];

  return (
    <aside className="socialobby-right-sidebar">
      <div className="sidebar-section online-friends">
        <h3>Contacts</h3>
        <div className="contacts-list">
          {[
            { name: 'Emma Rodriguez', avatar: 'https://picsum.photos/seed/emma/40', username: 'emma' },
            { name: 'David Kim', avatar: 'https://picsum.photos/seed/david/40', username: 'david' },
            { name: 'Sophie Anderson', avatar: 'https://picsum.photos/seed/sophie/40', username: 'sophie' },
            { name: 'Carlos Mendoza', avatar: 'https://picsum.photos/seed/carlos/40', username: 'carlos' },
            { name: 'Lisa Thompson', avatar: 'https://picsum.photos/seed/lisa/40', username: 'lisa' },
            { name: 'Mike Johnson', avatar: 'https://picsum.photos/seed/mike/40', username: 'mike' }
          ].map(user => (
            <div key={user.username} className="contact online" onClick={() => handleOpenChat(user)}>
              <img src={user.avatar} alt={user.name} className="user-avatar" onClick={() => dataProps.handleViewProfile(user)} style={{cursor: 'pointer', borderRadius: '50%'}} />
              <span>{user.name}</span>
            </div>
          ))}
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