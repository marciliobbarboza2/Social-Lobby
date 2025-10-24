import React, { useState, useEffect } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import ChatWindow from './ChatWindow';

const ChatBar = () => {
  const { dataProps, viewProps } = useSocialLobbyContext();
  const { users } = dataProps;
  const { handleOpenChat } = viewProps;

  const [activeChats, setActiveChats] = useState([]);
  const [minimizedChats, setMinimizedChats] = useState(new Set());

  // Get online users for chat suggestions
  const onlineUsers = users.filter(user => user.isOnline).slice(0, 5);

  const openChat = (user) => {
    if (!activeChats.find(chat => chat._id === user._id)) {
      setActiveChats(prev => [...prev, user]);
    }
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      newSet.delete(user._id);
      return newSet;
    });
  };

  const closeChat = (userId) => {
    setActiveChats(prev => prev.filter(chat => chat._id !== userId));
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  };

  const toggleMinimize = (userId) => {
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

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
