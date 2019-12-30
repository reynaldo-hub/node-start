import transformMongooseError from 'mongoose-validation-error-handler';

class Response {
	static onError(ex) {
		if (ex.name === 'MongoError') {
			if (ex.code === 11000) {
				return {
					statusCode: 400,
					errors: transformMongooseError(ex, { capitalize: false, humanize: false }),
				};
			}
		}

		return {
			statusCode: 500,
			errors: [{ message: ex.message }],
		};
	}
}

export default Response;
