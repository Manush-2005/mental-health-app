const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Generate YouTube search queries based on user's emotion
 * @param {string} emotionType - Type of emotion (anxiety, sadness, etc.)
 * @param {string} description - User's description of their emotion
 * @returns {Promise<Array>} - List of search queries for YouTube
 */
async function generateYouTubeQueries(emotionType, description) {
  try {
    const prompt = `
      As a mental health assistant, generate 3 specific YouTube search queries for someone experiencing ${emotionType}.
      
      Their description: "${description}"
      
      The queries should:
      1. Focus on helpful, educational content about managing this emotion
      2. Include a mix of coping strategies, expert advice, and mindfulness techniques
      3. Be specific enough to return relevant results (e.g., "5-minute anxiety relief breathing techniques" rather than just "anxiety")
      
      Format the response as a JSON array of query objects with keys:
      - query (string)
      - purpose (string explaining why this query would be helpful)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse JSON from AI response');
    }
  } catch (error) {
    console.error('Error generating YouTube queries:', error);
    return [
      {
        query: `how to manage ${emotionType} techniques`,
        purpose: "Provides practical techniques for managing this specific emotion"
      },
      {
        query: `${emotionType} relief meditation guided`,
        purpose: "Offers guided meditation specifically designed for this emotion"
      },
      {
        query: `therapist explains ${emotionType} coping strategies`,
        purpose: "Provides expert advice from mental health professionals"
      }
    ];
  }
}

/**
 * Search YouTube videos based on a query
 * @param {string} query - Search query
 * @returns {Promise<Array>} - List of video results
 */
async function searchYouTubeVideos(query) {
  // Note: In a real implementation, this would use the YouTube API with an API key
  // For this prototype, we'll return mock data
  
  // Mock data based on common video formats
  const mockVideos = [
    {
      id: Math.random().toString(36).substring(2, 10),
      title: `${query} - Expert Guide`,
      thumbnail: `https://i.ytimg.com/vi/${Math.random().toString(36).substring(2, 10)}/hqdefault.jpg`,
      channelName: "Mental Health Channel",
      url: `https://www.youtube.com/watch?v=${Math.random().toString(36).substring(2, 10)}`
    },
    {
      id: Math.random().toString(36).substring(2, 10),
      title: `How to Practice ${query} Daily`,
      thumbnail: `https://i.ytimg.com/vi/${Math.random().toString(36).substring(2, 10)}/hqdefault.jpg`,
      channelName: "Mindfulness Meditation",
      url: `https://www.youtube.com/watch?v=${Math.random().toString(36).substring(2, 10)}`
    },
    {
      id: Math.random().toString(36).substring(2, 10),
      title: `Understanding ${query}: Science Explained`,
      thumbnail: `https://i.ytimg.com/vi/${Math.random().toString(36).substring(2, 10)}/hqdefault.jpg`,
      channelName: "Science of Emotions",
      url: `https://www.youtube.com/watch?v=${Math.random().toString(36).substring(2, 10)}`
    }
  ];
  
  return mockVideos;
}

module.exports = { generateYouTubeQueries, searchYouTubeVideos };
