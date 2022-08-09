const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 8080;

//CONEXION DB
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

if(conexion.connect()){
    console.log("Conexion exitosa!!");
}

conexion.connect((err) => {
    if (err) {
        console.error(`Error en la conexion: ${err.stack}`);
        return;
    }
    console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
})

//SETINGS
app.set('appName', 'GoMarket');

//SETTINGS HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/pages'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//RUTAS
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/vinos', (req, res) => {
    
    let sql = 'SELECT * FROM vinos'

    conexion.query(sql, (err, result) => {
        if(err) throw err;
        res.render('vinos', {
            results: result,
        });
    });
});

app.listen(port, () => {
    console.log('Servidor funcionando');
    console.log('Nombre de la app: ' + app.get('appName'));
})