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


// GOOGLE CLIENTE ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '563034170262-0fae73jml9ckl7bthghb78eo2tcolq8q.apps.googleusercontent.com';

process.env.URLDB = urlBD;

