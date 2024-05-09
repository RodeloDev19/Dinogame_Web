const { UserPlays } = require('./mongodb');

const getScores = async (req, res) => {
    try {
        const username = req.query.username;
        const userScores = await UserPlays.findOne({ username: username });
        if (userScores) {
            const sortedScores = userScores.scores.sort((a, b) => b.score - a.score);
            res.json({ scores: userScores.scores, highScore: userScores.highScore });
        } else {
            res.status(404).json({ error: "No scores found for this user" });
        }
    } catch (err) {
        console.error('Error fetching scores', err);
        res.status(500).json({ error: "Failed to fetch scores" });
    }
};

module.exports = {getScores};
