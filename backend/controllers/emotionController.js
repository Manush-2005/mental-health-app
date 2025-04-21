const Emotion = require('../models/emotionModel');
const Context = require('../models/contextModel');

// Record a new emotion
const recordEmotion = async (req, res) => {
  const { type, description } = req.body;
  
  try {
    const emotion = await Emotion.create({
      user: req.user._id,
      type,
      description
    });
    
    res.status(201).json(emotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's emotions
const getUserEmotions = async (req, res) => {
  try {
    const emotions = await Emotion.find({ user: req.user._id }).sort({ date: -1 });
    res.json(emotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save user context
const saveUserContext = async (req, res) => {
  const { typicalDay, emotionTriggers, likesDislikes, calmingActivities } = req.body;
  
  try {
    // Check if context already exists for user
    let context = await Context.findOne({ user: req.user._id });
    
    if (context) {
      // Update existing context
      context.typicalDay = typicalDay || context.typicalDay;
      context.emotionTriggers = emotionTriggers || context.emotionTriggers;
      context.likesDislikes = likesDislikes || context.likesDislikes;
      context.calmingActivities = calmingActivities || context.calmingActivities;
      
      await context.save();
    } else {
      // Create new context
      context = await Context.create({
        user: req.user._id,
        typicalDay,
        emotionTriggers,
        likesDislikes,
        calmingActivities
      });
    }
    
    res.status(201).json(context);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user context
const getUserContext = async (req, res) => {
  try {
    const context = await Context.findOne({ user: req.user._id });
    
    if (context) {
      res.json(context);
    } else {
      res.status(404).json({ message: 'Context not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { recordEmotion, getUserEmotions, saveUserContext, getUserContext };
