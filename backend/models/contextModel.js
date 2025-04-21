const mongoose = require('mongoose');

const contextSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  typicalDay: {
    type: String
  },
  emotionTriggers: {
    type: String
  },
  likesDislikes: {
    type: String
  },
  calmingActivities: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Context = mongoose.model('Context', contextSchema);

module.exports = Context;
