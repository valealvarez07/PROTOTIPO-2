CREATE DATABASE hoteleria;
USE hoteleria;

CREATE TABLE usuarios (
id INTEGER PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
tipoDocumento VARCHAR(20) NOT NULL,
numeroDocumento VARCHAR(20) NOT NULL UNIQUE,
nombre VARCHAR(45) NOT NULL,
sexo ENUM('Hombre','Mujer'),
edad INTEGER,
telefono INTEGER NOT NULL UNIQUE,
direccion VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
administrador BOOLEAN NOT NULL,
contraseña VARCHAR(20)
);

CREATE TABLE habitaciones (
numeroHabitacion INTEGER PRIMARY KEY NOT NULL UNIQUE,
valoracion ENUM('1 Estrella','2 Estrellas','3 Estrellas','4 Estrellas','5 Estrellas') NOT NULL,
imagenes VARCHAR(250) NOT NULL,
descripcion TEXT(500),
tipoHabitacion ENUM('1 Persona','2 Personas','4 Personas','Matrimonial') NOT NULL,
precio INTEGER NOT NULL,
comodidades VARCHAR(250),
servicios VARCHAR(250),
tamañoMetros2 INTEGER,
disponibilidad DATE NOT NULL
);

CREATE TABLE reservas (
numeroReserva INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
idUsuario INTEGER,
numeroHabitacion INTEGER,
fechaLlegada DATE NOT NULL,
fechaSalida DATE NOT NULL,
modoPago ENUM('Efectivo','Tarjeta') NOT NULL,
cantidadHuespedes INTEGER NOT NULL,

CONSTRAINT fkReservaCi FOREIGN KEY (idUsuario) REFERENCES usuarios (id),
CONSTRAINT fkReservaHabitacion FOREIGN KEY (numeroHabitacion) REFERENCES habitaciones (numeroHabitacion)
);