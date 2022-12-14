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

CREATE TABLE Estudiantes(
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
    E_Civil CHAR(15),
    C_Hijos INT,
    Enfermedad TEXT(512),
    Alergias TEXT(512),
    Ocupacion CHAR(60),
    G_Academico CHAR(20),
    Estado_Trabajo BOOL,
    Lugar_Trabajo CHAR(60),
    Dir_Trabajo CHAR(90),
    Tel_Trabajo CHAR(12),
    Cargo_Trabajo CHAR(60),/*duda*/
    H_Laboral CHAR(30),
    Estado_Estudios BOOL,
    Lugar_Estudio CHAR(60),
    Estudios CHAR(30),
    Iglesia CHAR(60),
    Pastor CHAR(60), /*Un solo*/
    Tiempo_Iglesia CHAR(30),
    Cargo_Iglesia CHAR(60),/*duda*/
    Motivacion TEXT(1024),
    Expectativas TEXT(512),
    Testimonio TEXT(2048),
    Tipo INT, /*0, estudiante, 1 maestro*/
    
    E_Aceptado BOOL,
    Clave CHAR(32)
);

INSERT INTO Estudiantes VALUES (NULL,"2019-0024","JUAN","RIVERA GIL","402-0102912-1", 12/10/2000,"clinica la angelita","Dominicano","(809)288-1232","J.R.G@gmail.com",
"C. Pedro Livio Cedeño #66","Ensanche Luperon","Distrito Nacional","Soltero","0","Asma","Al camaron","Poltero de escuela","Secundaria","activo",
"Instituto Tecnico Salesiano(ITESA)","Av. Albert Thomas 66, Santo Domingo 10306","(809)-120-1341","portero","4h","activo","uasd","Ingieneria civil","Cristo Redentor",
"Jose Cuello","4 años","Encargado del coro", "la iglesia y mi familia","completar el curso","Dios me saco de las tinieblas",0, "aceptado","123456");

INSERT INTO Estudiantes VALUES (NULL,"2019-0013","Rodolfo","Garcia Moreno","402-1726821-0", 02/11/1999,"Hospital Plaza de la salud","Dominicano","(809)121-1231","R.G.M@gmail.com",
"C. Pedro Livio Cedeño #67","Ensanche Luperon","Distrito Nacional","casado","2","Diabetes","Canela","Secretario","Tecnico","activo",
"Instituto Tecnico Salesiano(ITESA)","Av. Albert Thomas 66, Santo Domingo 10306","(809)-120-1341","secretario","6h","activo","uasd","arquitecto","Cristo Redentor",
"Jose Cuello","2 años","evangelisador","mis hermanos de la iglesia","completar el curso","Dios es mi salvador",0, "aceptado","123456");

CREATE TABLE Maestros(
	ID INT PRIMARY KEY auto_increment,
    Cod_Maestro CHAR(9),
    Nombres CHAR(60),
    Apellidos CHAR(60),
    Cedula CHAR(13),
    F_Nacimiento DATE,
    Lugar_Nacimiento CHAR(60),
    Nacionalidad CHAR(20),
    Tel CHAR(12),
    Correo CHAR(255),
    Direccion CHAR(70),
    Sector CHAR(20),
    Provincia CHAR(20),
    E_Civil CHAR(15),
    C_Hijos INT,
    Enfermedad TEXT(512),
    Alergias TEXT(512),
	Ocupacion CHAR(60),
    G_Academico CHAR(20),
    Estado_Trabajo BOOL,
    Lugar_Trabajo CHAR(60),
    Dir_Trabajo CHAR(90),
    Tel_Trabajo CHAR(12),
    Cargo_Trabajo CHAR(60),
    H_Laboral CHAR(30),
    Estado_Estudios BOOL,
    Lugar_Estudio CHAR(60),
    Estudios CHAR(30),
    Iglesia CHAR(60),
    Pastor CHAR(60), /*Un solo*/
    Tiempo_Iglesia CHAR(30),
    Cargo_Iglesia CHAR(60),
    Motivacion TEXT(1024),
    Expectativas TEXT(512),
    Testimonio TEXT(2048),
    Tipo INT, /*0, estudiante, 1 maestro*/
    
    E_Aceptado BOOL, /*???*/
    Clave CHAR(32)
);

INSERT INTO Maestros VALUES (NULL,"DNR-0001", "Marlon","Villa Mella","402-1823012-1", 03/12/1998,"Clininca la angleita ","Dominicano","(809)112-8765","M.V.M@gmail.com",
"C. Pedro Livio Cedeño #69","Ensanche Luperon","Distrito Nacional","casado","6",null,null,"P.matematicas","Universitario","activo",
"Instituto Tecnico Salesiano(ITESA)","Av. Albert Thomas 66, Santo Domingo 10306","(809)-120-1341","profesor","8h","inactivo",null,null,"Cristo Redentor",
"Jose Cuello","12 años","musico del coro","mis hermanos de la iglesia","completar el curso","Dios es mi salvador",0, "aceptado","123456");

INSERT INTO Maestros VALUES (NULL,"DNR-OOO2","Jorge","Ponce de Leon","402-1342341-1", 05/09/1997,"Hospital Plaza de la salud","Dominicano","(809)123-1221","J.P.L@gmail.com",
"C. Pedro Livio Cedeño #12","Ensanche Luperon","Distrito Nacional","casado","4","ARTRITIS","","Guanabana","universitario","activo",
"Instituto Tecnico Salesiano(ITESA)","Av. Albert Thomas 66, Santo Domingo 10306","(809)-120-1341","P.Fisica","8h","inactivo",null,null,"Cristo Redentor",
"Jose Cuello","10 años","preparador del altar","mis hermanos de la iglesia","completar el curso","Cristo viene",0, "aceptado","123456");

CREATE TABLE Materias(
	ID INT PRIMARY KEY auto_increment,
    ID_Maestro INT,
    Cod_Materia CHAR(9),
    Nombre CHAR(60),
    Descripcion CHAR(256),
    Nivel INT,
    Creditos INT,
    
    CONSTRAINT FK_Maestros_Mat FOREIGN KEY (ID_Maestro) REFERENCES Maestros(ID)
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
    ID_Estudiante INT,
    Materia INT,
    Nota FLOAT,
    Asunto INT
    Periodo INT,
    
    CONSTRAINT FK_Estudiante_Cal foreign key (ID_Estudiante) REFERENCES Estudiantes(ID),
    CONSTRAINT FK_Maestro_Cal foreign key (ID_Maestro) REFERENCES Maestros(ID),
    CONSTRAINT FK_Materia_Cal FOREIGN KEY (Materia) REFERENCES Materias(ID)
    CONSTRAINT FK_Periodo_Cal foreign key (Periodo) REFERENCES Periodos(ID)
);

CREATE TABLE Periodos(
	ID INT PRIMARY KEY auto_increment,
    Nombre CHAR(12) /*Sep-Dic 2022 || Es un combobox seleccionando el mes*/
)

CREATE TABLE Noticias(
    ID INT PRIMARY KEY auto_increment,
    Titulo CHAR(200),
    Subtitulo CHAR(200),
    Contenido MEDIUMTEXT,
    Imagen LONGBLOB
)