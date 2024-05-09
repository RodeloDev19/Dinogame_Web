const { User, UserPlays } = require('./mongodb');

const getLeaderboard = async (req, res) => {
    try {
        // Fetch all users sorted by highScore in descending order
        const users = await User.find({}).sort({ highScore: -1 });

        // Bulk insert/update into UserPlays
        const bulkOps = users.map(user => ({
            updateOne: {
                filter: { username: user.username },
                update: { $set: { username: user.username, highScore: user.highScore }},
                upsert: true
            }
        }));

        await UserPlays.bulkWrite(bulkOps);

        // Now fetch from UserPlays to send to the client
        const leaderboard = await UserPlays.find({}).sort({ highScore: -1 });

        res.json(leaderboard);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener el leaderboard');
    }
};

module.exports = { getLeaderboard };
