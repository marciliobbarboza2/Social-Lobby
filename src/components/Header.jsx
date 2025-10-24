
import React from 'react';

const Header = ({
  currentUser,
  handleLogout,
  setShowNotifications,
  setCurrentView,
  setSelectedUser,
  isLoggedIn,
  currentView,
}) => {
  return (
    <header className="socialobby-header">
      <div className="header-content">
        <h1 className="socialobby-logo" onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>
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
              <span className="user-info">
                <img src={currentUser.avatar} alt={currentUser.name} className="header-avatar" />
                {currentUser.name}
              </span>
              <button className="header-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : null}
          <button className="header-btn">⚙️ Settings</button>
          <button className="header-btn" onClick={() => setShowNotifications(true)}>🔔 Notifications</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
