import PersonController from '../src/controllers/PersonController';

export default (server) => {
	server.get('/api/person', PersonController.getAll);
	server.get('/api/person/:params', PersonController.get);
	server.post('/api/person', PersonController.insert);
	server.put('/api/person/:id', PersonController.update);
	server.delete('/api/person/:id', PersonController.delete);
};
