const { User } = require('./mongodb');

const updateScores = () => {
    User.find({})  // Encuentra todos los usuarios
        .then(users => {
            users.forEach(user => {
                const randomScore = Math.floor(Math.random() * 1001);  // Genera un puntaje aleatorio entre 0 y 1000
                User.findByIdAndUpdate(user._id, { highScore: randomScore }, { new: true })  // Actualiza el puntaje máximo
                    .then(updatedUser => {
                        console.log(`Puntaje actualizado para ${updatedUser.username}: ${updatedUser.highScore}`);
                    })
                    .catch(err => console.log(`Error al actualizar el usuario ${user.username}:`, err));
            });
        })
        .catch(err => {
            console.log('Error al encontrar usuarios:', err);
        });
};

updateScores();

const getLeaderboard = (req, res) => {
    User.find({}).sort({ highScore: -1 })  // Ordena los usuarios por el puntaje de mayor a menor
        .then(users => {
            res.json(users);  // Envía la lista de usuarios al cliente
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error al obtener el leaderboard');
        });
};

module.exports = { getLeaderboard };
