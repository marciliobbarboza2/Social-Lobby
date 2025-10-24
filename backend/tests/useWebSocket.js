import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * A custom hook to manage a WebSocket connection.
 * @param {string} token - The JWT for authentication.
 * @param {object} eventHandlers - An object with handlers for different message types.
 * @param {function} eventHandlers.onNewComment - (payload) => void
 * @param {function} eventHandlers.onNewPost - (payload) => void
 * @param {function} eventHandlers.onPostLiked - (payload) => void
 * @param {function} eventHandlers.onPostLikeNotification - (payload) => void
 * @param {function} eventHandlers.onNewCommentNotification - (payload) => void
 */
const useWebSocket = (token, eventHandlers = {}) => {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (!token) return;

    // Connect to WebSocket server with JWT for authentication
    ws.current = new WebSocket(`ws://localhost:5000?token=${token}`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      // Optional: implement reconnection logic here
    };

    ws.current.onmessage = (event) => {
      try {
        const { type, payload } = JSON.parse(event.data);
        console.log('Received WebSocket message:', { type, payload });

        // Use the provided handlers for specific event types
        switch (type) {
          case 'NEW_POST':
            eventHandlers.onNewPost?.(payload);
            break;
          case 'NEW_COMMENT':
            eventHandlers.onNewComment?.(payload);
            break;
          case 'POST_LIKED':
            eventHandlers.onPostLiked?.(payload);
            break;
          case 'POST_LIKE_NOTIFICATION':
            eventHandlers.onPostLikeNotification?.(payload);
            break;
          case 'NEW_COMMENT_NOTIFICATION':
            eventHandlers.onNewCommentNotification?.(payload);
            break;
          default:
            // Fallback for unhandled or generic messages
            setMessages(prev => [...prev, { type, payload }]);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [token, eventHandlers]);

  const sendMessage = useCallback((message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      // Optimistically add sent message to the local state
      setMessages(prev => [...prev, message]);
    } else {
      console.error('WebSocket is not connected.');
    }
  }, []);

  return { messages, sendMessage, isConnected };
};

export default useWebSocket;