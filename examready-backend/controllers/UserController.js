const User = require('../models/User');

const UserController = {
	async createUser(req, res) {
		try {
			const { username, email } = req.body;

			if (!username || !email) {
				return res.status(400).json({ message: 'Username and email are required.' });
			}

			const existingByEmail = await User.findByEmail(email);
			if (existingByEmail) {
				return res.status(409).json({ message: 'Email is already in use.' });
			}

			const existingByUsername = await User.findByUsername(username);
			if (existingByUsername) {
				return res.status(409).json({ message: 'Username is already in use.' });
			}

			const newUser = await User.create({ username, email });
			return res.status(201).json(newUser);
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to create user.',
				error: error.message
			});
		}
	},

	async getUsers(req, res) {
		try {
			const users = await User.getAll();
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to fetch users.',
				error: error.message
			});
		}
	},

	async getUserById(req, res) {
		try {
			const id = Number(req.params.id);

			if (!Number.isInteger(id) || id <= 0) {
				return res.status(400).json({ message: 'Invalid user id.' });
			}

			const user = await User.findById(id);

			if (!user) {
				return res.status(404).json({ message: 'User not found.' });
			}

			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to fetch user.',
				error: error.message
			});
		}
	},

	async updateUser(req, res) {
		try {
			const id = Number(req.params.id);
			const { username, email } = req.body;

			if (!Number.isInteger(id) || id <= 0) {
				return res.status(400).json({ message: 'Invalid user id.' });
			}

			const currentUser = await User.findById(id);
			if (!currentUser) {
				return res.status(404).json({ message: 'User not found.' });
			}

			const nextUsername = username || currentUser.username;
			const nextEmail = email || currentUser.email;

			if (!nextUsername || !nextEmail) {
				return res.status(400).json({ message: 'Username and email are required.' });
			}

			if (nextEmail !== currentUser.email) {
				const existingByEmail = await User.findByEmail(nextEmail);
				if (existingByEmail && existingByEmail.id !== id) {
					return res.status(409).json({ message: 'Email is already in use.' });
				}
			}

			if (nextUsername !== currentUser.username) {
				const existingByUsername = await User.findByUsername(nextUsername);
				if (existingByUsername && existingByUsername.id !== id) {
					return res.status(409).json({ message: 'Username is already in use.' });
				}
			}

			const updatedUser = await User.updateById(id, {
				username: nextUsername,
				email: nextEmail
			});

			return res.status(200).json(updatedUser);
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to update user.',
				error: error.message
			});
		}
	},

	async deleteUser(req, res) {
		try {
			const id = Number(req.params.id);

			if (!Number.isInteger(id) || id <= 0) {
				return res.status(400).json({ message: 'Invalid user id.' });
			}

			const wasDeleted = await User.deleteById(id);

			if (!wasDeleted) {
				return res.status(404).json({ message: 'User not found.' });
			}

			return res.status(200).json({ message: 'User deleted successfully.' });
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to delete user.',
				error: error.message
			});
		}
	}
};

module.exports = UserController;
