import server from './config/server.js';
import './config/database.js';

server.listen(process.env.PORT, () => {
	console.log(`app running on port ${process.env.PORT}`);
});
