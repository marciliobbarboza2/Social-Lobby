import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

// Socket.IO-based chat hook to match backend server
const useWebSocket = (token) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingFrom, setTypingFrom] = useState(null); // { senderId, recipientId, timestamp }
  const [onlineUsers, setOnlineUsers] = useState([]); // Array of online user IDs
  const socketRef = useRef(null);

  const sendMessage = useCallback((message) => {
    if (socketRef.current) {
      socketRef.current.emit('chatMessage', message);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
      query: { token }
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('chatMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('onlineUsers', (userIds) => {
      setOnlineUsers(userIds);
    });

    socket.on('typing', (data) => {
      setTypingFrom(data);
      // auto-clear after 3s if no further typing
      setTimeout(() => {
        setTypingFrom((curr) => (curr && curr.senderId === data.senderId ? null : curr));
      }, 3000);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connect_error:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const emitTyping = useCallback((payload) => {
    if (socketRef.current) {
      socketRef.current.emit('typing', payload);
    }
  }, []);

  return { messages, sendMessage, isConnected, typingFrom, emitTyping, onlineUsers };
};

export default useWebSocket;
