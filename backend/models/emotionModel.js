const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['anxiety', 'sadness', 'loneliness', 'anger', 'stress', 'fear']
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Emotion = mongoose.model('Emotion', emotionSchema);

module.exports = Emotion;
