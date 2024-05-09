const jwt = require('jsonwebtoken');
const secretKey = 'mi_llave_fresona'; // Asegúrate de usar la misma clave que usas para firmar el JWT

const verifyToken = (req, res, next) => {
    // Extrae el token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Agrega los datos del usuario al objeto request
        next(); // Continúa con la siguiente función en el middleware
    });
};

module.exports = verifyToken;
