/**
 * Created by austin on 3/3/17.
 */

const MongoObject = require('./MongoObject');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');

class Recipe extends MongoObject {

  /**
   * This is a little extra when loading from database
   * Validation checking really only makes sense when loading from a POST req
   * @param data
   */
  constructor(data) {
    super(data._id, Recipe.COLLECTION_NAME);

    Recipe.validate(data);

    this.title = data.title;
    this.ingredients = data.ingredients;
    this.steps = data.steps;
    this.comments = data.comments;
  }

  getCommentIndex(id) {
    return this.comments.findIndex(comment => comment._id === id);
  }

  getCommentById(id) {
    for (const commentData of this.comments) {
      if (commentData._id === id) {
        return commentData;
      }
    }
    throw createError(404, `No comment with id ${id}`);
  }

  deleteCommentById(id) {
    const index = this.getCommentIndex(id);
    if (index === -1) {
      throw createError(404, `No comment with id ${id}`);
    }
    this.comments.splice(index, 1);
  }

  /**
   * @override
   * @param query
   * @return {*}
   */
  static find(query = {}) {
    // Todo: incorporate query
    return super.find(query, Recipe.COLLECTION_NAME)
        .then(res => res.map(data => new Recipe(data)));
  }

  /**
   * @override
   * @param id
   * @return {*}
   */
  static findOne(id, query = {}) {
    return super.findOne(id, query, Recipe.COLLECTION_NAME);
  }

  static validate(data) {
    super.validate();

    if (!data.title || typeof data.title !== 'string') {
      throw createError(HttpStatus.BAD_REQUEST, `Title: ${data.title} needs to be a string.`);
    }
    if (!data.ingredients || !Array.isArray(data.ingredients)) {
      throw createError(HttpStatus.BAD_REQUEST, `Ingredients: ${data.ingredients} needs to be an array.`);
    }

    // check that each entry is { name, amount }
    for (const ingred of data.ingredients) {
      if (typeof ingred !== 'object' || !ingred.name || !ingred.amount) {
        throw createError(HttpStatus.BAD_REQUEST, `Ingredients: ${ingred} needs to be a { name, amount }`);
      }
    }

    if (!data.steps || !Array.isArray(data.steps) || !data.steps.every(elem => typeof elem === 'string')) {
      throw createError(HttpStatus.BAD_REQUEST, `Steps: ${data.steps} needs to be an array of strings.`);
    }
    if (!data.comments || !Array.isArray(data.comments)) {
      throw createError(HttpStatus.BAD_REQUEST, `Comments: ${data.comments} needs to be an array.`);
    }
  }
}
Recipe.COLLECTION_NAME = 'Recipes';

module.exports = Recipe;
