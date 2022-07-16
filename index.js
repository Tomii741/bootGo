const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const app = express();
const port = 3000;

//SETINGS
app.set('appName', 'GoMarket');

//SETTINGS EJS
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.static('public'));

//RUTAS
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log('Servidor funcionando');
    console.log('Nombre de la app: ' + app.get('appName'));
})