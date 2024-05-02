const {User} = require('./mongodb');

const registerUser = (req, res) => {
    let newUser = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    let user = User(newUser);

    user.save().then((doc) => {
        res.send('Usuario creado exitosamente: ' + doc);
    }).catch((err) => console.log(err));
};

module.exports = {registerUser};