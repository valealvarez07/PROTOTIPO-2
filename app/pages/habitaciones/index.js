const router = require('express').Router();
const Habitacion = require('../../../models/habitaciones');

router.get('/', (req, res, next) => {

    Habitacion.obtenerHabitacion()
    .then (function (habitaciones){
        res.render ('habitaciones', {
            habitaciones: habitaciones,
        })
    })

    .catch (function (err){
        console.log('error');
    })
});

module.exports = router;