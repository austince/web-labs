/**
 * Created by austin on 3/3/17.
 */

const EmbeddedMongoObject = require('./EmbbededMongoObject');
const Recipe = require('./Recipe');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');

class Comment extends EmbeddedMongoObject {
  constructor(data) {
    super(data._id, Comment.EMBEDDED_CLASS, Comment.EMBEDDED_FIELD_NAME);

    Comment.validate(data);

    this.poster = data.poster;

    // Very confusing that Comment has a field comment
    this.comment = data.comment;
  }

  updateData(newData) {
    if (newData.poster && typeof newData.poster === 'string') {
      this.poster = newData.poster;
    }
    if (newData.comment && typeof newData.comment === 'string') {
      this.comment = newData.comment;
    }
  }

  /**
   * @override
   * @param query
   * @return {Comment.EMBEDDED_CLASS}
   */
  static findOne(id, query = {}) {
    // Todo: incorporate query
    return super.findOne(id, query, Comment.EMBEDDED_CLASS, Comment.EMBEDDED_FIELD_NAME);
  }

  static validate(data) {
    if (!data.poster || typeof data.poster !== 'string') {
      throw createError(HttpStatus.BAD_REQUEST, `poster: ${data.poster} needs to be a string.`);
    }

    if (!data.comment || typeof data.comment !== 'string') {
      throw createError(HttpStatus.BAD_REQUEST, `comment: ${data.comment} needs to be a string.`);
    }
  }
}
Comment.EMBEDDED_CLASS = Recipe;
Comment.EMBEDDED_FIELD_NAME = 'comments';

module.exports = Comment;
module.exports.validateComment = Comment.validate;
