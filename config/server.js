import express from 'express';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';
import setRoutes from './routes.js';

Sentry.init({
	dsn: 'https://5847fbaec48242aeb458141074b7eb25@sentry.io/1864371',
	debug: true,
});

const server = express();

// The request handler must be the first middleware on the app
server.use(Sentry.Handlers.requestHandler());
server.use(bodyParser.json());
setRoutes(server);

export default server;
