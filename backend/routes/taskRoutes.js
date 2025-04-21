const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getUserTasks, 
  updateTaskStatus, 
  deleteTask 
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', protect, createTask);

// @route   GET /api/tasks
// @desc    Get user's tasks
// @access  Private
router.get('/', protect, getUserTasks);

// @route   PUT /api/tasks/:id
// @desc    Update task completion status
// @access  Private
router.put('/:id', protect, updateTaskStatus);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', protect, deleteTask);

module.exports = router;
