/**
 * Created by austin on 2/28/17.
 */

const router = require('express').Router();

const Story = require('../models/Story');

router.get('/story', (req, res) => {
  res.json(Story);
});

module.exports = router;
