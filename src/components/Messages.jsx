import React, { useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Messages = () => {
  const { dataProps, authProps } = useSocialLobbyContext();
  const { users } = dataProps;
  const { currentUser } = authProps;

  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({});

  const chatUsers = users.filter(user => user._id !== currentUser?._id);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: currentUser._id,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat._id]: [...(prev[selectedChat._id] || []), newMessage],
    }));

    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className="messenger-window minimized">
        <div className="messenger-header" onClick={() => setIsMinimized(false)}>
          <span className="messenger-icon">💬</span>
          <span className="messenger-title">Messenger</span>
          <span className="minimize-icon">▲</span>
        </div>
      </div>
    );
  }

  return (
    <div className="messenger-window">
      <div className="messenger-header" onClick={() => setIsMinimized(true)}>
        <span className="messenger-icon">💬</span>
        <span className="messenger-title">Messenger</span>
        <div className="messenger-controls">
          <button className="control-btn" onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}>−</button>
          <button className="control-btn" onClick={(e) => { e.stopPropagation(); /* close logic */ }}>×</button>
        </div>
      </div>
      <div className="messenger-content">
        {!selectedChat ? (
          <div className="chat-list">
            {chatUsers.map(user => (
              <div
                key={user._id}
                className="chat-item"
                onClick={() => setSelectedChat(user)}
              >
                <img src={user.avatar} alt={user.name} className="chat-avatar" />
                <div className="chat-info">
                  <div className="chat-name">{user.name}</div>
                  <div className="chat-last-message">
                    {messages[user._id]?.length > 0
                      ? messages[user._id][messages[user._id].length - 1].text
                      : 'Start a conversation...'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="chat-header">
              <img src={selectedChat.avatar} alt={selectedChat.name} className="chat-header-avatar" />
              <div className="chat-header-info">
                <div className="chat-header-name">{selectedChat.name}</div>
                <div className="chat-header-status">Active now</div>
              </div>
              <button className="control-btn" onClick={() => setSelectedChat(null)}>←</button>
            </div>
            <div className="messages-list">
              {(messages[selectedChat._id] || []).map(message => (
                <div
                  key={message.id}
                  className={`message ${message.sender === currentUser._id ? 'sent' : 'received'}`}
                >
                  <div className="message-content">{message.text}</div>
                  <div className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
            <div className="message-input-container">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="message-input"
              />
              <button onClick={handleSendMessage} className="send-button">→</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
