const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

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
    });

    // Handle chat messages
    socket.on('chatMessage', (data) => {
      // Broadcast to all connected clients (for now)
      // In a real app, you'd want to send to specific rooms/channels
      io.emit('chatMessage', {
        ...data,
        userId: socket.userId,
        timestamp: new Date()
      });
    });
  });
};
