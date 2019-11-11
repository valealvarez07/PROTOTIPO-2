
const db = require('../services/db-connection');

const GUARDAR_RESERVA = 'INSERT INTO reservas VALUES(?,?,?,?,?,?,?)'; 
const SELECCIONAR_RESERVA = 'SELECT * FROM reservas WHERE numeroReserva = ?';
const SELECCIONAR_TODAS_RESERVAS = 'SELECT * FROM reservas';
const ELIMINAR_RESERVA = 'DELETE FROM reservas WHERE numeroReserva = ?';

class Reserva {
    constructor (numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes) {
        this.numeroReserva = numeroReserva;
        this.idUsuario = idUsuario;
        this.numeroHabitacion = numeroHabitacion;
        this.fechaLlegada = fechaLlegada;
        this.fechaSalida = fechaSalida;
        this.modoPago = modoPago;
        this.cantidadHuespedes = cantidadHuespedes;
    }

    save() {
        const {numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes} = this;
        return new Promise (function (resolve, reject){
            db.query(GUARDAR_RESERVA, [numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes], function (error) {
                if (err) {
                    if (err.errno === 1062) {
                        resolve ({
                            error: "Este numero de reserva ya existe"
                        });
                    } else {
                        reject (err);
                    }
                }
            }); 
        }); 
    }

    static obtenerTodasReservas () {
        return new Promise (function (resolve, reject){
            db.query(SELECCIONAR_TODAS_RESERVAS, [], function (error, results) {
                if (error){
                    reject(error);
                } else {
                    // para q devuelva un array con los modelos 
                    const nuevoArray = results.map((result) => {
                        const {numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes} = result;
                        return (new Reserva (numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes))
                    })
                    
                    resolve (nuevoArray)
                }
            }); 
        })
    }

    static obtenerReservaPorNumero (numeroReserva) {
        return new Promise (function (resolve, reject){
            db.query(SELECCIONAR_RESERVA, [numeroReserva], function (error, results) {
                if (error || results[0] === undefined){
                    reject(error);
                } else {
                    const {numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes} = results[0];
                    resolve (new Reserva(numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes))
                }
            }); 
        })
    }

    static eliminarReservaPorNumero (numeroReserva) {
        return new Promise (function (resolve, reject){
            db.query(ELIMINAR_RESERVA, [numeroReserva], function (error, results) {
                if (error){
                    reject(error);
                } else {
                    resolve ()
                }
            }); 
        })
    }

    static convertToJSON(a) {
        return JSON.stringify(a);
    }

}

module.exports = Reserva;