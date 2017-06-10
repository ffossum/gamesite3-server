require("dotenv-safe").load();

import * as deepstream from "deepstream.io-client-js";
import { once } from "ramda";
import * as winston from "winston";
import app from "./src/app";
import deepstreamApp from "./src/deepstreamApp";

const initDeepstream = once(deepstreamApp);

const deepstreamHost = process.env.DEEPSTREAM_HOST;
const deepstreamUsername = process.env.DEEPSTREAM_USERNAME;
const deepstreamPassword = process.env.DEEPSTREAM_PASSWORD;

const port = process.env.SERVER_PORT;

const deepstreamClient = deepstream(deepstreamHost);
deepstreamClient.on("error", winston.error);

deepstreamClient.login(
  {
    password: deepstreamPassword,
    username: deepstreamUsername,
  },
  (success, data) => {
    if (success) {
      initDeepstream(deepstreamClient);
    }
  },
);

app.listen(port);
winston.info(`Server listening on port ${port}`);
