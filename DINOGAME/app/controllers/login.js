const mongoose = require('mongoose');
const mongoConnection = "mongodb+srv://admin:admin@myapp.1xkqgcy.mongodb.net/";
const db = mongoose.connection;


db.on('connecting', () => {
    console.log("Conectando...");
    console.log(mongoose.connection.readyState); //State 2: Connecting.
});

db.on('connected', () => {
    console.log('Conectado exitosamente!');
    console.log(mongoose.connection.readyState); //State 1: Connected.
});

mongoose.connect(mongoConnection, {useNewUrlParser: true});

