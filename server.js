require('dotenv').config();

import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { schema } from './src/schema';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { MongoClient } from 'mongodb';
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

console.log(MONGO_URL)


const PORT = 3000;
const server = express();


MongoClient.connect(MONGO_URL, (err, client) => {
	const db = client.db(DB_NAME);

	server.use('*', cors({ origin: 'http://localhost:4000' }));
	server.use('/graphql', bodyParser.json(), graphqlExpress(async (req, res, params) => ({
		  schema,
		  context: { 
		  	db,
		  	headers: req.headers
		  }
		})
	));

	server.use('/graphiql', graphiqlExpress({
	  endpointURL: '/graphql',
	  subscriptionsEndpoint: 'ws://localhost:3000/subscriptions'
	}));

	const ws = createServer(server);

	ws.listen(PORT, () => {
		console.log(`running on port ${PORT}`);
	})

	new SubscriptionServer({
		execute,
		subscribe,
		schema
	}, {
		server: ws,
		path: '/subscriptions'
	})
})



