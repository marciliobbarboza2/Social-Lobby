import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const NotificationsPage = () => {
  const { dataProps, viewProps } = useSocialLobbyContext();
  const { notifications } = dataProps;
  const { setCurrentView } = viewProps;

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <img src={notification.avatar} alt={notification.from} className="notification-avatar" />
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              {notification.type === 'like' && (
                <button onClick={() => setCurrentView('feed')} className="view-post-btn">View Post</button>
              )}
              {notification.type === 'comment' && (
                <button onClick={() => setCurrentView('feed')} className="view-post-btn">View Comment</button>
              )}
              {notification.type === 'friend_request' && (
                <div className="friend-request-actions">
                  <button className="accept-btn">Accept</button>
                  <button className="decline-btn">Decline</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
