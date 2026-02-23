const db = require('../config/db');

const Question = {
    async getAll() {
        const query = 'SELECT * FROM questions';
        const [rows] = await db.execute(query);
        return rows;
    },

    async getBySubject(subject) {
        const query = 'SELECT * FROM questions WHERE subject = ?';
        const [rows] = await db.execute(query, [subject]);
        return rows;
    }
};
module.exports = Question;