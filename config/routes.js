import * as Sentry from '@sentry/node';
import PersonController from '../src/controllers/PersonController.js';

export default (server) => {
	server.get('/api/persons', PersonController.getAll);
	server.get('/api/persons/:params', PersonController.get);
	server.post('/api/persons', PersonController.insert);
	server.put('/api/persons/:id', PersonController.update);
	server.delete('/api/persons/:id', PersonController.delete);
	server.get('/debug-sentry', () => {
		try {
			throw new Error('My first Sentry error!');
		} catch (error) {
			Sentry.setUser(
				{
					email: 'john.wick@example.com',
					id: 123,
					username: 'John Wick',
				},
			);
			Sentry.captureException(new Error('Something broke'));
		}
	});
};
