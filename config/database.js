import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

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
