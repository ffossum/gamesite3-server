/* @flow */
const app = require('./src/app');
const deepstream = require('deepstream.io-client-js');

require('dotenv-safe').load();

const deepstreamHost = process.env.DEEPSTREAM_HOST;
const deepstreamUsername = process.env.DEEPSTREAM_USERNAME;
const deepstreamPassword = process.env.DEEPSTREAM_PASSWORD;

const port = process.env.SERVER_PORT;

deepstream(deepstreamHost).login({
  username: deepstreamUsername,
  password: deepstreamPassword,
});

app.listen(port);
