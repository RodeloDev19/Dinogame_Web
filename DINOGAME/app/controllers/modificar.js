const {User} = require('./mongodb');

const changeUser = (req, res) => {
    let name = req.body.name,
        username = req.body.username,
        password = req.body.password,
        object_to_update = {},
        flag_updated = false;

    if (name != undefined && username != undefined && password != undefined) {
            object_to_update.nombre = name;
            object_to_update.username = username;
            object_to_update.password = password;
            flag_updated = true;
        }

    if (flag_updated){
        User.find({
            username: {$eq: username}
        }).then(function (doc) {
            let id = doc[0]._id;
            console.log('hola: ' + id);

            User.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc) => {
                console.log("Usuario actualizado:");
                console.log(doc);
                res.send(doc);
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }
    else {
        res.status(404).json({ error: 'VALIO VERGA' });
    }
};

module.exports = {changeUser};