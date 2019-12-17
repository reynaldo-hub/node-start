import mongoose from 'mongoose';
import transformMongooseError from 'mongoose-validation-error-handler';

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
				data: item,
			};
		} catch (error) {
			return {
				message: error.errmsg || 'Not able to create item',
				errors: transformMongooseError(error, { capitalize: false, humanize: false }),
			};
		}
	}

	async update(id, data) {
		try {
			let item = await this.model.findById(id);
			if (!item) {
				return {
					item,
				};
			}
			item = data;
			item = await this.model.save();
			return {
				item,
			};
		} catch (errors) {
			return {
				errors,
			};
		}
	}

	async delete(id) {
		try {
			let item = await this.model.findById(id);
			if (!item) {
				return {
					item,
				};
			}
			item = await this.model.remove(item);
			return {
				item,
			};
		} catch (errors) {
			return {
				errors,
			};
		}
	}
}

export default Service;
