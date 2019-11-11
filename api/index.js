const router = require('express').Router();

const routerUsuarios = require('./usuarios');
const routerHabitaciones = require('./habitaciones');
const routerReservas = require('./reservas');

const { apiErrorHandler } = require('../middlewares/error-handler');

router.use('/usuarios', routerUsuarios); 
router.use('/habitaciones', routerHabitaciones); 
router.use('/reservas', routerReservas); 

router.use(apiErrorHandler); // cualquier error q pase en /api cae en este error handler

module.exports = router;