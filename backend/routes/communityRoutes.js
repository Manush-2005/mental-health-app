const express = require('express');
const router = express.Router();
const { 
  postMessage, 
  getGroupMessages, 
  getActiveUserCounts 
} = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/community/messages
// @desc    Post a new message
// @access  Private
router.post('/messages', protect, postMessage);

// @route   GET /api/community/messages/:emotionGroup
// @desc    Get messages for an emotion group
// @access  Private
router.get('/messages/:emotionGroup', protect, getGroupMessages);

// @route   GET /api/community/active-users
// @desc    Get active users count for each emotion group
// @access  Private
router.get('/active-users', protect, getActiveUserCounts);

module.exports = router;
