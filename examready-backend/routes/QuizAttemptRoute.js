const express = require('express');
const QuizAttemptController = require('../controllers/QuizAttemptController');

const router = express.Router();

router.post('/', QuizAttemptController.saveAttempt);
router.get('/:user_id', QuizAttemptController.getUserAttempts);
router.get('/:user_id/stats', QuizAttemptController.getUserStats);

module.exports = router;