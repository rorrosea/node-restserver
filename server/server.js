require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Rutas
app.use(require('./routes/index'));


// Conexion de Base de Datos Mongo
mongoose.connect( process.env.URLDB,
                 {  useUnifiedTopology: true, 
                    useNewUrlParser: true, 
                    useCreateIndex: true, 
                    useFindAndModify: false 
                }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos Online');

});


app.listen(process.env.PORT, () => {
    
    console.log('Escuchando puerto:', process.env.PORT);

});