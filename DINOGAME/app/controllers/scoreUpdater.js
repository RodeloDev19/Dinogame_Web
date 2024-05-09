const { User, UserPlays } = require('./mongodb');

const updateScore = async (req, res) => {
    const { username, score } = req.body;

    try {
        // Buscar el usuario en UserPlays o crear uno nuevo si no existe
        const userPlay = await UserPlays.findOneAndUpdate(
            { username: username },
            { $push: { scores: { score: score, date: new Date() } } },
            { new: true, upsert: true }
        );

        // Actualizar el highScore si el nuevo score es más alto
        if (score > userPlay.highScore) {
            userPlay.highScore = score;
            await userPlay.save();

            // Buscar y actualizar el highScore en la colección User
            const user = await User.findOneAndUpdate(
                { username: username },
                { $set: { highScore: score } },
                { new: true }
            );

            if (user) {
                res.json({ message: "High score updated successfully", highScore: score });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } else {
            res.status(200).json({ message: "Score updated, but not high enough to update high score", currentHighScore: userPlay.highScore });
        }
    } catch (err) {
        console.error("Error updating score", err);
        res.status(500).json({ error: "Error updating score" });
    }
};

module.exports = { updateScore };
