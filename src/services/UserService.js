import _ from 'lodash';
import User from '../models/User.js';
import Response from '../helpers/Response.js';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
	async signUp(data) {
		const { username, email, password } = data;

		try {
			const count = await User.countDocuments({ email });
			if (count) {
				return {
					statusCode: 409,
					errors: [{ message: 'Email already exists' }],
				};
			}

			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(password, salt);

			const user = new User({
				username,
				email,
				active: 1,
				password: passwordHash,
			});

			await user.save();
			const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_PASSWORD, { expiresIn: '1 days' });
			return {
				statusCode: 201,
				data: token,
			};
		} catch (error) {
			Response.onError(error);
		}
	}

	async login(data) {
		const { email, password } = data;
		try {
			const user = await User.findOne({ email });
			if (_.isEmpty(user)) {
				return {
					statusCode: 404,
					errors: [{
						message: 'User not found',
					}],
				};
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return {
					statusCode: 401,
					errors: [{
						message: 'Incorrect password.',
					}],
				};
			}

			const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_PASSWORD, { expiresIn: '1 days' });
			return {
				statusCode: 200,
				data: token,
			};
		} catch (error) {
			Response.onError(error);
		}
	}
}

export default new UserService();
