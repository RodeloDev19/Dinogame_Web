const express = require('express');
const router = express.Router();
const {updateScore} = require('../controllers/scoreUpdater');

router.post('/', updateScore);

module.exports = router;