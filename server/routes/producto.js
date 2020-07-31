const express = require('express');

const Producto = require('../models/producto');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

// ===================================
// Mostrar todas los productos
// ===================================
app.get('/producto', verificaToken ,(req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
            .skip( desde )
            .limit( 5 )
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec( (err, productos ) => {

                if( err ){
                    return res.status(500).json({
                        ok: false,
                        err
                    });    
                }

                res.json({
                    ok: true,
                    productos
                });

            });
});


// ===================================
// Mostrar una producto por ID
// ===================================
app.get('/producto/:id', verificaToken ,(req, res) => {

    let id = req.params.id;

    Producto.findById( id )
            .populate('usuario', 'nombre email')
            .populate('categoria', 'nombre')
            .exec((err, productoDB) => {

                if( err ){
                    return res.status(500).json({
                        ok: false,
                        err
                    });    
                }

                if( !productoDB ){
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'ID no existe'
                        }
                    });    
                }

                res.json({
                    ok: true,
                    producto: productoDB
                });
        
            });
});

// ===================================
// Buscar productos
// ===================================
app.get('/productos/buscar/:termino', verificaToken ,(req, res) => {

    let termino = req.params.termino;

    let expresionRegular = new RegExp( termino, 'i');

    Producto.find({ nombre: expresionRegular })
            .populate('categoria', 'nombre')
            .exec((err, productos) => {

                if( err ){
                    return res.status(500).json({
                        ok: false,
                        err
                    });    
                }

                res.json({
                    ok: true,
                    productos
                });
        
            });
});


// ===================================
// Crear nuevo producto
// ===================================
app.post('/producto', verificaToken ,(req, res) => {

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save( (err, productoDB) => {

        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });    
        }

        if( !productoDB ){
            return res.status(400).json({
                ok: false,
                err
            });    
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

// ===================================
// Actualizar producto por ID
// ===================================
app.put('/producto/:id', verificaToken ,(req, res) => { 

    let id = req.params.id;
    let body = req.body;

    Producto.findById( id, ( err, productoDB ) => {

        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });    
        }

        if( !productoDB ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });    
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save(( err, productoGuardado ) => {

            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                });    
            }

            res.json({
                ok: true,
                producto: productoGuardado
            });

        });


    });

});


// ===================================
// Borrar producto por ID
// ===================================
app.delete('/producto/:id', verificaToken ,(req, res) => {

    let id = req.params.id;

    Producto.findById( id, ( err, productoDB ) => {

        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });    
        }

        if( !productoDB ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });    
        }

        productoDB.disponible = false;

        productoDB.save(( err, productoBorrado )=>{

            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                });    
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto Borrado'
            });

        });

    });

});


module.exports = app;