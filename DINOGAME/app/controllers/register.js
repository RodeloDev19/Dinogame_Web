const {User} = require('./mongodb');
const bcrypt = require('bcryptjs');

const registerUser = (req, res) => {
    const { name, username, password } = req.body;

    // Genera un 'salt' y luego hashea la contraseña
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).send('Error al generar salt');
        }

        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error al hashear la contraseña');
            }

            // Aquí guardarías el usuario en la base de datos
            const newUser = new User({
                name: name,
                username: username,
                password: hashedPassword // Guarda la contraseña hasheada
            });

            newUser.save()
                .then(user => res.send('Usuario registrado con éxito'))
                .catch(err => res.status(500).send('Error al guardar el usuario'));
        });
    });
};

module.exports = { registerUser };
