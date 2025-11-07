import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const LeftSidebar = () => {
  const { viewProps } = useSocialLobbyContext();
  const { setCurrentView } = viewProps;

  const navItems = [
    { name: 'Feed', icon: '🏠', view: 'feed' },
    { name: 'Marketplace', icon: '🛍️', view: 'marketplace' },
    { name: 'Friends', icon: '👥', view: 'friends' },
    { name: 'Messages', icon: '💬', view: 'messages' },
    { name: 'Photos', icon: '📷', view: 'photos' },
    { name: 'Events', icon: '📅', view: 'events' },
    { name: 'Groups', icon: '👪', view: 'groups' },
    { name: 'Pages', icon: '📰', view: 'pages' },
  ];

  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  // Note: Online Friends panel removed per request

  return (
    <aside className="socialobby-sidebar">
      <div className="sidebar-section navigation-section">
        <h3>Navigation</h3>
        <ul>
          {navItems.map(item => (
            <li key={item.view} onClick={() => handleNavClick(item.view)} className="nav-item">
              <span role="img" aria-label={item.name}>{item.icon}</span> {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Online Friends section removed */}

      <div className="sidebar-section your-shortcuts">
        <h3>Your Shortcuts</h3>
        <ul>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Art Community">🎨</span> Art Community</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Tech Talk">💻</span> Tech Talk</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Food Lovers">🍳</span> Food Lovers</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Fitness Friends">🏃</span> Fitness Friends</li>
          <li onClick={() => handleNavClick('groups')} className="shortcut-item"><span role="img" aria-label="Gaming Group">🎮</span> Gaming Group</li>
          <li onClick={() => handleNavClick('events')} className="shortcut-item"><span role="img" aria-label="Music Festival">🎵</span> Music Festival</li>
        </ul>
      </div>

      <div className="sidebar-section sponsored">
        <h3>Sponsored</h3>
        <div className="sponsored-item">
          <img src="https://picsum.photos/seed/sponsored1/80/60" alt="Sponsored" className="sponsored-image" />
          <div className="sponsored-content">
            <h4>Premium Features</h4>
            <p>Unlock advanced social features</p>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;