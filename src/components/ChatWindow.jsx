import React, { useState, useEffect } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const ChatWindow = ({ friend, onClose, style }) => {
  const { authProps, chatProps } = useSocialLobbyContext();
  const { currentUser } = authProps;
  const { wsMessages, sendMessage } = chatProps;
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);

  useEffect(() => {
    // Filter messages for this specific chat window
    if (wsMessages && Array.isArray(wsMessages)) {
      const relevantMessages = wsMessages.filter(
        (msg) => (msg.senderId === currentUser._id && msg.recipientId === friend._id) || (msg.senderId === friend._id && msg.recipientId === currentUser._id)
      );
      setLocalMessages(relevantMessages);
    }
  }, [wsMessages, currentUser._id, friend._id]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      type: 'chatMessage',
      senderId: currentUser._id,
      recipientId: friend._id,
      text: newMessage,
      time: new Date().toLocaleTimeString(),
      // Add sender/recipient names for display purposes
      senderName: currentUser.firstName + ' ' + currentUser.lastName,
      recipientName: friend.firstName + ' ' + friend.lastName,
    };
    sendMessage(message);
    setNewMessage('');
  };

  return (
    <div className={`chat-window ${isMinimized ? 'minimized' : ''}`} style={style}>
      <div
        className="chat-header"
        role="button"
        tabIndex={0}
        onClick={() => setIsMinimized(!isMinimized)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsMinimized(!isMinimized); }}
        aria-label={isMinimized ? `Expand chat with ${friend.name}` : `Minimize chat with ${friend.name}`}
      >
        <img src={friend.avatar} alt={friend.name} className="chat-avatar" />
        <h3>{friend.name}</h3>
        <button type="button" className="close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close chat">×</button>
      </div>
      {!isMinimized && (
        <>
          <div className="chat-messages">
            {localMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.senderId === currentUser._id ? 'sent' : 'received'}`}>
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              aria-label="Type a message"
            />
            <button type="button" className="send-button" onClick={handleSendMessage} aria-label="Send message">Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;