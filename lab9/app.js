/**
 * Created by austin on 3/31/17.
 */

const express = require('express');
const passport = require('passport');

const expressSession = require('express-session');
const flash = require('connect-flash');
const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');
const HttpStatus = require('http-status-codes');

const config = require('./lib/config');
const routes = require('./lib/routes');
const authStrategy = require('./lib/auth');

const app = express();
const logger = bunyan.createLogger({
  name: config.name,
});

app.set('view engine', 'pug');

app.use(express.static('static'));

app.use(bunyanMiddleware({
  logger,
}));

app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());
// Passport setup
passport.use(authStrategy);
passport.serializeUser(authStrategy.serializeUser);
passport.deserializeUser(authStrategy.deserializeUser);

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use(routes);

// Error handling
app.use((err, req, res, next) => {
  const description = err.description || err.message || 'Unknown Error';
  const errorCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  logger.error(`ERROR CODE ${errorCode}: ${description}`);
  res.locals.errorCode = errorCode; // eslint-disable-line
  res.locals.errorDescription = description; // eslint-disable-line
  next();
});

app.use((req, res) => {
  // if coming from the error handler, error code will be set in locals
  // Otherwise it's a not found error
  const errorCode = res.locals.errorCode || HttpStatus.NOT_FOUND;
  const errorDescription = res.locals.errorDescription || 'Not Found!';
  res.status(errorCode);

  // respond with html page
  if (req.accepts('html')) {
    res.render('error-page', {title: 'Error', errorCode, errorDescription});
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({errorDescription});
    return;
  }

  // default to plain-text.
  res.type('txt').send(errorDescription);
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