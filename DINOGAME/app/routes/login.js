const express = require('express');
const router = express.Router();
const {validateUser} = require('../controllers/login');

router.post('/validate', validateUser);

module.exports = router;