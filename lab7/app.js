/**
 * Created by austin on 2/27/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');
const HttpStatus = require('http-status-codes');
const config = require('./src/utils/config');
const router = require('./src/routes');

const app = express();
const logger = bunyan.createLogger({
  name: config.name,
});

app.use(bodyParser.json());

app.use(bunyanMiddleware({
  logger,
}));

app.use(router);

// Error handling
app.use((err, req, res, next) => {
  const description = err.description || err.message || 'Unknown Error';
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  logger.error(`ERROR CODE ${status}: ${description}`);
  res.status(status).send({ description });
});


function start() {
  app.listen(config.port, () => {
    console.log(`${config.name} is listening on port ${config.port}`);
  });
}


if (require.main === module) {
  start();
}

module.exports = app;
module.exports.start = start;
