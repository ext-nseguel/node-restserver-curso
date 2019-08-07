const express = require('express');

const app = express();

// SE IMPORTA CONFIGURACION DE RUTAS
app.use(require('./usuario'));
app.use(require('./login'));


module.exports = app;