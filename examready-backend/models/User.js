const db = require('../config/db');

const User = {
	async create({ username, email }) {
		const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
		const [result] = await db.execute(query, [username, email]);

		return this.findById(result.insertId);
	},

	async findById(id) {
		const query = 'SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1';
		const [rows] = await db.execute(query, [id]);
		return rows[0] || null;
	},

	async findByEmail(email) {
		const query = 'SELECT id, username, email, created_at FROM users WHERE email = ? LIMIT 1';
		const [rows] = await db.execute(query, [email]);
		return rows[0] || null;
	},

	async findByUsername(username) {
		const query = 'SELECT id, username, email, created_at FROM users WHERE username = ? LIMIT 1';
		const [rows] = await db.execute(query, [username]);
		return rows[0] || null;
	},

	async getAll() {
		const query = 'SELECT id, username, email, created_at FROM users ORDER BY created_at DESC';
		const [rows] = await db.execute(query);
		return rows;
	},

	async updateById(id, { username, email }) {
		const query = `
			UPDATE users
			SET username = ?, email = ?
			WHERE id = ?
		`;

		const [result] = await db.execute(query, [username, email, id]);

		if (result.affectedRows === 0) {
			return null;
		}

		return this.findById(id);
	},

	async deleteById(id) {
		const query = 'DELETE FROM users WHERE id = ?';
		const [result] = await db.execute(query, [id]);
		return result.affectedRows > 0;
	}
};

module.exports = User;
