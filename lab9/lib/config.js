/**
 * Created by austin on 3/6/17.
 */

// const reload = require('require-reload')(require);
const configJson = require('./../config.json');

/**
 * Dynamically get all configuration file objects
 * @param {string} env
 * @returns {*} configuration object
 */
function configuration(env) {
  if (!env) env = process.env.NODE_ENV || 'dev'; // eslint-disable-line
  // Defaults to using the env variable but allows dynamic loading
  let config;

  // Dynamically get the config off passed environment
  switch (env) {
    case 'prod':
    case 'production':
      config = configJson.production;
      break;
    case 'testing':
      config = configJson.testing;
      break;
    default:   // Default to dev mode
      config = configJson.development;
  }

  return config;
}

module.exports = configuration();

/**
 * Gets the configuration based on the environment passed
 * @type {function}
 */
module.exports.configuration = configuration;
