import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const LeftSidebar = () => {
  const { viewProps } = useSocialLobbyContext();
  const { setCurrentView } = viewProps;

  const navItems = [
    { name: 'Feed', icon: '📰', view: 'feed' },
    { name: 'Friends', icon: '🧑‍🤝‍🧑', view: 'friends' },
    { name: 'Messages', icon: '💬', view: 'messages' },
    { name: 'Events', icon: '📅', view: 'events' },
    { name: 'Groups', icon: '🏢', view: 'pages' }, // 'pages' view seems to show groups
    { name: 'Photos', icon: '🖼️', view: 'photos' },
  ];

  const handleNavClick = (view) => {
    setCurrentView(view);
  };

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
      <div className="sidebar-section your-shortcuts">
        <h3>Your Shortcuts</h3>
        <ul>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Tech Innovators">🚀</span> Tech Innovators</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Travel Enthusiasts">✈️</span> Travel Enthusiasts</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Food Lovers">🍔</span> Food Lovers</li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;