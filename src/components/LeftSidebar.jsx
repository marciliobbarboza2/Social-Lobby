import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const LeftSidebar = () => {
  const { viewProps, authProps } = useSocialLobbyContext();
  const { setCurrentView } = viewProps;
  const { handleLogout } = authProps;

  const navItems = [
    { name: 'Feed', icon: '🏠', view: 'feed' },
    { name: 'Friends', icon: '👥', view: 'friends' },
    { name: 'Messages', icon: '💬', view: 'messages' },
    { name: 'Photos', icon: '📷', view: 'photos' },
    { name: 'Events', icon: '📅', view: 'events' },
    { name: 'Groups', icon: '👪', view: 'groups' },
    { name: 'Pages', icon: '📰', view: 'pages' },
    { name: 'Notifications', icon: '🔔', view: 'notifications' },
    { name: 'Settings', icon: '⚙️', view: 'settings' },
  ];

  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleLogout();
    }
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
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Art Community">🎨</span> Art Community</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Tech Talk">💻</span> Tech Talk</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Food Lovers">🍳</span> Food Lovers</li>
          <li onClick={() => handleNavClick('pages')} className="shortcut-item"><span role="img" aria-label="Fitness Friends">🏃</span> Fitness Friends</li>
          <li onClick={() => handleNavClick('groups')} className="shortcut-item"><span role="img" aria-label="Gaming Group">🎮</span> Gaming Group</li>
          <li onClick={() => handleNavClick('events')} className="shortcut-item"><span role="img" aria-label="Music Festival">🎵</span> Music Festival</li>
        </ul>
      </div>


    </aside>
  );
};

export default LeftSidebar;