const express = require('express');
const path = require('path');

const router = express.Router();

const login = require("../routes/login");
const register = require("../routes/register");
const modificar = require("../routes/modificar");
const leaderboard = require("../routes/leaderboard");
const scoreUpdater = require("../routes/scoreUpdater");
const scores = require("../routes/scores");
const verifyToken = require("./verifyToken");

router.use('/login', login);
router.use('/register', register);
router.use('/modificar', modificar);
router.use('/api/leaderboard', leaderboard);
router.use('/update-score', scoreUpdater);
router.use('/api/scores', scores);

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/index', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/login', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/login.html")));
router.get('/register', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/register.html")));
router.get('/characters', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/characters.html")));
router.get('/leaderboard', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/leaderboard.html")));
router.get('/modificar', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/modificar.html")));
router.get('/games', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/games.html")));

module.exports = router;
