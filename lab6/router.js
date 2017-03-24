/**
 * Created by austin on 2/28/17.
 */

const reqDir = require('require-dir');
const router = require('express').Router();

const routes = reqDir('./routes');

// Cycle through all the routes and add them to the main app router
for (const key of Object.keys(routes)) {
  router.use(routes[key]);
}

module.exports = router;
