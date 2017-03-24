/**
 * Created by austin on 2/27/17.
 */

const express = require('express');
const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');
const config = require('./config.json');
const router = require('./router');

const app = express();
const logger = bunyan.createLogger({
  name: config.name,
});

app.use(bunyanMiddleware({
  logger,
}));

app.use(router);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

