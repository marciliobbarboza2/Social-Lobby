const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

// Simple in-memory map of userId -> Set of sockets (supports multi-tab)
const userSockets = new Map();

module.exports = (io) => {
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    // Authenticate socket connection
    const token = socket.handshake.query.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        logger.info(`Socket authenticated for user: ${decoded.id}`);
        const existing = userSockets.get(decoded.id) || new Set();
        existing.add(socket.id);
        userSockets.set(decoded.id, existing);
      } catch (error) {
        logger.error('Socket authentication failed:', error);
        socket.disconnect();
        return;
      }
    } else {
      logger.error('No token provided for socket connection');
      socket.disconnect();
      return;
    }

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
      if (socket.userId && userSockets.has(socket.userId)) {
        const set = userSockets.get(socket.userId);
        set.delete(socket.id);
        if (set.size === 0) userSockets.delete(socket.userId);
      }
    });

    // Handle chat messages
    socket.on('chatMessage', (data) => {
      // Expect data to have senderId, recipientId, text, time
      const payload = {
        ...data,
        userId: socket.userId,
        timestamp: new Date()
      };

      // Target recipient if provided, else broadcast
      if (data.recipientId && userSockets.has(data.recipientId)) {
        const recipientSockets = userSockets.get(data.recipientId);
        recipientSockets.forEach(id => io.to(id).emit('chatMessage', payload));
      }
      // Always echo back to sender's sockets
      const senderSockets = userSockets.get(socket.userId) || [];
      senderSockets.forEach(id => io.to(id).emit('chatMessage', payload));
    });

    // Typing indicator events
    socket.on('typing', (data) => {
      // data: { senderId, recipientId }
      if (!data || !data.senderId || !data.recipientId) return;
      const payload = { ...data, timestamp: Date.now() };
      // Send to recipient only
      if (userSockets.has(data.recipientId)) {
        userSockets.get(data.recipientId).forEach(id => io.to(id).emit('typing', payload));
      }
    });
  });
};
