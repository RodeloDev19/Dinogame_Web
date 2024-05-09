const {User} = require('./mongodb');
const bcrypt = require('bcryptjs');

const changeUser = (req, res) => {
    let name = req.body.name,
        username = req.body.username,
        password = req.body.password,
        object_to_update = {};

    if (name != undefined && username != undefined && password != undefined) {
        object_to_update.name = name;
        object_to_update.username = username;

        // Genera la sal y hashea la contraseña dentro de una sola llamada a bcrypt
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).send('Error al generar salt');
            }

            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).send('Error al hashear la contraseña');
                }

                object_to_update.password = hashedPassword; // Ahora tenemos la contraseña hasheada

                // Encuentra el usuario y actualízalo en la base de datos dentro del callback del hash
                User.findOne({ username: username }).then((user) => {
                    if (!user) {
                        return res.status(404).send('Usuario no encontrado');
                    }

                    User.findByIdAndUpdate(user._id, object_to_update, { new: true }).then((updatedUser) => {
                        res.send(updatedUser); // Envía el usuario actualizado
                    }).catch((err) => {
                        console.error('Error al actualizar el usuario:', err);
                        res.status(500).send('Error al actualizar el usuario');
                    });
                }).catch((err) => {
                    console.error('Error al buscar el usuario:', err);
                    res.status(500).send('Error al buscar el usuario');
                });
            });
        });
    } else {
        res.status(400).json({ error: 'Información incompleta' });
    }
};

module.exports = {changeUser};
