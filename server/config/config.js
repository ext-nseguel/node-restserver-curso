//======================
// Puerto
//======================

process.env.PORT = process.env.PORT || 3000;

//======================
// Entorno
//======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================
// Vencimiento del Token
//======================
// 60 segundos 
// 60 minutos
// 24 horas 
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//========================
// SEED de autentificación
//========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrolo';

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

//======================
// Client Google ID
//======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '191536845672-neu6r3so5sc445b5di3sb78e8b94fnce.apps.googleusercontent.com';