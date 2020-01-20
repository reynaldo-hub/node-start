import UserService from '../services/UserService.js';

class UserController {
	async signUp(req, res) {
		const data = await UserService.signUp(req.body);
		return res.status(data.statusCode).send(data);
	}

	async login(req, res) {
		const data = await UserService.login(req.body);
		return res.status(data.statusCode).send(data);
	}
}

export default new UserController();
