const appErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.render('error', { // .render cuando es de app, cuando me interesa mandar la vista de error
        msg: 'Ocurrió un error inesperado. Intente nuevamente', // en la vista error.ejs llamo a la variable msg 
    });
};

const apiErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.json({
        msg: 'Internal Server Error',
    });
};

module.exports = {
    appErrorHandler,
    apiErrorHandler,
};