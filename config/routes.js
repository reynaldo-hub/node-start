import PersonController from '../src/controllers/PersonController.js';
import UserController from '../src/controllers/UserController.js';
import Authorize from '../src/middlewares/Authorize.js';

export default (server) => {
	server.get('/api/persons', Authorize.authorize, PersonController.getAll);
	server.get('/api/persons/:params', Authorize.authorize, PersonController.get);
	server.post('/api/persons', Authorize.authorize, PersonController.insert);
	server.put('/api/persons/:id', Authorize.authorize, PersonController.update);
	server.delete('/api/persons/:id', Authorize.authorize, PersonController.delete);
	server.post('/api/users/signup/', UserController.signUp);
	server.post('/api/users/login/', UserController.login);
};
