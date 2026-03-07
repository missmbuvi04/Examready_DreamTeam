const QuizAttempt = require('../models/QuizAttempt');

const QuizAttemptController = {
    async saveAttempt(req, res) {
        try {
            const { user_id, subject, topic, score, total_questions } = req.body;

            if (!user_id || score === undefined || !total_questions) {
                return res.status(400).json({ message: 'user_id, score and total_questions are required.' });
            }

            const id = await QuizAttempt.create({ user_id, subject, topic, score, total_questions });
            return res.status(201).json({ message: 'Quiz attempt saved.', id });
        } catch (error) {
            console.log('SAVE ATTEMPT ERROR:', error.message);
            return res.status(500).json({
                message: 'Failed to save quiz attempt.',
                error: error.message
            });
        }
    },

    async getUserAttempts(req, res) {
        try {
            const user_id = Number(req.params.user_id);
            const attempts = await QuizAttempt.getByUserId(user_id);
            return res.status(200).json(attempts);
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to fetch attempts.',
                error: error.message
            });
        }
    },

    async getUserStats(req, res) {
        try {
            const user_id = Number(req.params.user_id);
            const stats = await QuizAttempt.getStatsByUserId(user_id);
            return res.status(200).json(stats);
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to fetch stats.',
                error: error.message
            });
        }
    }
};

module.exports = QuizAttemptController;