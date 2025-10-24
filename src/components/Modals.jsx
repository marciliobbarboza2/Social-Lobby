import React from 'react';

const Modals = ({
  showLogin,
  setShowLogin,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  handleLogin,
  showProfile,
  setShowProfile,
  currentUser,
  handleDeleteAccount,
  showOtherProfile,
  setShowOtherProfile,
  otherUser,
  showNotifications,
  setShowNotifications,
  notifications,
  showGroups,
  setShowGroups,
  groups,
  handleJoinGroup,
  showChat,
  setShowChat,
  selectedFriend,
  chatMessages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  showStoryModal,
  setShowStoryModal,
  selectedStory,
}) => {
  return (
    <>
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="modal-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="modal-input"
            />
            <button className="modal-btn" onClick={handleLogin}>Login</button>
            <button className="modal-btn cancel" onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showProfile && currentUser && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Profile</h2>
            <div className="profile-header">
              <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
              <div>
                <h3>{currentUser.name}</h3>
                <p>@{currentUser.username}</p>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Bio:</strong> {currentUser.bio}</p>
              <p><strong>Address:</strong> {currentUser.address}</p>
              <p><strong>Phone:</strong> {currentUser.phone}</p>
              <p><strong>City:</strong> {currentUser.city}</p>
              <p><strong>Marital Status:</strong> {currentUser.maritalStatus}</p>
              <p><strong>Groups:</strong> {currentUser.groups.join(', ')}</p>
            </div>
            <div className="profile-actions">
              <button className="modal-btn" onClick={() => setShowProfile(false)}>Close</button>
              <button className="modal-btn delete" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
        </div>
      )}

      {showOtherProfile && otherUser && (
        <div className="modal-overlay" onClick={() => setShowOtherProfile(false)}>
          <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Profile</h2>
            <div className="profile-header">
              <img src={otherUser.avatar} alt={otherUser.name} className="profile-avatar" />
              <div>
                <h3>{otherUser.name}</h3>
                <p>@{otherUser.username}</p>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Email:</strong> {otherUser.email}</p>
              <p><strong>Bio:</strong> {otherUser.bio}</p>
              <p><strong>Address:</strong> {otherUser.address}</p>
              <p><strong>Phone:</strong> {otherUser.phone}</p>
              <p><strong>City:</strong> {otherUser.city}</p>
              <p><strong>Marital Status:</strong> {otherUser.maritalStatus}</p>
              <p><strong>Groups:</strong> {otherUser.groups.join(', ')}</p>
            </div>
            <button className="modal-btn" onClick={() => setShowOtherProfile(false)}>Close</button>
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="modal-overlay" onClick={() => setShowNotifications(false)}>
          <div className="modal notifications-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Notifications</h2>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              ))}
            </div>
            <button className="modal-btn" onClick={() => setShowNotifications(false)}>Close</button>
          </div>
        </div>
      )}

      {showGroups && (
        <div className="modal-overlay" onClick={() => setShowGroups(false)}>
          <div className="modal groups-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Groups</h2>
            <div className="groups-list">
              {groups.map(group => (
                <div key={group.id} className="group-item">
                  <img src={group.avatar} alt={group.name} className="group-avatar" />
                  <div className="group-info">
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <div className="group-stats">
                      <span>{group.members} members</span>
                      <span>{group.posts} posts</span>
                    </div>
                  </div>
                  <button
                    className={`join-btn ${group.joined ? 'joined' : ''}`}
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    {group.joined ? 'Leave' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
            <button className="modal-btn" onClick={() => setShowGroups(false)}>Close</button>
          </div>
        </div>
      )}

      {showChat && selectedFriend && (
        <div className="modal-overlay" onClick={() => setShowChat(false)}>
          <div className="modal chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <img src={selectedFriend.avatar} alt={selectedFriend.name} className="chat-avatar" />
              <h3>{selectedFriend.name}</h3>
              <span className="online-status">🟢 Online</span>
              <button className="close-btn" onClick={() => setShowChat(false)}>×</button>
            </div>
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className={`message ${message.sender === currentUser.name ? 'sent' : 'received'}`}>
                  <p>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="message-input"
              />
              <button className="send-btn" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}

      {showStoryModal && selectedStory && (
        <div className="modal-overlay" onClick={() => setShowStoryModal(false)}>
          <div className="modal story-modal" onClick={(e) => e.stopPropagation()}>
            <div className="story-view">
              <img src={selectedStory.image} alt="Story" className="story-image" />
              <div className="story-info">
                <img src={selectedStory.avatar} alt={selectedStory.author} className="story-author-avatar" />
                <span>{selectedStory.author}</span>
                <span>{selectedStory.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
