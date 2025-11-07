const socketIo = require('socket.io');

module.exports = function(server) {
  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  // Store user socket connections
  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;
    if (userId) {
      connectedUsers.set(userId, socket.id);
      socket.join(userId); // Join a room with their user ID
      
      // Update user's online status
      io.emit('user-status', { userId, status: 'online' });
    }

    // Handle joining a chat
    socket.on('join-chat', ({ userId, contactId }) => {
      const chatRoom = [userId, contactId].sort().join('-');
      socket.join(chatRoom);
    });

    // Handle sending messages
    socket.on('send-message', async (messageData) => {
      const { senderId, receiverId, content, timestamp } = messageData;
      const chatRoom = [senderId, receiverId].sort().join('-');
      
      try {
        // Save message to database using Message model
        const message = new Message({
          senderId,
          receiverId,
          content,
          timestamp
        });
        await message.save();

        // Emit to the chat room
        io.to(chatRoom).emit('receive-message', message);
        
        // Send notification to receiver if they're not in the chat room
        const receiverSocket = connectedUsers.get(receiverId);
        if (receiverSocket) {
          io.to(receiverSocket).emit('new-message-notification', {
            senderId,
            message: content
          });
        }
      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('message-error', { error: 'Failed to send message' });
      }
    });

    // Handle typing status
    socket.on('typing', ({ senderId, receiverId, isTyping }) => {
      const chatRoom = [senderId, receiverId].sort().join('-');
      socket.to(chatRoom).emit('typing-status', { userId: senderId, isTyping });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      if (userId) {
        connectedUsers.delete(userId);
        io.emit('user-status', { userId, status: 'offline' });
      }
    });
  });

  return io;
};