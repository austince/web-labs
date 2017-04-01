/**
 * Created by austin on 3/31/17.
 */

const LocalStrategy = require('passport-local');
const User = require('./models/User');

const strategy = new LocalStrategy({
  passReqToCallback: true,
},
    (req, username, password, done) => {
      let user;

      //
      User.findByUsername(username)
          // Verify the user's password
          .then((foundUser) => {
            user = foundUser;
            return foundUser.verifyPassword(password);
          })
          .then((verified) => {
            if (verified) {
              return done(null, user);
            }
            // Wrong password
            req.flash('loginError', 'Invalid password or username.');
            return done(null, false);
          })
          .catch((err) => {
            if (err.status && err.status === 404) {
              // Can't find the user by username
              req.flash('loginError', 'Invalid password or username.');
              return done(null, false);
            }
            // Other error
            return done(err);
          });
    });

function serializeUser(user, cb) {
  cb(null, user.id);
}

function deserializeUser(id, cb) {
  User.findById(id)
      .then((deserializedUser) => {
        cb(null, deserializedUser);
      })
      .catch((err) => {
        // Can't find user
        cb(err);
      });
}

// Expose the strategy as the top level
module.exports = strategy;

// Expose serializing methods as properties
module.exports.serializeUser = serializeUser;
module.exports.deserializeUser = deserializeUser;
