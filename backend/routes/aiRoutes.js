const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const aiService = require('../services/aiService');
const Task = require('../models/taskModel');

// @route   POST /api/ai/analyze-emotion
// @desc    Analyze emotion using AI
// @access  Private
router.post('/analyze-emotion', protect, async (req, res) => {
  try {
    const { emotionType, description } = req.body;
    
    if (!emotionType || !description) {
      return res.status(400).json({ message: 'Emotion type and description are required' });
    }
    
    const analysis = await aiService.analyzeEmotion(emotionType, description);
    res.json(analysis);
  } catch (error) {
    console.error('Error in AI emotion analysis route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/ai/generate-tasks
// @desc    Generate tasks using AI
// @access  Private
router.post('/generate-tasks', protect, async (req, res) => {
  try {
    const { emotionType, userContext } = req.body;
    
    if (!emotionType || !userContext) {
      return res.status(400).json({ message: 'Emotion type and user context are required' });
    }
    
    const tasks = await aiService.generateTasks(emotionType, userContext);
    
    // Save generated tasks to database
    const savedTasks = [];
    for (const task of tasks) {
      const newTask = await Task.create({
        user: req.user._id,
        description: task.description,
        emotion: emotionType,
        completed: false
      });
      savedTasks.push(newTask);
    }
    
    res.json(savedTasks);
  } catch (error) {
    console.error('Error in AI task generation route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/ai/youtube-suggestions
// @desc    Get YouTube video suggestions using AI
// @access  Private
router.post('/youtube-suggestions', protect, async (req, res) => {
  try {
    const { emotionType, description } = req.body;
    
    if (!emotionType) {
      return res.status(400).json({ message: 'Emotion type is required' });
    }
    
    // Generate search queries
    const queries = await aiService.generateYouTubeQueries(emotionType, description || '');
    
    // Search videos for each query
    const allVideos = [];
    for (const queryObj of queries) {
      const videos = await aiService.searchYouTube(queryObj.query);
      allVideos.push({
        query: queryObj.query,
        purpose: queryObj.purpose,
        videos
      });
    }
    
    res.json(allVideos);
  } catch (error) {
    console.error('Error in AI YouTube suggestions route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
