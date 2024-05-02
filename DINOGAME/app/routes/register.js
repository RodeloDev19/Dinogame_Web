const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/register');

router.post('/newUser', registerUser);

module.exports = router;