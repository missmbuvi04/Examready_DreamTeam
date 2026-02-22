const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routes/UserRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoute);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'ExamReady Africa API is running!',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`ExamReady server running on port ${PORT}`);
});

module.exports = app;
