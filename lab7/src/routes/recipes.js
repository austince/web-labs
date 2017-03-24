/**
 * Created by austin on 3/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const Recipe = require('../models/Recipe');


/**
 * Responds with a list of all recipes in the format of
 * { _id: RECIPE_ID, title: RECIPE_TITLE }
 */
router.get('/recipes', (req, res, next) => {
  Recipe.find()
      .then((recipes) => {
        // Structure the response
        const toReturn = recipes.map((recipe) => {
          return { _id: recipe._id, title: recipe.title };
        });

        res.json(toReturn);
      })
      // Send errors along the chain
      .catch(next);
});

/**
 * Creates a recipe with the supplied data in the request body,
 *  and returns the new recipe
 */
router.post('/recipes', (req, res, next) => {
  const data = req.body;
  if (data._id) {
    data._id = null;
  }

  const recipe = new Recipe(data);

  recipe.save()
      .then(() => {
        res.status(HttpStatus.CREATED).json(recipe.returnable);
      })
      .catch(next);
});

/**
 * Responds with the full content of the specified recipe
 */
router.get('/recipes/:id', (req, res, next) => {
  Recipe.findOne(req.params.id)
      .then((recipeData) => {
        return new Recipe(recipeData);
      })
      .then((recipe) => {
        res.json(recipe.returnable);
      })
      .catch(next);
});

/**
 * Updates the specified recipe with only the supplied changes,
 *  and returns the updated recipe
 */
router.put('/recipes/:id', (req, res, next) => {
  let recipe;
  Recipe.findOne(req.params.id)
      .then((recipeData) => {
        recipe = new Recipe(recipeData);
        return recipe.update();
      })
      .then(() => {
        return recipe.reload();
      })
      .then((updatedData) => {
        const updated = new Recipe(updatedData);
        res.json(updated.returnable);
      })
      .catch(next);
});

/**
 * Deletes the recipe
 */
router.delete('/recipes/:id', (req, res, next) => {
  Recipe.findOne(req.params.id)
      .then((recipeData) => {
        return new Recipe(recipeData);
      })
      .then((recipe) => {
        return recipe.remove();
      })
      .then(() => {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(next);
});

module.exports = router;
