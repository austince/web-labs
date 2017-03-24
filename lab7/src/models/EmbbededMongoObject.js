/**
 * Created by austin on 3/8/17.
 */
const uuid = require('uuid');
const MongoObject = require('./MongoObject');

/* eslint-disable no-param-reassign  */
/* eslint-disable no-underscore-dangle  */

class EmbeddedMongoObject {
  constructor(id, embeddedClass = null, embeddedFieldName = EmbeddedMongoObject.EMBEDDED_FIELD_NAME) {
    if (!id) {
      id = uuid();
    }
    this._id = id;
    this._embeddedFieldName = embeddedFieldName;
    this._embeddedClass = embeddedClass;
    this._protectedFields = ['_protectedFields', '_embeddedClass', '_embeddedFieldName'];
  }

  get id() {
    return this._id;
  }

  get embeddable() {
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

  /**
   * DO NOT USED
   * NOT FINISHED
   * @override
   * @param query
   * @param {class} EmbeddedClass
   * @return {Comment.EMBEDDED_CLASS}
   */
  static findOne(id, query = {},
    EmbeddedClass = EmbeddedMongoObject.EMBEDDED_CLASS,
    embeddedFieldName = EmbeddedMongoObject.EMBEDDED_FIELD_NAME) {
    if (id) {
      Object.assign(query, { _id: id });
    }

    const embedQuery = {};
    embedQuery[embeddedFieldName] = {
      $elemMatch: query,
    };

    return EmbeddedClass.findOne(null, embedQuery, EmbeddedClass.COLLECTION_NAME);
  }
}
EmbeddedMongoObject.EMBEDDED_CLASS = MongoObject;
EmbeddedMongoObject.EMBEDDED_FIELD_NAME = 'EmbeddedField';

module.exports = EmbeddedMongoObject;
