import server from './config/server';
import './config/database';

server.listen(process.env.PORT, () => {
	console.log(`app running on port ${process.env.PORT}`);
});
