const express = require('express');
const QuestionController = require('../controllers/QuestionController');

const router = express.Router();

router.get('/', QuestionController.getQuestions);

module.exports = router;