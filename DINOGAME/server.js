const express = require('express');
const router = require('./app/controllers/router');
const app = express();

app.use(express.json());
app.use(router);
app.use(express.static('app'));
app.use('/views', express.static('views'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
