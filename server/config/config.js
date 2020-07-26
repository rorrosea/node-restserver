// PUERTO
process.env.PORT = process.env.PORT || 3000;


// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// VENCIMIENTO DEL TOKEN
// 60 SEGUNDO
// 60 MINUTOS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// SEED DE AUTENTICACION
process.env.SEED = process.env.SEED || 'esto-es-la-llave-secreta';

// BASE DE DATOS

let urlBD;

if( process.env.NODE_ENV === 'dev'){
    urlBD = 'mongodb://localhost:27017/cafe';
}else{
    
    urlBD = process.env.MONGO_URI;
}

process.env.URLDB = urlBD;

