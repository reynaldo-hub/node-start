import jwt from 'jsonwebtoken';

import Response from '../helpers/Response.js';

class Authorize {
	async authorize(req, res, next) {
		const token = req.header('token');

		try {
			const decoded = await jwt.verify(token, process.env.JWT_PASSWORD);
			req.user = decoded.user;
			next();
		} catch (error) {
			const formattedError = Response.onError(error);
			res.status(formattedError.statusCode).send(formattedError);
		}
	}
}

export default new Authorize();
