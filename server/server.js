// ARCHIVO DE CONFIGURACIONES
require('./config/config');

// SE DECLARA LA LIBRERIA PARA MONGODB
const mongoose = require('mongoose');

const path = require('path');

// SE DECLARA EXPRESS
const express = require('express');
const app = express();

// PARA OBTENER VALORES DEL POST DEL BODY
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// HABILITAR LA CARPERTA PUBLIC
//app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(__dirname + '/public'));


// CONFIGURACION GLOBAL DE RUTAS
app.use(require('./routes/index'));

// CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.URL_CONN, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => { console.log('Base de datos ONLINE!') })
    .catch((err) => { throw err });

// LEVANTAMIENTO DEL SERVER    
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});