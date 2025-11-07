
import React, { useState, useRef, useEffect } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import { 
  FaSearch, 
  FaHome, 
  FaUserFriends, 
  FaBell, 
  FaEnvelope, 
  FaCog, 
  FaSignOutAlt,
  FaUser,
  FaVideo
} from 'react-icons/fa';
import './Header.css';

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
        <h1 className="socialobby-logo" onClick={() => setCurrentView('feed')}>
          <span className="logo-icon">🌐</span>
          <span className="logo-text">Socialobby</span>
        </h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Socialobby"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(e); }}
            aria-label="Search Socialobby"
          />
        </div>
      </div>
      <div className="header-center">
        <button type="button" className={`nav-btn ${currentView === 'feed' ? 'active' : ''}`} onClick={() => setCurrentView('feed')} title="Home" aria-label="Home">
          <FaHome size={24} />
        </button>
        <button type="button" className={`nav-btn ${currentView === 'friends' ? 'active' : ''}`} onClick={() => setCurrentView('friends')} title="Friends" aria-label="Friends">
          <FaUserFriends size={24} />
        </button>
        <button type="button" className={`nav-btn ${currentView === 'watch' ? 'active' : ''}`} onClick={() => setCurrentView('watch')} title="Watch" aria-label="Watch">
          <FaVideo size={24} />
        </button>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <>
            {/* Notifications Dropdown */}
            <div className="dropdown-container" ref={notificationsRef}>
              <button
                type="button"
                className="header-btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                title="Notifications"
                aria-haspopup="true"
                aria-expanded={showNotifications}
                aria-label="Notifications"
              >
                <FaBell size={20} />
                {notifications?.length > 0 && <span className="notification-badge">{notifications.length}</span>}
              </button>

              {showNotifications && (
                <div className="dropdown-menu notifications-dropdown" role="menu">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    <button type="button" onClick={() => setCurrentView('notifications')} className="see-all-btn">See All</button>
                  </div>
                  <div className="dropdown-content">
                    {notifications?.map(notification => (
                      <div
                        key={notification.id}
                        className="notification-item"
                        onClick={() => setCurrentView('notifications')}
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') setCurrentView('notifications'); }}
                      >
                        <div className="notification-icon">
                          <FaBell size={20} />
                        </div>
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

            {/* Messages */}
            <button type="button" className="header-btn" onClick={() => setCurrentView('messages')} title="Messages" aria-label="Messages">
              <FaEnvelope size={20} />
            </button>

            {/* Settings Dropdown */}
            <div className="dropdown-container" ref={settingsRef}>
              <button
                type="button"
                className="header-btn"
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowNotifications(false);
                }}
                title="Settings"
                aria-haspopup="true"
                aria-expanded={showSettings}
                aria-label="Settings"
              >
                <FaCog size={20} />
              </button>

              {showSettings && (
                <div className="dropdown-menu settings-dropdown" role="menu">
                  <div className="dropdown-header">
                    <h4>Settings</h4>
                  </div>
                  <div className="dropdown-content">
                    <button type="button" onClick={() => { setCurrentView('settings'); setShowSettings(false); }} className="dropdown-item" role="menuitem" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { setCurrentView('settings'); setShowSettings(false); } }}>
                      <FaCog size={20} />
                      <span>Settings & Privacy</span>
                    </button>
                    <button type="button" onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); setShowSettings(false); }} className="dropdown-item" role="menuitem" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedUser(currentUser); setCurrentView('profile'); setShowSettings(false); } }}>
                      <FaUser size={20} />
                      <span>Profile</span>
                    </button>
                    <button type="button" onClick={() => { setCurrentView('friends'); setShowSettings(false); }} className="dropdown-item" role="menuitem" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { setCurrentView('friends'); setShowSettings(false); } }}>
                      <FaUserFriends size={20} />
                      <span>Friends</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button type="button" onClick={handleLogout} className="dropdown-item logout-item" role="menuitem" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleLogout(); }}>
                      <FaSignOutAlt size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              className="user-info"
              onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); }}
              type="button"
              aria-label="Open profile"
            >
              <img src={currentUser?.avatar} alt={currentUser?.name || 'Profile'} className="header-avatar" />
              <span className="user-name">{currentUser?.firstName || currentUser?.name}</span>
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
