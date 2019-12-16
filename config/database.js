import mongoose from 'mongoose';

const server = '127.0.0.1:27017';
const database = 'node-start';
const url = process.env.MONGODB_URI || `mongodb://${server}/${database}`;

class Connection {
	constructor() {
		mongoose.set('useNewUrlParser', true);
		mongoose.set('useFindAndModify', false);
		mongoose.set('useCreateIndex', true);
		mongoose.set('useUnifiedTopology', true);
		mongoose.connect(url);
	}
}

export default new Connection();
