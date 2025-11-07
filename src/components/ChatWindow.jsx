import React, { useState, useEffect, useRef } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const ChatWindow = ({ friend, onClose, style }) => {
  const { authProps, chatProps } = useSocialLobbyContext();
  const { currentUser } = authProps;
  const { wsMessages, sendMessage, typingFrom, emitTyping, onlineUsers } = chatProps;
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const typingTimeoutRef = useRef(null);

  // Check if friend is online
  const isOnline = onlineUsers && onlineUsers.includes(friend._id);

  useEffect(() => {
    // Filter messages for this specific chat window
    const relevantMessages = wsMessages.filter(
      (msg) => (msg.senderId === currentUser._id && msg.recipientId === friend._id) || (msg.senderId === friend._id && msg.recipientId === currentUser._id)
    );
    setLocalMessages(relevantMessages);
  }, [wsMessages, currentUser._id, friend._id]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      senderId: currentUser._id,
      recipientId: friend._id,
      text: newMessage,
      time: new Date().toLocaleTimeString(),
      // Add sender/recipient names for display purposes
      senderName: currentUser.name,
      recipientName: friend.name,
    };
    sendMessage(message);
    setNewMessage('');
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    emitTyping({ senderId: currentUser._id, recipientId: friend._id });
    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null; // will auto-clear on hook side
    }, 1500);
  };

  return (
    <div className={`chat-window ${isMinimized ? 'minimized' : ''}`} style={style} role="dialog" aria-label={`Chat with ${friend.name}`}>
      <div 
        className="chat-header" 
        onClick={() => setIsMinimized(!isMinimized)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && setIsMinimized(!isMinimized)}
        aria-label={isMinimized ? 'Expand chat window' : 'Minimize chat window'}
      >
        <div className="chat-avatar-container">
          <img src={friend.avatar} alt={`${friend.name}'s avatar`} className="chat-avatar" />
          {isOnline && <div className="online-indicator-chat" aria-label="Online"></div>}
        </div>
        <h3>{friend.name}</h3>
        <button 
          className="close-btn" 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close chat"
        >
          ×
        </button>
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
              onChange={handleChange} 
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              aria-label="Type your message"
            />
            <button 
              onClick={handleSendMessage}
              aria-label="Send message"
            >
              Send
            </button>
            {typingFrom && typingFrom.senderId === friend._id && typingFrom.recipientId === currentUser._id && (
              <div className="typing-indicator" aria-live="polite">{friend.name} is typing...</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;