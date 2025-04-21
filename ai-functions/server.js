const express = require('express');
const { analyzeEmotion } = require('./emotionAnalysis');
const { generateTasks } = require('./taskGenerator');
const { generateYouTubeQueries, searchYouTubeVideos } = require('./youtubeSearchGenerator');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

// AI Emotion Analysis endpoint
app.post('/api/analyze-emotion', async (req, res) => {
  try {
    const { emotionType, description } = req.body;
    
    if (!emotionType || !description) {
      return res.status(400).json({ message: 'Emotion type and description are required' });
    }
    
    const analysis = await analyzeEmotion(emotionType, description);
    res.json(analysis);
  } catch (error) {
    console.error('Error in emotion analysis endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// AI Task Generation endpoint
app.post('/api/generate-tasks', async (req, res) => {
  try {
    const { emotionType, userContext } = req.body;
    
    if (!emotionType || !userContext) {
      return res.status(400).json({ message: 'Emotion type and user context are required' });
    }
    
    const tasks = await generateTasks(emotionType, userContext);
    res.json(tasks);
  } catch (error) {
    console.error('Error in task generation endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// YouTube Search Query Generation endpoint
app.post('/api/generate-youtube-queries', async (req, res) => {
  try {
    const { emotionType, description } = req.body;
    
    if (!emotionType) {
      return res.status(400).json({ message: 'Emotion type is required' });
    }
    
    const queries = await generateYouTubeQueries(emotionType, description || '');
    res.json(queries);
  } catch (error) {
    console.error('Error in YouTube query generation endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// YouTube Video Search endpoint
app.post('/api/search-youtube', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const videos = await searchYouTubeVideos(query);
    res.json(videos);
  } catch (error) {
    console.error('Error in YouTube search endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`AI Functions server running on port ${PORT}`);
});

module.exports = app;
