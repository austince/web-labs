/**
 * Created by austin on 2/12/17.
 */

const dbConnection = require('./connection');

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
function getCollectionFn(collectionName) {
  let collection;

  return () => {
    if (!collection) {
      collection = dbConnection().then((db) => {
        return db.collection(collectionName);
      });
    }

    return collection;
  };
}

/* Now, you can list your collections here: */
module.exports = {
  getCollectionFn,
};
