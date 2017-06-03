require('dotenv-safe').load();

const app = require('./src/app');
const deepstream = require('deepstream.io-client-js');
const winston = require('winston');

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
