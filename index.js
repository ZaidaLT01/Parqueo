//importacion de libs
const express = require('express');
const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
const authRutas = require('./rutas/authRutas');
const Usuario = require('./models/Usuario');
require('dotenv').config();
const app = express();
//conjunto para almacenar token en cada solicitud
const revokedTokens = new Set();

//rutas
const vehiculoRutas = require('./rutas/vehiculoRutas');
const espacioRutas = require('./rutas/espacioRutas');

//configuraciones enviroment
const PORT = process.env.PORT||9000;
const MONGO_URI = process.env.MONGO_URI;

//manejo de JSON
app.use(express.json());

//Conexion con MongoDB
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('Conexion exitosa');
    app.listen(PORT,()=>{console.log("servidor express corriendo en el puerto: "+PORT) })
}
).catch(error=>console.log('Error de conexion', error));



 const autenticar = async (req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            res.status(401).json({mensaje: 'No existe el token de autenticacion'});
        
        // Verificar si el token está en la lista de tokens revocados
        if (revokedTokens.has(token))
        return res.status(401).json({ mensaje: 'Token revocado' });

        //continua
        const decodificar = jwt.verify(token, 'clave_secreta');
        req.usuario = await  Usuario.findById(decodificar.usuarioId);
        next();
    }
    catch(error){
        res.status(400).json({ error: 'token Invalido'});
    }
};

app.post('/cerrarsesion', autenticar, (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    // Agregar el token a la lista de revocados
    revokedTokens.add(token);

    res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
});

app.use('/auth', authRutas);
app.use('/vehiculos', autenticar, vehiculoRutas);
app.use('/espacios', autenticar, espacioRutas);