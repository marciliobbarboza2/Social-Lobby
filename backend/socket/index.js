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
      // Create a unique room for the conversation between sender and recipient
      const roomId = [data.senderId, data.recipientId].sort().join('-');

      // Join the room
      socket.join(roomId);

      // Emit to the specific room instead of broadcasting to all
      io.to(roomId).emit('chatMessage', {
        type: 'chatMessage',
        ...data,
        userId: socket.userId,
        timestamp: new Date()
      });

      logger.info(`Chat message sent from ${data.senderId} to ${data.recipientId} in room ${roomId}`);
    });
  });
};
