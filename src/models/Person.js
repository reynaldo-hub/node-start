import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const schemaName = 'Persons';
class Person {
	// eslint-disable-next-line class-methods-use-this
	initSchema() {
		const schema = new Schema({
			gender: {
				type: String,
				required: true,
			},
			name: {
				first: {
					type: String,
					required: true,
				},
				last: {
					type: String,
					required: true,
				},
			},
			email: {
				type: String,
				required: true,
				unique: true,
				lowercase: true,
				validate: (value) => validator.isEmail(value),
			},
			cellphone: {
				type: String,
				required: false,
			},
			pictures: [{
				url: {
					type: String,
					required: true,
				},
				date: {
					type: Date,
					required: true,
				},
			}],
		},
		{
			timestamps: true,
		});

		mongoose.model(schemaName, schema);
	}

	getInstance() {
		this.initSchema();
		return mongoose.model(schemaName);
	}
}

export default Person;
