const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  emotion: {
    type: String,
    enum: ['anxiety', 'sadness', 'loneliness', 'anger', 'stress', 'fear'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
