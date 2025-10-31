
import React, { useState } from 'react';

const Header = ({
  currentUser,
  handleLogout,
  setShowNotifications,
  setCurrentView,
  setSelectedUser,
  isLoggedIn,
  currentView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, just log the search query. In a real app, this would search users/posts
      console.log('Searching for:', searchQuery);
      // You could implement search functionality here
      // setCurrentView('search');
      // setSearchResults(searchQuery);
    }
  };

  return (
    <header className="socialobby-header">
      <div className="header-content">
        <h1 className="socialobby-logo" onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>
          <span className="logo-icon">🌐</span>
          Socialobby
        </h1>
        {isLoggedIn && (
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search users, posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </form>
          </div>
        )}
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
