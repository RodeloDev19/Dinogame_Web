const express = require('express');
const path = require('path');

const router = express.Router();

const login = require("../routes/login");
const register = require("../routes/register");
const modificar = require("../routes/modificar");

router.use('/login', login);
router.use('/register', register);
router.use('/modificar', modificar);

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/index', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/login', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/login.html")));
router.get('/register', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/register.html")));
router.get('/characters', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/characters.html")));
router.get('/leaderboard', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/leaderboard.html")));
router.get('/modificar', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/modificar.html")));

module.exports = router;
