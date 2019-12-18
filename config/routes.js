import PersonController from '../src/controllers/PersonController.js';

export default (server) => {
	server.get('/api/persons', PersonController.getAll);
	server.get('/api/persons/:params', PersonController.get);
	server.post('/api/persons', PersonController.insert);
	server.put('/api/persons/:id', PersonController.update);
	server.delete('/api/persons/:id', PersonController.delete);
};
