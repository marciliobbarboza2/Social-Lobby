import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import ChatWindow from './ChatWindow';

const ChatBar = () => {
  const { dataProps, chatProps } = useSocialLobbyContext();
  const { users } = dataProps;
  const { activeChats, minimizedChats, openChat, closeChat, toggleMinimize } = chatProps;

  // Get online users for chat suggestions
  const onlineUsers = users.filter(user => user.isOnline).slice(0, 5);

  return (
    <>
      {/* Chat Windows */}
      {activeChats.map((user, index) => (
        <ChatWindow
          key={user._id}
          friend={user}
          onClose={() => closeChat(user._id)}
          style={{
            right: `${20 + index * 330}px`,
            bottom: minimizedChats.has(user._id) ? '20px' : '20px'
          }}
          isMinimized={minimizedChats.has(user._id)}
          onMinimize={() => toggleMinimize(user._id)}
        />
      ))}

      {/* Chat Bar */}
      <div className="chat-bar">
        {/* Active Chat Icons */}
        {activeChats.map((user, index) => (
          <div
            key={`active-${user._id}`}
            className="chat-icon active"
            onClick={() => toggleMinimize(user._id)}
            style={{
              backgroundImage: `url(${user.avatar})`,
              right: `${20 + index * 60}px`
            }}
            title={user.name}
          >
            {!minimizedChats.has(user._id) && (
              <div className="chat-notification">•</div>
            )}
          </div>
        ))}

        {/* Messenger Icon */}
        <div className="chat-icon messenger" title="Messenger">
          <span>💬</span>
        </div>

        {/* Online Friends */}
        {onlineUsers.slice(0, 3).map((user, index) => (
          <div
            key={`online-${user._id}`}
            className="chat-icon online"
            onClick={() => openChat(user)}
            style={{
              backgroundImage: `url(${user.avatar})`,
              right: `${100 + index * 60}px`
            }}
            title={user.name}
          >
            <div className="online-indicator"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatBar;
