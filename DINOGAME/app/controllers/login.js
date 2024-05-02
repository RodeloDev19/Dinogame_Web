const {User} = require('./mongodb');
const bcrypt = require('bcryptjs'); // Asegúrate de instalar bcryptjs con npm install bcryptjs

const validateUser = (req, res) => {
    let { username, password } = req.body;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                // Verifica la contraseña
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        res.send('Login exitoso');
                        console.log('Usuario autenticado: ', user);
                    } else {
                        res.status(401).send('Contraseña incorrecta');
                    }
                });
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        })
        .catch(err => {
            console.error('Error durante la autenticación', err);
            res.status(500).send('Error interno del servidor');
        });
};

module.exports = {validateUser};
