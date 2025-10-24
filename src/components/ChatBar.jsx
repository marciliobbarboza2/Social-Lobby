import React from 'react';
import ChatWindow from './ChatWindow';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const ChatBar = () => {
  const { viewProps } = useSocialLobbyContext();
  const { openChats, closeChatWindow } = viewProps;

  return (
    <div className="chat-bar">
      {openChats.map((friend, index) => (
        <ChatWindow key={friend._id} friend={friend} onClose={() => closeChatWindow(friend._id)} style={{ right: `${index * 320 + 20}px` }} />
      ))}
    </div>
  );
};

export default ChatBar;