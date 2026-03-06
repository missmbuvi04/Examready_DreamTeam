const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routes/UserRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    console.log('JSON Parse Error:', err.message);
    console.log('Content-Type:', req.headers['content-type']);
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  next();
});

// Routes
app.use('/api/users', userRoute);
const questionRoute = require('./routes/QuestionRoute');
app.use('/api/questions', questionRoute);

const attemptRoute = require('./routes/QuizAttemptRoute');
app.use('/api/attempts', attemptRoute);

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
