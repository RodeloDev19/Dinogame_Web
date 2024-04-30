const express = require('express');
const router = express.Router();
const {connect} = require('../controllers/login');
//const {ShoppingCart, checkCarrito} = require('../controllers/shopping_cart');

router.post('/validate', connect);

module.exports = router;