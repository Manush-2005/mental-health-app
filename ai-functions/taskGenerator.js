const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Generate personalized tasks based on user's emotion and context
 * @param {string} emotionType - Type of emotion (anxiety, sadness, etc.)
 * @param {Object} userContext - User's context information
 * @returns {Promise<Array>} - List of personalized tasks
 */
async function generateTasks(emotionType, userContext) {
  try {
    const prompt = `
      As a mental health assistant, create a personalized task list for someone experiencing ${emotionType}.
      
      User context:
      - Typical day: "${userContext.typicalDay}"
      - When they feel this emotion most: "${userContext.emotionTriggers}"
      - Their likes/dislikes: "${userContext.likesDislikes}"
      - Activities that calm them: "${userContext.calmingActivities}"
      
      Generate 5 specific, actionable tasks that:
      1. Are realistic to complete in a day
      2. Address their specific emotion triggers
      3. Incorporate their calming activities
      4. Are specific with clear time frames (e.g., "Take a 15-minute walk after lunch")
      
      Format the response as a JSON array of task objects with keys:
      - description (string)
      - timeFrame (string, e.g., "morning", "afternoon", "evening")
      - duration (string, e.g., "5 minutes", "15 minutes", "1 hour")
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
    console.error('Error generating tasks:', error);
    return [
      {
        description: "Take a 15-minute walk outside",
        timeFrame: "morning",
        duration: "15 minutes"
      },
      {
        description: "Practice deep breathing for 5 minutes",
        timeFrame: "afternoon",
        duration: "5 minutes"
      },
      {
        description: "Write down 3 things you're grateful for",
        timeFrame: "evening",
        duration: "10 minutes"
      },
      {
        description: "Listen to a calming playlist",
        timeFrame: "evening",
        duration: "20 minutes"
      },
      {
        description: "Drink a glass of water and take a short break",
        timeFrame: "afternoon",
        duration: "5 minutes"
      }
    ];
  }
}

module.exports = { generateTasks };
