import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Friends = () => {
  const { dataProps, authProps } = useSocialLobbyContext();
  const { users } = dataProps;
  const { currentUser } = authProps;

  const friends = users.filter(user => user._id !== currentUser?._id);

  return (
    <div className="friends-page">
      <div className="page-header">
        <h1>👥 Friends</h1>
        <p>Manage your connections and discover new people</p>
      </div>

      <div className="friends-tabs">
        <button className="tab-btn active">All Friends ({friends.length})</button>
        <button className="tab-btn">Friend Requests</button>
        <button className="tab-btn">Suggestions</button>
      </div>

      <div className="friends-grid">
        {friends.map(friend => (
          <div key={friend._id} className="friend-card">
            <div className="friend-cover" style={{
              background: `url(${friend.coverPhoto || 'https://picsum.photos/300/100'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div className="friend-info">
              <img 
                src={friend.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=random`} 
                alt={friend.name}
                className="friend-avatar"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2563eb&color=fff`;
                }}
              />
              <h3>{friend.name}</h3>
              <p className="friend-bio">{friend.bio || friend.profession || 'Member'}</p>
              <p className="friend-location">📍 {friend.location || friend.city || 'Unknown'}</p>
              <div className="friend-actions">
                <button className="btn-primary">💬 Message</button>
                <button className="btn-secondary">👤 View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
