const express = require('express');
const router = express.Router();
const { 
  recordEmotion, 
  getUserEmotions, 
  saveUserContext, 
  getUserContext 
} = require('../controllers/emotionController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/emotions
// @desc    Record a new emotion
// @access  Private
router.post('/', protect, recordEmotion);

// @route   GET /api/emotions
// @desc    Get user's emotions
// @access  Private
router.get('/', protect, getUserEmotions);

// @route   POST /api/emotions/context
// @desc    Save user context
// @access  Private
router.post('/context', protect, saveUserContext);

// @route   GET /api/emotions/context
// @desc    Get user context
// @access  Private
router.get('/context', protect, getUserContext);

module.exports = router;
