const router = require('express').Router();
const Usuario = require('../../models/usuarios');

//Handlers para los endpoints de la API de usuarios

router.get('/', (req, res, next) => {

    Usuario.obtenerTodosUsuarios()
    .then (function (usuarios) {
        res.send (Usuario.convertToJSON(usuarios));
    })

    .catch (function (err) {
        //if (err) throw err;
        console.log('error');
    })
});

router.get('/:id', (req, res, next) => {

    Usuario.obtenerUsuarioPorId(req.params.id)
    .then (function (usuario) {
        res.send (Usuario.convertToJSON(usuario));
    })

    .catch (function (err) {
        next(err)
    })
});

router.post('/', (req, res, next) => {

    const id = req.body.id;
    const tipoDocumento = req.body.tipoDocumento;
    const numeroDocumento = req.body.numeroDocumento;
    const nombre = req.body.nombre;
    const sexo = req.body.sexo;
    const edad = req.body.edad;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const email = req.body.email;
    const administrador = req.body.administrador;
    const contraseña = req.body.contraseña;

    const nuevoUsuario = new Usuario (id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña);

    nuevoUsuario.save()
    .then (function () {
        res.send ('creaste un usuario');
    })

    .catch (function (err) {
        console.log(err);
    })
        
});

router.delete('/:id', (req, res, next) => {

    Usuario.eliminarUsuarioPorId(req.params.id)
    .then (function () {
        res.send ('borraste un usuario');
        
    })

    .catch (function (err) {
        next(err)
    })
});


module.exports = router;