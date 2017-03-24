/**
 * Created by austin on 3/3/17.
 */
const reqDir = require('require-dir');
const router = require('express').Router();

const routes = reqDir('.');

// Cycle through all the routes and add them to the main app router
for (const key of Object.keys(routes)) {
  router.use(routes[key]);
}

module.exports = router;
