const Message = require('../models/messageModel');

// Post a new message
const postMessage = async (req, res) => {
  const { text, emotionGroup } = req.body;
  
  try {
    const message = await Message.create({
      user: req.user._id,
      username: req.user.name.split(' ')[0] + '_' + Math.floor(1000 + Math.random() * 9000), // Anonymous username
      text,
      emotionGroup
    });
    
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages for an emotion group
const getGroupMessages = async (req, res) => {
  const { emotionGroup } = req.params;
  
  try {
    const messages = await Message.find({ emotionGroup })
      .sort({ timestamp: 1 })
      .limit(50); // Limit to last 50 messages
    
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get active users count for each emotion group
const getActiveUserCounts = async (req, res) => {
  try {
    // This would be more complex in a real app with actual online status tracking
    // For now, we'll return mock data
    const activeUsers = {
      anxiety: 24,
      sadness: 18,
      loneliness: 15,
      anger: 12,
      stress: 27,
      fear: 9
    };
    
    res.json(activeUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { postMessage, getGroupMessages, getActiveUserCounts };
