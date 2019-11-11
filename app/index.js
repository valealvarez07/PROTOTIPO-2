
// aca solo defino las rutas

const router = require('express').Router();

const routerHabitaciones = require('./pages/habitaciones');

const { appErrorHandler } = require('../middlewares/error-handler');

router.use('/habitaciones', routerHabitaciones);
router.use(appErrorHandler);

module.exports = router;