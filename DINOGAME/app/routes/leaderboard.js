const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboard');

router.get('/leaderboard', getLeaderboard);

module.exports = router;