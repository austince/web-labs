/**
 * Created by austin on 2/6/17.
 */

// lol
const fsp = require('fs-promise');

/**
 * @async
 * @param path
 * @return {Promise.<string>}
 */
function getFileAsString(path) {
  if (typeof path !== 'string') {
    return Promise.reject('Path must be a string.');
  }
  // Read files as utf-8 encoding
  return fsp.readFile(path, 'utf8');
}

/**
 *
 * @param path
 * @param {string} text
 * @return {Promise}
 */
function saveStringToFile(path, text) {
  if (typeof path !== 'string' || typeof text !== 'string') {
    return Promise.reject('Path and text must be both be strings.');
  }
  return fsp.writeFile(path, text);
}

/**
 *
 * @param path
 * @return {Promise.<JSON>}
 */
function getFileAsJSON(path) {
  return getFileAsString(path)
      .then((contents) => {
        return JSON.parse(contents);
      });
}

/**
 *
 * @param path
 * @param obj
 * @return {Promise}
 */
function saveJSONToFile(path, obj) {
  if (obj === undefined || typeof obj !== 'object') {
    return Promise.reject('Need to provide and object to save.');
  }
  return saveStringToFile(path, JSON.stringify(obj));
}

module.exports = {
  getFileAsString,
  saveStringToFile,
  getFileAsJSON,
  saveJSONToFile,
};
