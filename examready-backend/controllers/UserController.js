const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
	async createUser(req, res) {
		try {
			const { username, email, password, confirmPassword } = req.body;

			if (!username || !email || !password || !confirmPassword) {
				return res.status(400).json({ message: 'Username, email, password and confirmPassword are required.' });
			}

			if (password !== confirmPassword) {
				return res.status(400).json({ message: 'Password and confirmPassword must match.' });
			}

			const existingByEmail = await User.findByEmail(email);
			if (existingByEmail) {
				return res.status(409).json({ message: 'Email is already in use.' });
			}

			const existingByUsername = await User.findByUsername(username);
			if (existingByUsername) {
				return res.status(409).json({ message: 'Username is already in use.' });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = await User.create({ username, email, password: hashedPassword });
			return res.status(201).json(newUser);
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to create user.',
				error: error.message
			});
		}
	},

	async loginUser(req, res) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({ message: 'Email and password are required.' });
			}

			const user = await User.findAuthByEmail(email);
			if (!user) {
				return res.status(401).json({ message: 'Invalid email or password.' });
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return res.status(401).json({ message: 'Invalid email or password.' });
			}

			const token = jwt.sign(
				{ id: user.id, email: user.email, username: user.username },
				process.env.JWT_SECRET || 'examready-dev-secret',
				{ expiresIn: '1d' }
			);

			return res.status(200).json({
				message: 'Login successful.',
				token,
				user: {
					id: user.id,
					username: user.username,
					email: user.email,
					created_at: user.created_at
				}
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to login user.',
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
