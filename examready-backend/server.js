const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routes/UserRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:5000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
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

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'ExamReady Africa API is running!',
    version: '1.0.0'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server only when run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ExamReady server running on port ${PORT}`);
  });
}

module.exports = app;
