/**
 * Created by austin on 2/28/17.
 */

const router = require('express').Router();

const Education = require('../models/Education');

router.get('/education', (req, res) => {
  res.json(Education);
});

module.exports = router;
