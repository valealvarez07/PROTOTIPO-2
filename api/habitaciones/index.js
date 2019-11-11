const router = require('express').Router(); 
const Habitacion = require('../../models/habitaciones');

//Handlers para los endpoints de la API de habitaciones

router.get('/', (req, res, next) => {

    Habitacion.obtenerTodasHabitaciones()
    .then (function (habitaciones) {
        res.send (Habitacion.convertToJSON(habitaciones));
        //res.send (habitaciones);
    })

    .catch (function (err) {
        next(err)
    })
});

router.get('/:numeroHabitacion', (req, res, next) => {

    Habitacion.obtenerHabitacionPorNumero(req.params.numeroHabitacion)
    .then (function (habitacion) {
        res.send (Habitacion.convertToJSON(habitacion));
    })

    .catch (function (err) {
        next(err)
    })
});

router.post('/', (req, res, next) => {

    const numeroHabitacion = req.body.numeroHabitacion;
    const valoracion = req.body.valoracion;
    const imagenes = req.body.imagenes;
    const descripcion = req.body.descripcion;
    const tipoHabitacion = req.body.tipoHabitacion;
    const precio = req.body.precio;
    const comodidades = req.body.comodidades;
    const servicios = req.body.servicios;
    const tamañoMetros2 = req.body.tamañoMetros2;
    const disponibilidad = req.body.disponibilidad;

    const nuevaHabitacion = new Habitacion (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad);

    nuevaHabitacion.save()
    .then (function () {
        res.send ('creaste una habitacion');
    })

    .catch (function (err) {
        console.log(err);
    })
        
});


router.delete('/:numeroHabitacion', (req, res, next) => {

    Habitacion.eliminarHabitacionPorNumero(req.params.numeroHabitacion)
    .then (function () {
        res.send ('borraste una habitacion');
        
    })

    .catch (function (err) {
        next(err)
    })
});

router.put('/:numeroHabitacion', (req, res, next) => {

    const numeroHabitacion = req.body.numeroHabitacion;
    const valoracion = req.body.valoracion;
    const imagenes = req.body.imagenes;
    const descripcion = req.body.descripcion;
    const tipoHabitacion = req.body.tipoHabitacion;
    const precio = req.body.precio;
    const comodidades = req.body.comodidades;
    const servicios = req.body.servicios;
    const tamañoMetros2 = req.body.tamañoMetros2;
    const disponibilidad = req.body.disponibilidad;

    const nuevaHabitacion = new Habitacion (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad);

    //nuevaHabitacion.modificarHabitacion(req.params.numeroHabitacion, req.params.valoracion, req.params.imagenes, req.params.descripcion, req.params.tipoHabitacion, req.params.precio, req.params.comodidades, req.params.servicios, req.params.tamañoMetros2, req.params.disponibilidad)
    nuevaHabitacion.modificarHabitacion(req.params.numeroHabitacion)
    .then (function () {
        res.send ('modificaste una habitacion');
    })

    .catch (function (err) {
        //next(err)
        console.log(err);
    })
        
});


module.exports = router;