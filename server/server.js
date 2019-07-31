// ARCHIVO DE CONFIGURACIONES
require('./config/config');

// SE DECLARA LA LIBRERIA PARA MONGODB
const mongoose = require('mongoose');

// SE DECLARA EXPRESS
const express = require('express');
const app = express();

// PARA OBTENER VALORES DEL POST DEL BODY
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// SE IMPORTA CONFIGURACION DE RUTAS
app.use(require('./routes/usuario'))

// CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.URL_CONN, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => { console.log('Base de datos ONLINE!') })
    .catch((err) => { throw err });

// LEVANTAMIENTO DEL SERVER    
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});