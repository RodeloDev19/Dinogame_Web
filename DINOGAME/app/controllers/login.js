const {User} = require('./mongodb');

const validateUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.find({
        username: {$eq: username}
    }).then(function (doc) {
        res.send('Usuario encontrado: ' + doc);
        console.log(doc);
    }).catch((err) => console.log(err));
};

module.exports = {validateUser};