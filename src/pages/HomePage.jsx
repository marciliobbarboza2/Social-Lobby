import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import Feed from '../views/Feed';

const HomePage = () => {
  const { viewProps, dataProps } = useSocialLobbyContext();
  const { setCurrentView, setShowGroups, handleOpenChat } = viewProps;
  const { stories, users, handleStoryClick, handleViewProfile } = dataProps;

  return (
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
            <li onClick={() => setCurrentView('pages')} style={{cursor: 'pointer'}}>🎨 Art Community</li>
            <li onClick={() => setCurrentView('pages')} style={{cursor: 'pointer'}}>💻 Tech Talk</li>
            <li onClick={() => setCurrentView('pages')} style={{cursor: 'pointer'}}>🍳 Food Lovers</li>
            <li onClick={() => setCurrentView('pages')} style={{cursor: 'pointer'}}>🏃 Fitness Friends</li>
          </ul>
        </div>
      </aside>

      <div className="socialobby-center-content">
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

        <Feed />
      </div>

      <aside className="socialobby-right-sidebar">
        <div className="sidebar-section online-friends">
          <h3>Messenger</h3>
          {users && (
            <div className="contacts-list">
              {users.slice(0, 6).map(user => (
                <div key={user.username} className={`contact ${user.isOnline ? 'online' : ''}`} onClick={() => handleOpenChat(user)}>
                  <img src={user.avatar} alt={user.name} className="contact-avatar" />
                  <span onClick={(e) => { e.stopPropagation(); handleViewProfile(user); }} style={{cursor: 'pointer', color: 'blue'}}>{user.name}</span>
                </div>
              ))}
            </div>
          )}
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
  );
};

export default HomePage;
