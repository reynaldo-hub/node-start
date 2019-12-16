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
		const response = await this.service.getAll(req.query);
		if (response.errors) {
			return res.status(500).end();
		}
		if (!response.data) {
			return res.status(404).end();
		}
		return res.status(200).send(response);
	}

	async get(req, res) {
		const response = await this.service.get(req.params);
		if (response.errors) {
			return res.status(500).end();
		}
		if (!response.data) {
			return res.status(404).end();
		}
		return res.status(200).send(response);
	}

	async insert(req, res) {
		const response = await this.service.insert(req.body);
		if (response.errors) {
			return res.status(500).send(response);
		}
		return res.status(201).send(response);
	}

	async update(req, res) {
		const { id } = req.params;

		const response = await this.service.update(id, req.body);
		if (response.errors) {
			return res.status(500).send(response);
		}
		return res.status(200).send(response);
	}

	async delete(req, res) {
		const { id } = req.params;

		const response = await this.service.delete(id);
		if (response.errors) {
			return res.status(500).send(response);
		}
		return res.status(200).send(response);
	}
}

export default Controller;
