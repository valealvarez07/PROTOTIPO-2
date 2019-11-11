
const db = require('../services/db-connection');

const GUARDAR_HABITACION = 'INSERT INTO habitaciones VALUES(?,?,?,?,?,?,?,?,?,?)'; 
const SELECCIONAR_HABITACION = 'SELECT * FROM habitaciones WHERE numeroHabitacion = ?';
const SELECCIONAR_TODAS_HABITACIONES = 'SELECT * FROM habitaciones';
const ELIMINAR_HABITACIONES = 'DELETE FROM habitaciones WHERE numeroHabitacion = ?';
//const MODIFICAR_HABITACION = 'UPDATE habitaciones SET numeroHabitacion = ?, valoracion = ?, imagenes = ?, descripcion = ?, tipoHabitacion = ?, precio = ?, comodidades = ?, servicios = ?, tamañoMetros2 = ?, disponibilidad = ?';
const MODIFICAR_HABITACION = 'UPDATE habitaciones SET numeroHabitacion = ?, valoracion = ?, imagenes = ?, descripcion = ?, tipoHabitacion = ?, precio = ?, comodidades = ?, servicios = ?, tamañoMetros2 = ?, disponibilidad = ? WHERE id=?';

class Habitacion {
    constructor (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad) {
        this.numeroHabitacion = numeroHabitacion;
        this.valoracion = valoracion;
        this.imagenes = imagenes;
        this.descripcion = descripcion;
        this.tipoHabitacion = tipoHabitacion;
        this.precio = precio;
        this.comodidades = comodidades;
        this.servicios = servicios;
        this.tamañoMetros2 = tamañoMetros2;
        this.disponibilidad = disponibilidad;
    }

    save() {
        const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = this;
        return new Promise (function (resolve, reject){
            db.query(GUARDAR_HABITACION, [numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad], function (error) {
                if (err) {
                    if (err.errno === 1062) {
                        resolve ({
                            error: "Este numero de habitacion ya existe"
                        });
                    } else {
                        reject (err);
                    }
                }
            }); 
        }); 
    }

    static obtenerTodasHabitaciones () {
        return new Promise (function (resolve, reject){
            db.query(SELECCIONAR_TODAS_HABITACIONES, [], function (error, results) {
                if (error){
                    reject(error);
                } else {
                    // para q devuelva un array con los modelos 
                    const nuevoArray = results.map((result) => {
                        const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = result;
                        return (new Habitacion (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad))
                    })
                    
                    resolve (nuevoArray)
                }
            }); 
        })
    }

    static obtenerHabitacionPorNumero (numeroHabitacion) {
        return new Promise (function (resolve, reject){
            db.query(SELECCIONAR_HABITACION, [numeroHabitacion], function (error, results) {
                if (error || results[0] === undefined){
                    reject(error);
                } else {
                    const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = results[0];
                    resolve (new Habitacion(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad))
                }
            }); 
        })
    }

    static eliminarHabitacionPorNumero (numeroHabitacion) {
        return new Promise (function (resolve, reject){
            db.query(ELIMINAR_HABITACIONES, [numeroHabitacion], function (error, results) {
                if (error){
                    reject(error);
                } else {
                    resolve ()
                }
            }); 
        })
    }

    /*
    static modificarHabitacion(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad) {
        const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = this;
        return new Promise (function (resolve, reject){
            db.query(MODIFICAR_HABITACION, [numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad], function (error) {
                if (err) {
                    if (err.errno === 1062) {
                        resolve ({
                            error: "Esta habitacion ya existe"
                        });
                    } else {
                        reject (err);
                    }
                }
            }); 
        }); 
    }
    */
    

    // /*
    static modificarHabitacion (numeroHabitacion) {
        const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = this;
        return new Promise (function (resolve, reject){
            db.query(MODIFICAR_HABITACION, [numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad], function (error) {
                if (err) {
                    if (err.errno === 1062) {
                        resolve ({
                            error: "Esta habitacion ya existe"
                        });
                    } else {
                        reject (err);
                    }
                }
            }); 
        });     
    }
    // */
   
    static convertToJSON(a) {
        return JSON.stringify(a);
    }
  
}

module.exports = Habitacion;