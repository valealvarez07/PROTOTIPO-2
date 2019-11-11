const environment = process.env.NODE_ENV; // para diferenciar el codigo si estoy en desarrollo o en produccion

const environmentConfigis = {};

if (environment === 'production') {
    // TODO: Modificar environmentConfigis según sea necesario
} else {
    // TODO: Modificar environmentConfigis según sea necesario
}

module.exports = {
    ...environmentConfigis,
    PORT: 3000,
    static: './public',
};