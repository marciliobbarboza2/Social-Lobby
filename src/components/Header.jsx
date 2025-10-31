
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
    <header className="facebook-header">
      <div className="header-left">
        <h1 className="facebook-logo" onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>
          <span className="logo-icon">f</span>
        </h1>
        <div className="search-bar">
          <input type="text" placeholder="Search Facebook" className="search-input" />
        </div>
      </div>
      <div className="header-center">
        <button className={`nav-btn ${currentView === 'feed' ? 'active' : ''}`} onClick={() => setCurrentView('feed')}>
          🏠
        </button>
        <button className={`nav-btn ${currentView === 'friends' ? 'active' : ''}`} onClick={() => setCurrentView('friends')}>
          👥
        </button>
        <button className={`nav-btn ${currentView === 'watch' ? 'active' : ''}`} onClick={() => setCurrentView('feed')}>
          📺
        </button>
        <button className={`nav-btn ${currentView === 'marketplace' ? 'active' : ''}`} onClick={() => setCurrentView('feed')}>
          🛒
        </button>
        <button className={`nav-btn ${currentView === 'groups' ? 'active' : ''}`} onClick={() => setCurrentView('groups')}>
          👪
        </button>
      </div>
      <div className="header-right">
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
    </header>
  );
};

export default Header;
