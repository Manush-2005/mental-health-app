const express = require('express');
const axios = require('axios');

// Create a service to connect the backend with AI functions
const aiService = {
  // Analyze emotion using AI
  async analyzeEmotion(emotionType, description) {
    try {
      const response = await axios.post('http://localhost:5001/api/analyze-emotion', {
        emotionType,
        description
      });
      return response.data;
    } catch (error) {
      console.error('Error calling AI emotion analysis:', error);
      throw new Error('Failed to analyze emotion');
    }
  },

  // Generate personalized tasks using AI
  async generateTasks(emotionType, userContext) {
    try {
      const response = await axios.post('http://localhost:5001/api/generate-tasks', {
        emotionType,
        userContext
      });
      return response.data;
    } catch (error) {
      console.error('Error calling AI task generation:', error);
      throw new Error('Failed to generate tasks');
    }
  },

  // Generate YouTube search queries using AI
  async generateYouTubeQueries(emotionType, description) {
    try {
      const response = await axios.post('http://localhost:5001/api/generate-youtube-queries', {
        emotionType,
        description
      });
      return response.data;
    } catch (error) {
      console.error('Error calling AI YouTube query generation:', error);
      throw new Error('Failed to generate YouTube queries');
    }
  },

  // Search YouTube videos
  async searchYouTube(query) {
    try {
      const response = await axios.post('http://localhost:5001/api/search-youtube', {
        query
      });
      return response.data;
    } catch (error) {
      console.error('Error calling YouTube search:', error);
      throw new Error('Failed to search YouTube videos');
    }
  }
};

module.exports = aiService;
