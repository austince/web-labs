/**
 * Created by austin on 3/31/17.
 */

const router = require('express').Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const config = require('./config');


router.get('/', (req, res) => {
  res.render('index', { title: config.name, errors: req.flash('loginError') });
});

router.get('/private',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      res.render('profile', { user: req.user, title: config.name });
    });

router.post('/login', bodyParser.urlencoded({ extended: true }),
    passport.authenticate('local', {
      failureRedirect: '/',
      successReturnToOrRedirect: '/private',
      flashFailure: true,
    }));

module.exports = router;
