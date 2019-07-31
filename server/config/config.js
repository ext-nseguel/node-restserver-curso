//======================
// Puerto
//======================

process.env.PORT = process.env.PORT || 3000;

//======================
// Entorno
//======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================
// Base de datos
//======================

let UrlDB;

if (process.env.NODE_ENV === 'dev') {
    UrlDB = 'mongodb://localhost:27017/cafe';

} else {
    UrlDB = 'mongodb+srv://nicolas:U6sbQwrhidRQIj2N@cluster0-bkjzg.mongodb.net:27017/cafe';
};

process.env.URL_CONN = UrlDB;