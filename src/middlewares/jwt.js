import jwt from 'jsonwebtoken';
import _ from 'lodash';

import Response from '../helpers/Response.js';


class Auth {
	async authorize(req, res, next) {
		const token = req.header('token');
		if (_.isEmpty(token)) {
			console.dir(token);
			res.status(401).send({ errors: [{ message: 'Not authorized' }] });
		}

		try {
			const decoded = await jwt.verify(token, process.env.JWT_PASSWORD);
			req.user = decoded.user;
			next();
		} catch (error) {
			Response.onError(error);
		}
	}
}

export default new Auth();
