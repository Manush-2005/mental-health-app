const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const emotionRoutes = require('./routes/emotionRoutes');
const taskRoutes = require('./routes/taskRoutes');
const communityRoutes = require('./routes/communityRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/ai', aiRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Mental Health App API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
