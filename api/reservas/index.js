const router = require('express').Router();
const Reserva = require('../../models/reservas');

//Handlers para los endpoints de la API de reservas

router.get('/', (req, res, next) => {

    Reserva.obtenerTodasReservas()
    .then (function (reservas) {
        res.send (Reserva.convertToJSON(reservas));
    })

    .catch (function (err) {
        next(err);
    })
});

router.get('/:numeroReserva', (req, res, next) => {

    Reserva.obtenerReservaPorNumero(req.params.numeroReserva)
    .then (function (reserva) {
        res.send (Reserva.convertToJSON(reserva));
    })

    .catch (function (err) {
        next(err)
    })
});

router.post('/', (req, res, next) => {

    const numeroReserva = req.body.numeroReserva;
    const idUsuario = req.body.idUsuario;
    const numeroHabitacion = req.body.numeroHabitacion;
    const fechaLlegada = req.body.fechaLlegada;
    const fechaSalida = req.body.fechaSalida;
    const modoPago = req.body.modoPago;
    const cantidadHuespedes = req.body.cantidadHuespedes;

    const nuevaReserva = new Reserva (numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes);

    nuevaReserva.save()
    .then (function () {
        res.send ('creaste una reserva');
    })

    .catch (function (err) {
        console.log(err);
    })
        
});

router.delete('/:numeroReserva', (req, res, next) => {

    Reserva.eliminarReservaPorNumero(req.params.numeroReserva)
    .then (function () {
        res.send ('borraste una reserva');
        
    })

    .catch (function (err) {
        next(err)
    })
});

module.exports = router;