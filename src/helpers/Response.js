import transformMongooseError from 'mongoose-validation-error-handler';
import * as Sentry from '@sentry/node';

class Response {
	static onError(ex) {
		if (ex.name === 'MongoError' || ex.name === 'ValidationError' || ex.name === 'CastError') {
			return {
				statusCode: 400,
				errors: transformMongooseError(ex, { capitalize: false, humanize: false }),
			};
		}

		Sentry.setUser(
			{
				email: 'john.wick@example.com',
				id: 123,
				username: 'John Wick',
			},
		);
		Sentry.captureException(ex);

		return {
			statusCode: 500,
			errors: [{ message: ex.message }],
		};
	}
}

export default Response;
