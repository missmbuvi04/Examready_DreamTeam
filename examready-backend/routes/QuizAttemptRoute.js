const express = require('express');
const QuizAttemptController = require('../controllers/QuizAttemptController');

const router = express.Router();

router.post('/', QuizAttemptController.saveAttempt);
router.get('/:user_id/stats', QuizAttemptController.getUserStats);
router.get('/:user_id', QuizAttemptController.getUserAttempts);

module.exports = router;