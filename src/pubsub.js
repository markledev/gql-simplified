import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';
import {ConsoleLogger,IConsoleLoggerSettings} from "@cdm-logger/server";
import * as Logger from "bunyan";

const settings = {
  level: "info", // Optional: default 'info' ('trace'|'info'|'debug'|'warn'|'error'|'fatal')
  mode: "short" // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};

const RABBITMQ_USER="admin"
const RABBITMQ_PASS="VeryCoolStory"
const RABBITMQ_HOST="159.65.131.113"
const RABBITMQ_PORT="5672"
// const { RABBITMQ_USER, RABBITMQ_PASS, RABBITMQ_HOST, RABBITMQ_PORT } = process.env;
const logger = ConsoleLogger.create("gql-simplified", settings);
const RABBITMQ_FULL_URL = `${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`;

export const pubsub = new AmqpPubSub({
  config: {
    host: RABBITMQ_FULL_URL,
    port: RABBITMQ_PORT
  },
  logger
});

