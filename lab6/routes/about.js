/**
 * Created by austin on 2/28/17.
 */

const router = require('express').Router();

const About = require('../models/About');

router.get('/about', (req, res) => {
  res.json(About);
});

module.exports = router;
