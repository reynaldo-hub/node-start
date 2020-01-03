import mongoose from 'mongoose';
import _ from 'lodash';
import Response from '../../helpers/Response.js';

class Service {
	constructor(model) {
		this.model = model;
		this.getAll = this.getAll.bind(this);
		this.insert = this.insert.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	async getAll(query) {
		const subquery = { ...query };
		let { skip, limit } = subquery;

		skip = skip ? Number(skip) : 0;
		limit = limit ? Number(limit) : 10;

		delete subquery.skip;
		delete subquery.limit;

		if (subquery._id) {
			try {
				subquery._id = new mongoose.mongo.ObjectId(query._id);
			} catch (error) {
				return Response.onError(error);
			}
		}

		try {
			const items = await this.model
				.find(subquery)
				.skip(skip)
				.limit(limit);
			const total = await this.model.countDocuments();

			return {
				data: items,
				total,
				statusCode: _.isEmpty(items) ? 404 : 200,
			};
		} catch (error) {
			return Response.onError(error);
		}
	}

	async insert(data) {
		try {
			const item = await this.model.create(data);
			return {
				statusCode: 201,
				data: item,
			};
		} catch (error) {
			return Response.onError(error);
		}
	}

	async update(id, data) {
		try {
			const item = await this.model.findByIdAndUpdate(id, data, { new: true });
			if (_.isEmpty(item)) {
				return {
					statusCode: 404,
					data: item,
				};
			}

			return {
				statusCode: 202,
				item,
			};
		} catch (error) {
			return Response.onError(error);
		}
	}

	async delete(id) {
		try {
			const item = await this.model.findByIdAndDelete(id);
			if (_.isEmpty(item)) {
				return {
					statusCode: 404,
					data: item,
				};
			}

			return {
				statusCode: 202,
				data: item,
			};
		} catch (error) {
			return Response.onError(error);
		}
	}
}

export default Service;
