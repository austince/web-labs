/**
 * Created by austin on 2/12/17.
 */

const MongoClient = require('mongodb').MongoClient;
const url = require('url');

const settings = {
  mongoConfig: {
    serverUrl: 'mongodb://localhost:27017/',
    database: 'lab4',
  },
};

const fullMongoUrl = url.resolve(
    settings.mongoConfig.serverUrl,
    settings.mongoConfig.database
);

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
