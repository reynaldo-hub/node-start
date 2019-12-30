import mongoose from 'mongoose';
import transformMongooseError from 'mongoose-validation-error-handler';
import Response from '../../helpers/response.js';

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
				// console.log('not able to generate mongoose id with content', query._id);
			}
		}

		try {
			const items = await this.model
				.find(query)
				.skip(skip)
				.limit(limit);
			const total = await this.model.countDocuments();

			return {
				data: items,
				total,
			};
		} catch (errors) {
			return {
				errors,
			};
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
			return {
				statusCode: 202,
				item,
			};
		} catch (error) {
			return {
				statusCode: 500,
				errors: transformMongooseError(error, { capitalize: false, humanize: false }),
			};
		}
	}

	async delete(id) {
		try {
			const item = await this.model.findByIdAndDelete(id);
			if (!item) {
				return {
					error: true,
					statusCode: 404,
					message: 'item not found',
				};
			}

			return {
				error: false,
				deleted: true,
				statusCode: 202,
				item,
			};
		} catch (errors) {
			return {
				statusCode: 500,
				errors: transformMongooseError(errors, { capitalize: false, humanize: false }),
			};
		}
	}
}

export default Service;
