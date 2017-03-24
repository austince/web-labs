/**
 * Created by austin on 2/12/17.
 */

const MongoClient = require('mongodb').MongoClient;
const url = require('url');
const config = require('../utils/config');

const settings = config.mongo;

const fullMongoUrl = url.resolve(settings.serverUrl, settings.database);

let connection;

/**
 *
 * @return {*}
 */
function connectDb() {
  if (!connection) {
    connection = MongoClient.connect(fullMongoUrl)
          .then((db) => {
            return db;
          });
  }

  return connection;
}

module.exports = connectDb;
