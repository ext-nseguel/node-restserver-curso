// SE LLAMA A EXPRESS
const express = require('express');

// SE LLAMA A LIBRERIA ENCRIPTACION
const bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

// SE LLAMA A LIBRERIA PARA HACER VALIDACIONES 
const _ = require('underscore');

const app = express();

// SE LLAMA AL MODELO
const Usuario = require('../models/usuario');

// ACCION GET
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.delimitesde || 5;
    limite = Number(limite);

    let condiciones = {
        estado: true
    };

    Usuario.find(condiciones, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.count(condiciones, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });

        });
});

// ACCION POST
app.post('/usuario', function(req, res) {

    let body = req.body;

    // LLENO EL MODELO CON LOS DATOS DEL POST
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        role: body.role
    });

    // GUARDA EN LA BASE DE DATOS
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

// ACCION PUT
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    // SOLO SE QUIERE ACTUALIZAR LOS DATOS QUE ESTÁN EN EL ARREGLO
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

// ACCION DELETE
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

// SE EXPORTA LA CONFIGURACION DE LAS RUTAS
module.exports = app;