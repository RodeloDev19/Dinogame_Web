const {User} = require('./mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'mi_llave_fresona'; 

const validateUser = (req, res) => {
    let { username, password } = req.body;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        // Si la contraseña coincide, generamos el token
                        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
                        // Enviamos el token y el username al cliente
                        res.json({ token: token, username: username, message: 'Login exitoso' });
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
