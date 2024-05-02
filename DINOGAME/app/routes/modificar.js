const express = require('express');
const router = express.Router();
const {changeUser} = require('../controllers/modificar');

router.put('/changeUser', changeUser);

module.exports = router;