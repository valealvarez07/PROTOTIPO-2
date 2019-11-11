const mysql = require('mysql');

const connection = mysql.createConnection({  // establecer coneccion con mysql
    host: '127.0.0.1', // localhost: 3000
    user: 'root',
    password: 'root',
    database: 'hoteleria',
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('db conectada');
    }

});

module.exports = connection;