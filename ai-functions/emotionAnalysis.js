const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Analyze emotion and provide insights
 * @param {string} emotionType - Type of emotion (anxiety, sadness, etc.)
 * @param {string} description - User's description of their emotion
 * @returns {Promise<Object>} - Analysis results
 */
async function analyzeEmotion(emotionType, description) {
  try {
    const prompt = `
      As a mental health assistant, analyze this person's ${emotionType}.
      
      Their description: "${description}"
      
      Provide a thoughtful analysis including:
      1. Potential triggers
      2. Common patterns in this type of emotion
      3. Three supportive statements to validate their feelings
      
      Format the response as a JSON object with keys: 
      - triggers (array of strings)
      - patterns (array of strings)
      - supportiveStatements (array of strings)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse JSON from AI response');
    }
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return {
      triggers: ['Unable to analyze triggers at this time'],
      patterns: ['Unable to analyze patterns at this time'],
      supportiveStatements: [
        'Your feelings are valid.',
        'You\'re not alone in experiencing this.',
        'Taking the step to understand your emotions shows strength.'
      ]
    };
  }
}

module.exports = { analyzeEmotion };
