const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const appRouter = require('./app');

const app = express();

// Configuraciones de express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(express.static(config.static));

// Asignar middlewares globales // como basic auth o autenticacion de usuario, y app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', apiRouter); // las rutas de la api siempre tienen el prefijo /api y despues su ruta propia
app.use(appRouter); // no van con /api ni nada

app.listen(config.PORT, () => {
    console.log('Aplicación levantanda')
});

