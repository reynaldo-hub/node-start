import PersonController from '../src/controllers/PersonController.js';
import UserController from '../src/controllers/UserController.js';
import Auth from '../src/middlewares/jwt.js';

export default (server) => {
	server.get('/api/persons', Auth.authorize, PersonController.getAll);
	server.get('/api/persons/:params', PersonController.get);
	server.post('/api/persons', PersonController.insert);
	server.put('/api/persons/:id', PersonController.update);
	server.delete('/api/persons/:id', PersonController.delete);
	server.post('/api/users/signup/', UserController.signUp);
	server.post('/api/users/login/', UserController.login);
};
