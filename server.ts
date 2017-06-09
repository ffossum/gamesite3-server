require('dotenv-safe').load();

import app from './src/app';
import * as winston from 'winston';
import * as deepstream from 'deepstream.io-client-js';

const deepstreamHost = process.env.DEEPSTREAM_HOST;
const deepstreamUsername = process.env.DEEPSTREAM_USERNAME;
const deepstreamPassword = process.env.DEEPSTREAM_PASSWORD;

const port = process.env.SERVER_PORT;

const deepstreamClient = deepstream(deepstreamHost).login({
  username: deepstreamUsername,
  password: deepstreamPassword,
});

deepstreamClient.on('error', winston.error);

app.listen(port);
winston.info(`Server listening on port ${port}`);
