const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  const { description, emotion } = req.body;
  
  try {
    const task = await Task.create({
      user: req.user._id,
      description,
      emotion,
      completed: false
    });
    
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's tasks
const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ date: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task completion status
const updateTaskStatus = async (req, res) => {
  const { completed } = req.body;
  
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    task.completed = completed;
    await task.save();
    
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await task.remove();
    
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask, getUserTasks, updateTaskStatus, deleteTask };
