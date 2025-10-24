import { useState, useEffect, useRef, useCallback } from 'react';

const useWebSocket = (token, eventHandlers) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  const sendMessage = useCallback((message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const wsUrl = `ws://localhost:5000?token=${token}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type) {
          // Handle event types
          switch (data.type) {
            case 'NEW_COMMENT':
              if (eventHandlers.onNewComment) eventHandlers.onNewComment(data.payload);
              break;
            case 'NEW_POST':
              if (eventHandlers.onNewPost) eventHandlers.onNewPost(data.payload);
              break;
            case 'POST_LIKED':
              if (eventHandlers.onPostLiked) eventHandlers.onPostLiked(data.payload);
              break;
            case 'POST_LIKE_NOTIFICATION':
              if (eventHandlers.onPostLikeNotification) eventHandlers.onPostLikeNotification(data.payload);
              break;
            case 'NEW_COMMENT_NOTIFICATION':
              if (eventHandlers.onNewCommentNotification) eventHandlers.onNewCommentNotification(data.payload);
              break;
            default:
              // For chat messages or other, add to messages
              setMessages(prev => [...prev, data]);
              break;
          }
        } else {
          // Assume it's a chat message
          setMessages(prev => [...prev, data]);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [token, eventHandlers]);

  return { messages, sendMessage, isConnected };
};

export default useWebSocket;
