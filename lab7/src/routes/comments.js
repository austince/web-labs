/**
 * Created by austin on 3/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

/**
 * Returns the comment specified by that commentId in the format of:
 * {  _id: COMMENT_ID, recipeId: RECIPE_ID,
  *   recipeTitle: RECIPE_TITLE, poster: COMMENT_NAME, comment: COMMENT
  * }
 */
router.get('/comments/:commentId', (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.findOne(commentId)
      .then((recipeData) => {
        const recipe = new Recipe(recipeData);
        const comment = new Comment(recipe.getCommentById(commentId));
        const toReturn = {
          recipeId: recipe.id,
          recipeTitle: recipe.title,
        };
        Object.assign(toReturn, comment.returnable);
        res.json(toReturn);
      })
      .catch(next);
});

/**
 * Deletes the comment specified
 */
router.delete('/comments/:commentId', (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.findOne(commentId)
      .then((recipeData) => {
        const recipe = new Recipe(recipeData);
        recipe.deleteCommentById(commentId);
        return recipe.update();
      })
      .then(() => {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch((error) => {
        if (error.status === 404) {
          return next(createError(404, `Can't find comment by id: ${commentId}`));
        }
        return next(error);
      });
});

/**
 * Returns a list of all comments in the specified recipe, in the format of:
 * {  _id: COMMENT_ID, recipeId: RECIPE_ID,
 *    recipeTitle: RECIPE_TITLE, poster: COMMENT_NAME, comment: COMMENT
 * }
 */
router.get('/comments/recipe/:recipeId', (req, res, next) => {
  Recipe.findOne(req.params.recipeId)
      .then((recipeData) => {
        return new Recipe(recipeData);
      })
      .then((recipe) => {
        // Format the data to spec
        const toReturn = recipe.comments.map((comment) => {
          return {
            _id: comment.id,
            poster: comment.poster,
            comment: comment.comment,
            recipeId: recipe.id,
            recipeTitle: recipe.title,
          };
        });

        res.json(toReturn);
      })
      .catch(next);
});

/**
 * Creates a new comment with the supplied data in the request body for the
 * stated recipe, and returns the new comment
 */
router.post('/comments/:recipeId', (req, res, next) => {
  const data = req.body;
  if (data._id) {
    data._id = null;
  }
  // Build a Comment from data provided
  const comment = new Comment(data);

  // Save the comment
  // Find the recipe and then update it
  // Should the Recipe contain an embedded Comment or just the id?
  Recipe.findOne(req.params.recipeId)
      .then((recipeData) => {
        const recipe = new Recipe(recipeData);
        recipe.comments.push(comment.embeddable);
        return recipe.update();
      })
      .then(() => {
        res.json(comment.returnable);
      })
      .catch(next);
});

/**
 * This got especially messy with the structure I enforced. Oops.
 * Updates the specified comment for the stated recipe with only the supplied
 * changes, and returns the updated comment
 */
router.put('/comments/:recipeId/:commentId', (req, res, next) => {
  const recipeId = req.params.recipeId;
  const commentId = req.params.commentId;
  const data = req.body;

  let comment, recipe;
  Recipe.findOne(recipeId)
      .then((recipeData) => {
        recipe = new Recipe(recipeData);
        const commendIndex = recipe.getCommentIndex(commentId);
        if (commendIndex === -1) {
          throw createError(404, `Can't find comment by id: ${commentId}`);
        }

        comment = new Comment(recipe.comments[commendIndex]);
        comment.updateData(data);
        // Overwrite the comment
        recipe.comments[commendIndex] = comment.embeddable;
        return recipe.update();
      })
      .then(() => {
        res.json(comment.returnable);
      })
      .catch(next);
});


module.exports = router;
