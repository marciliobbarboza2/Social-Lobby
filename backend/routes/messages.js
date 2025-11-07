const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get conversation history with another user
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user.id }
      ]
    })
    .sort({ timestamp: -1 })
    .limit(50)
    .exec();

    res.json(messages.reverse());
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server Error');
  }
});

// Send a new message
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    
    const message = new Message({
      senderId: req.user.id,
      receiverId,
      content
    });

    await message.save();
    
    // Emit to socket if needed
    // req.app.get('io').to(receiverId).emit('new-message', message);
    
    res.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Server Error');
  }
});

// Mark messages as read
router.put('/read/:userId', auth, async (req, res) => {
  try {
    await Message.updateMany(
      {
        senderId: req.params.userId,
        receiverId: req.user.id,
        read: false
      },
      {
        $set: { read: true }
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;