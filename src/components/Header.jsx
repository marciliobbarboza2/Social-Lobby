
import React, { useState, useRef, useEffect } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Header = () => {
  const { authProps, viewProps, dataProps } = useSocialLobbyContext();
  const { currentUser, handleLogout, isLoggedIn } = authProps;
  const { currentView, setCurrentView } = viewProps;
  const { setSelectedUser, notifications } = dataProps;

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // Could navigate to search results page
    }
  };

  return (
    <header className="socialobby-header">
      <div className="header-left">
        <h1 className="socialobby-logo" onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>
          <span className="logo-icon">🌐</span>
          <span className="logo-text">Socialobby</span>
        </h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Socialobby"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
      </div>
      <div className="header-center">
        <button className={`nav-btn ${currentView === 'feed' ? 'active' : ''}`} onClick={() => setCurrentView('feed')} title="Home">
          🏠
        </button>
        <button className={`nav-btn ${currentView === 'friends' ? 'active' : ''}`} onClick={() => setCurrentView('friends')} title="Friends">
          👥
        </button>
        <button className={`nav-btn ${currentView === 'watch' ? 'active' : ''}`} onClick={() => setCurrentView('feed')} title="Watch">
          📺
        </button>
        <button className={`nav-btn ${currentView === 'marketplace' ? 'active' : ''}`} onClick={() => setCurrentView('feed')} title="Marketplace">
          🛒
        </button>
        <button className={`nav-btn ${currentView === 'groups' ? 'active' : ''}`} onClick={() => setCurrentView('groups')} title="Groups">
          👪
        </button>
      </div>
      <div className="header-right">
        {currentView === 'profile' && (
          <button className="header-btn" onClick={() => setCurrentView('feed')}>← Back to Feed</button>
        )}
        {isLoggedIn ? (
          <>
            <button className="header-btn" onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); }} title="Profile">
              👤 Profile
            </button>

            {/* Notifications Dropdown */}
            <div className="dropdown-container" ref={notificationsRef}>
              <button
                className="header-btn notification-btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                title="Notifications"
              >
                🔔
                {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
              </button>

              {showNotifications && (
                <div className="dropdown-menu notifications-dropdown">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    <button onClick={() => setCurrentView('notifications')} className="see-all-btn">See All</button>
                  </div>
                  <div className="dropdown-content">
                    {notifications.map(notification => (
                      <div key={notification.id} className="notification-item" onClick={() => setCurrentView('notifications')}>
                        <img src={notification.avatar} alt="" className="notification-avatar" />
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings Dropdown */}
            <div className="dropdown-container" ref={settingsRef}>
              <button
                className="header-btn"
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowNotifications(false);
                }}
                title="Settings"
              >
                ⚙️
              </button>

              {showSettings && (
                <div className="dropdown-menu settings-dropdown">
                  <div className="dropdown-content">
                    <button onClick={() => { setCurrentView('settings'); setShowSettings(false); }} className="dropdown-item">
                      ⚙️ Settings & Privacy
                    </button>
                    <button onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); setShowSettings(false); }} className="dropdown-item">
                      👤 Profile
                    </button>
                    <button onClick={() => { setCurrentView('friends'); setShowSettings(false); }} className="dropdown-item">
                      👥 Friends
                    </button>
                    <button onClick={() => { setCurrentView('messages'); setShowSettings(false); }} className="dropdown-item">
                      💬 Messenger
                    </button>
                    <div className="dropdown-divider"></div>
                    <button onClick={() => { alert('Help & Support clicked'); }} className="dropdown-item">
                      ❓ Help & Support
                    </button>
                    <button onClick={() => { alert('Display & Accessibility clicked'); }} className="dropdown-item">
                      🌙 Display & Accessibility
                    </button>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <span className="user-info" onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); }}>
              <img src={currentUser.avatar} alt={currentUser.name} className="header-avatar" />
              <span className="user-name">{currentUser.firstName || currentUser.name}</span>
            </span>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
