require("dotenv-safe").load();

import * as deepstream from "deepstream.io-client-js";
import * as winston from "winston";
import app from "./src/app";

const deepstreamHost = process.env.DEEPSTREAM_HOST;
const deepstreamUsername = process.env.DEEPSTREAM_USERNAME;
const deepstreamPassword = process.env.DEEPSTREAM_PASSWORD;

const port = process.env.SERVER_PORT;

const deepstreamClient = deepstream(deepstreamHost).login({
  password: deepstreamPassword,
  username: deepstreamUsername,
});

deepstreamClient.on("error", winston.error);

app.listen(port);
winston.info(`Server listening on port ${port}`);
