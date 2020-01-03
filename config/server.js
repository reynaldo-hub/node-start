import express from 'express';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';
import setRoutes from './routes.js';

Sentry.init({
	debug: true,
});

const server = express();

server.use(Sentry.Handlers.requestHandler());
server.use(bodyParser.json());
setRoutes(server);

export default server;
