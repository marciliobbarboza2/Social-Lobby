
import React from 'react';

const Header = ({
  currentUser,
  handleLogout,
  setShowNotifications,
  setCurrentView,
  setSelectedUser,
  isLoggedIn,
  currentView,
  setShowLogin,
}) => {
  return (
    <header className="socialobby-header">
      <div className="header-content">
        <h1
          className="socialobby-logo"
          onClick={() => setCurrentView('feed')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCurrentView('feed'); }}
          style={{ cursor: 'pointer' }}
          aria-label="Go to feed"
        >
          <span className="logo-icon">🌐</span>
          Sociallobby
        </h1>
        <div className="header-actions">
          {currentView === 'profile' && (
            <button className="header-btn" onClick={() => setCurrentView('feed')}>← Back to Feed</button>
          )}
          {isLoggedIn ? (
            <>
              <button className="header-btn" onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); }}>👤 Profile</button>
              <button
                className="user-info"
                type="button"
                onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); }}
                aria-label="Open profile"
              >
                <img src={currentUser?.avatar} alt={currentUser?.name || 'Profile'} className="header-avatar" />
                {currentUser?.name}
              </button>
              <button className="header-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="header-btn" onClick={() => setShowLogin(true)}>Login</button>
          )}
          <button type="button" className="header-btn" aria-label="Settings">⚙️ Settings</button>
          <button type="button" className="header-btn" onClick={() => setShowNotifications(true)} aria-label="Notifications">🔔 Notifications</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
