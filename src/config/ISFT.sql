DROP DATABASE IF EXISTS ISFT;

/*
	SELECT * FROM Estudiantes
    SELECT * FROM Maestros
    SELECT * FROM Materias
    SELECT * FROM Requisitos
    SELECT * FROM Calificaciones
    SELECT * FROM Periodos
*/

CREATE DATABASE IF NOT EXISTS ISFT;
USE ISFT;

CREATE TABLE Usuario(
	ID INT PRIMARY KEY auto_increment, ---
    Cod_Estudiante CHAR(9), ---
    Nombres CHAR(60),
    Apellidos CHAR(60),
    Cedula CHAR(13),
    Sexo CHAR(9),
    F_Nacimiento DATE,
    Lugar_Nacimiento CHAR(60),
    Nacionalidad CHAR(20),
    Tel CHAR(12),
    Correo CHAR(255),
    Direccion CHAR(70),
    Sector CHAR(20),
    Provincia CHAR(20),
    Iglesia CHAR(60),
    Pastor CHAR(60), /*Un solo*/
    Tiempo_Iglesia CHAR(30),
    Cargo_Iglesia CHAR(60),/*duda*/
    Tipo INT, /*0, estudiante, 1 maestro, 2 administrativo*/
    
    E_Aceptado BOOL,
    Clave CHAR(32)
);

CREATE TABLE Materias(
	ID INT PRIMARY KEY auto_increment,
    ID_Usuario INT,
    Cod_Materia CHAR(9),
    Nombre CHAR(60),
    Descripcion CHAR(256),
    Nivel INT,
    Creditos INT,
    
    CONSTRAINT FK_Usuarios_Mat FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID)
);

INSERT INTO Materias VALUES(null, 1, 'GNDR-0001', 'Matematicas', 'Materia de Matematicas', 100, 10)
INSERT INTO Materias VALUES(null, 2, 'GNDR-0002', 'Sociales', 'Materia de Sociales', 100, 5)
INSERT INTO Materias VALUES(null, 2, 'GNDR-0003', 'Español', 'Materia de Español', 100, 2)

CREATE TABLE Requisitos(
	ID INT PRIMARY KEY auto_increment,
    Materia INT,
    Requisitos INT,
    CONSTRAINT FK_Materia FOREIGN KEY (Materia) REFERENCES Materias(ID),
    CONSTRAINT FK_Requisitos FOREIGN KEY (Requisitos) REFERENCES Materias(ID)
);

INSERT INTO Requisitos VALUES(null, 1, null)
INSERT INTO Requisitos VALUES(null, 2, null)
INSERT INTO Requisitos VALUES(null, 3, null)

CREATE TABLE Criterios_Evaluacion{
    ID INT PRIMARY KEY auto_increment,
    Nombre CHAR(200),
    Materia INT

    CONSTRAINT FK_Materia_Asuntos foreign key (Materia) REFERENCES Materias(ID)
}

INSERT INTO Criterios_Evaluacion VALUES(null, 'Asistencia', 1,)
INSERT INTO Criterios_Evaluacion VALUES(null, 'Asistencia', 2,)
INSERT INTO Criterios_Evaluacion VALUES(null, 'Asistencia', 3,)

CREATE TABLE Calificaciones(
	ID INT PRIMARY KEY auto_increment,
    ID_Usuario INT,
    Materia INT,
    Nota FLOAT,
    Asunto INT
    Periodo INT,
    
    CONSTRAINT FK_Usuario_Cal foreign key (ID_Usuario) REFERENCES Usuarios(ID),
    CONSTRAINT FK_Materia_Cal FOREIGN KEY (Materia) REFERENCES Materias(ID)
    CONSTRAINT FK_Periodo_Cal foreign key (Periodo) REFERENCES Periodos(ID)
);

CREATE TABLE Periodos(
	ID INT PRIMARY KEY auto_increment,
    Nombre CHAR(12) /*Sep-Dic 2022 || Es un combobox seleccionando el mes*/
    F_Inicio DATE,
    F_Final DATE
)

CREATE TABLE Noticias(
    ID INT PRIMARY KEY auto_increment,
    Titulo CHAR(200),
    Subtitulo CHAR(200),
    Contenido MEDIUMTEXT,
    Imagen LONGBLOB
)