import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

const useWebSocket = (token) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const sendMessage = useCallback((message) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('chatMessage', message);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const socket = io('http://localhost:5000', {
      query: { token },
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      setIsConnected(true);
    });

    socket.on('chatMessage', (data) => {
      console.log('Received chat message:', data);
      setMessages(prev => {
        // Avoid duplicates by checking if message already exists
        const exists = prev.some(msg =>
          msg.timestamp === data.timestamp &&
          msg.senderId === data.senderId &&
          msg.text === data.text
        );
        if (!exists) {
          return [...prev, data];
        }
        return prev;
      });
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return { messages, sendMessage, isConnected };
};

export default useWebSocket;
