
const db = require('../services/db-connection');

const GUARDAR_USUARIO = 'INSERT INTO usuarios VALUES(?,?,?,?,?,?,?,?,?,?,?)'; 
const SELECCIONAR_USUARIO = 'SELECT * FROM usuarios WHERE id = ?';
const SELECCIONAR_TODOS_USUARIOS = 'SELECT * FROM usuarios';
const ELIMINAR_USUARIO = 'DELETE FROM usuarios WHERE id = ?';

class Usuario {
    constructor (id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña) {
        this.id = id;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.nombre = nombre;
        this.sexo = sexo;
        this.edad = edad;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email;
        this.administrador = administrador;
        this.contraseña = contraseña;
    }

    save() {
        const {id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña} = this;
        return new Promise (function (resolve, reject){
            db.query(GUARDAR_USUARIO, [id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña], function (error) {
                if (err) {
                    if (err.errno === 1062) {
                        resolve ({
                            error: "Esta id de usuario ya existe"
                        });
                    } else {
                        reject (err);
                    }
                }
            }); 
        }); 
    }

    static obtenerTodosUsuarios () {
        return new Promise (function (resolve, reject){
            db.query(SELECCIONAR_TODOS_USUARIOS, [], function (error, results) {
                if (error){
                    reject(error);
                } else {
                    // para q devuelva un array con los modelos 
                    const nuevoArray = results.map((result) => {
                        const {id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña} = result;
                        return (new Usuario (id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña))
                    })
                    
                    resolve (nuevoArray)
                }
            }); 
        })
    }

    static obtenerUsuarioPorId (id) {
        return new Promise (function (resolve, reject){
            db.query(SELECCIONAR_USUARIO, [id], function (error, results) {
                if (error || results[0] === undefined){
                    reject(error);
                } else {
                    const {id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña} = results[0];
                    resolve (new Usuario(id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña))
                }
            }); 
        })
    }

    static eliminarUsuarioPorId (id) {
        return new Promise (function (resolve, reject){
            db.query(ELIMINAR_USUARIO, [id], function (error, results) {
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

module.exports = Usuario;