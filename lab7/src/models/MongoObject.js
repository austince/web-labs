/**
 * Created by austin on 3/4/17.
 */

/* eslint-disable no-param-reassign  */
/* eslint-disable no-underscore-dangle  */

const uuid = require('uuid');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');
const getCollectionFn = require('../mongo/collection').getCollectionFn;

/**
 *
 */
class MongoObject {
  constructor(id, collectionName = MongoObject._collectionName) {
    if (!id) {
      id = uuid();
    }
    this._id = id;
    this._collectionName = collectionName;
    // Could I use Symbols for this?
    this._protectedFields = ['_protectedFields', '_collectionName'];
  }

  get id() {
    return this._id;
  }

  get saveable() {
    return this.returnable;
  }

  get returnable() {
    const data = {};
    for (const key of Object.keys(this)) {
      if (this._protectedFields.indexOf(key) === -1) {
        data[key] = this[key];
      }
    }
    return data;
  }

  getCollection() {
    return getCollectionFn(this._collectionName)();
  }

  save() {
    const self = this;
    return this.getCollection()
        .then((collection) => {
          return collection.insertOne(this.saveable);
        })
        .then((resultData) => {
          if (resultData.insertedCount !== 1) {
            throw createError(HttpStatus.BAD_REQUEST, `Error inserting ${this._id} into ${this._collectionName}`);
          }

          return self;
        });
  }

  reload() {
    const self = this;

    return this.getCollection()
        .then((collection) => {
          return collection.findByUsername({ _id: this._id });
        }).then((result) => {
          if (result === null) {
            throw createError(HttpStatus.NOT_FOUND, `Can't find a ${self.constructor.name} with id:${self._id}`);
          }

          for (const key of Object.keys(result)) {
            self[key] = result[key];
          }
        });
  }

  remove() {
    const self = this;
    return this.getCollection()
        .then((collection) => {
          return collection.removeOne({ _id: this._id });
        }).then((resultData) => {
          if (resultData.deletedCount === 0) {
            throw createError(HttpStatus.BAD_REQUEST,
                `Could not delete a ${self.constructor.name} with id of ${this.id}`);
          }
        });
  }

  update() {
    // Should keep track of which fields are 'dirty'
    const fieldsToUpdate = {};
    // Don't allow _id to be updated
    for (const key of Object.keys(this)) {
      if (key !== '_id') {
        fieldsToUpdate[key] = this[key];
      }
    }

    return this.getCollection()
        .then((collection) => {
          return collection.updateOne(
              { _id: this._id },
            {
              $set: fieldsToUpdate,
            });
        })
        .then((cmdRes) => {
          if (cmdRes.result.ok !== 1) {
            throw createError(HttpStatus.BAD_REQUEST, `Could not update from ${this._collectionName} with id of ${this._id}`);
          }
        });
  }


  static find(query = {}, collectionName = MongoObject.COLLECTION_NAME) {
    // Todo: incorporate query
    return getCollectionFn(collectionName)()
        .then((collection) => {
          return collection.find();
        })
        .then((cursor) => {
          return cursor.toArray();
        });
  }

  static findOne(id, query = {}, collectionName = MongoObject.COLLECTION_NAME) {
    if (id) {
      Object.assign(query, { _id: id });
    }

    return getCollectionFn(collectionName)()
        .then((collection) => {
          return collection.findByUsername(query);
        }).then((result) => {
          if (result === null) {
            throw createError(HttpStatus.NOT_FOUND, `Can't find id:${id} in ${collectionName}`);
          }
          return result;
        });
  }

  static validate() {}
}
MongoObject.COLLECTION_NAME = 'MongoObject';

module.exports = MongoObject;
