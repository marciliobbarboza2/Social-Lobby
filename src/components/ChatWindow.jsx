import React, { useState, useEffect } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const ChatWindow = ({ friend, onClose, style }) => {
  const { authProps, viewProps } = useSocialLobbyContext();
  const { currentUser } = authProps;
  const { wsMessages, sendMessage } = viewProps;
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);

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

  return (
    <div className={`chat-window ${isMinimized ? 'minimized' : ''}`} style={style}>
      <div className="chat-header" onClick={() => setIsMinimized(!isMinimized)}>
        <img src={friend.avatar} alt={friend.name} className="chat-avatar" />
        <h3>{friend.name}</h3>
        <button className="close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>×</button>
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
            <input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;