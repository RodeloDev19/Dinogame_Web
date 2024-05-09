const express = require('express');
const router = express.Router();
const { getScores } = require('../controllers/scores');

router.get('/', getScores);

module.exports = router;
