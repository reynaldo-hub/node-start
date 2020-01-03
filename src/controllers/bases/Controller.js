class Controller {
	constructor(service) {
		this.service = service;
		this.getAll = this.getAll.bind(this);
		this.get = this.get.bind(this);
		this.insert = this.insert.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	async getAll(req, res) {
		const data = await this.service.getAll(req.query);
		return res.status(data.statusCode).send(data);
	}

	async get(req, res) {
		const data = await this.service.getAll(req.query);
		return res.status(data.statusCode).send(data);
	}

	async insert(req, res) {
		const data = await this.service.insert(req.body);
		return res.status(data.statusCode).send(data);
	}

	async update(req, res) {
		const { id } = req.params;

		const data = await this.service.update(id, req.body);
		return res.status(data.statusCode).send(data);
	}

	async delete(req, res) {
		const { id } = req.params;

		const data = await this.service.delete(id);
		return res.status(data.statusCode).send(data);
	}
}

export default Controller;
