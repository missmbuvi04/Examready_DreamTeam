const Question = require('../models/Question');

const QuestionController = {
    async getQuestions(req, res) {
        try {
            const { subject } = req.query;

            let questions;
            if (subject) {
                questions = await Question.getBySubject(subject);
            } else {
                questions = await Question.getAll();
            }

            return res.status(200).json(questions);
        } catch (error) {
            console.log('GET QUESTIONS ERROR:', error.message);
            return res.status(500).json({
                message: 'Failed to fetch questions.',
                error: error.message
            });
        }
    }
};

module.exports = QuestionController;