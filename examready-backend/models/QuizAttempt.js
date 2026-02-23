const db = require('../config/db');

const QuizAttempt = {
    async create({ user_id, subject, topic, score, total_questions }) {
        const query = 'INSERT INTO quiz_attempts (user_id, topic, score, total_questions) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [user_id, topic || subject, score, total_questions]);
        return result.insertId;
    },

    async getByUserId(user_id) {
        const query = 'SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY attempted_at DESC';
        const [rows] = await db.execute(query, [user_id]);
        return rows;
    },

    async getStatsByUserId(user_id) {
        const query = `
            SELECT 
                COUNT(*) as total_quizzes,
                SUM(score) as total_score,
                SUM(total_questions) as total_questions,
                ROUND((SUM(score) / SUM(total_questions)) * 100) as average_score
            FROM quiz_attempts 
            WHERE user_id = ?
        `;
        const [rows] = await db.execute(query, [user_id]);
        return rows[0];
    }
};

module.exports = QuizAttempt;