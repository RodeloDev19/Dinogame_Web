const {User} = require('./mongodb');
const bcrypt = require('bcryptjs');

const registerUser = (req, res) => {
    const { name, username, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).send('Error al generar salt');
        }

        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error al hashear la contraseña');
            }

            const newUser = new User({
                name: name,
                username: username,
                password: hashedPassword
            });

            newUser.save()
                .then(user => res.json({ message: 'Usuario registrado con éxito', username: username }))
                .catch(err => res.status(500).send('Error al guardar el usuario'));
        });
    });
};

module.exports = { registerUser };
