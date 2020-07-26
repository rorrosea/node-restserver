// PUERTO

process.env.PORT = process.env.PORT || 3000;


// ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// BASE DE DATOS

let urlBD;

if( process.env.NODE_ENV === 'dev'){
    urlBD = 'mongodb://localhost:27017/cafe';
}else{
    
    urlBD = 'mongodb+srv://rorrosea:30lfMCqdLGN5oQCF@cluster0.5kybg.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlBD;