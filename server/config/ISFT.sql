DROP DATABASE IF EXISTS ISFT;

/*
    SELECT * FROM Usuarios; Lucas
    SELECT * FROM Iglesias; Christopher
    SELECT * FROM Materias; Lucas
    SELECT * FROM Requisitos; Jean
    SELECT * FROM Criterios_Evaluacion; Jean
    SELECT * FROM Calificaciones_Criterios; Alanna
    SELECT * FROM Materias_Inscritas; Jean
    SELECT * FROM Calificaciones; Christopher
    SELECT * FROM Periodos; Christopher
    SELECT * FROM Noticias; Lucas
*/

CREATE DATABASE IF NOT EXISTS ISFT;
USE ISFT;

CREATE TABLE Periodos(
	ID INT PRIMARY KEY auto_increment,
    Nombre CHAR(13), /*Sep-Dic 2022 || Es un combobox seleccionando el mes*/
    F_Inicio DATE,
    F_Final DATE,
    Estado BOOL
);


CREATE TABLE Usuarios(
	ID INT PRIMARY KEY auto_increment,
    Cod_Usuario CHAR(15),
    Nombres CHAR(60) NOT NULL,
    Apellidos CHAR(60) NOT NULL,
    Cedula CHAR(13) NOT NULL,
    Sexo CHAR(9) NOT NULL,
    F_Nacimiento DATE NOT NULL,
    Lugar_Nacimiento CHAR(60) NOT NULL,
    Nacionalidad CHAR(20) NOT NULL,
    Tel CHAR(12) NOT NULL,
    Correo CHAR(255) NOT NULL,
    Direccion CHAR(70) NOT NULL,
    Sector CHAR(20) NOT NULL,
    Provincia CHAR(20) NOT NULL,
    Iglesia CHAR(60) NOT NULL,
    Pastor BOOL NOT NULL,
    Cargo_Iglesia CHAR(60) NOT NULL,
    Tipo INT, /*0, estudiante, 1 maestro, 2 administrativo*/
    E_Aceptado BOOL,
    Periodo INT,
    Clave TEXT,
    
    CONSTRAINT FK_Periodo_User FOREIGN KEY (Periodo) REFERENCES Periodos(ID)
);

CREATE TABLE Iglesias(
	ID INT PRIMARY KEY auto_increment,
    Nombre text,
    Direccion MEDIUMTEXT,
    Pastor int,
    
    CONSTRAINT FK_Pastor_Igle FOREIGN KEY (Pastor) REFERENCES Usuarios(ID)
);



CREATE TABLE Materias(
	ID INT PRIMARY KEY auto_increment,
    ID_Maestro INT,
    Cod_Materia CHAR(7),
    Nombre CHAR(60),
    Descripcion CHAR(255),
    Nivel INT,
    Creditos INT,
    
    CONSTRAINT FK_Usuarios_Mat FOREIGN KEY (ID_Maestro) REFERENCES Usuarios(ID)
);

CREATE TABLE Requisitos(
	ID INT PRIMARY KEY auto_increment,
    Materia INT,
    Requisitos INT,
    CONSTRAINT FK_Materia FOREIGN KEY (Materia) REFERENCES Materias(ID),
    CONSTRAINT FK_Requisitos FOREIGN KEY (Requisitos) REFERENCES Materias(ID)
);
 
CREATE TABLE Criterios_Evaluacion(
    ID INT PRIMARY KEY auto_increment,
    Nombre CHAR(200),
    Materia INT,
    Periodo INT,
    Maxima_Calificacion FLOAT,
    
    CONSTRAINT FK_Materia_Asuntos foreign key (Materia) REFERENCES Materias(ID),
    CONSTRAINT FK_Periodo_Asuntos FOREIGN KEY (Periodo) REFERENCES Periodos(ID)
);

CREATE TABLE Calificaciones( 
	ID INT PRIMARY KEY auto_increment,
    ID_Usuario INT,
    Materia INT,
    Nota FLOAT,
    Periodo INT,
    
    CONSTRAINT FK_Usuario_Cal foreign key (ID_Usuario) REFERENCES Usuarios(ID),
    CONSTRAINT FK_Materia_Cal FOREIGN KEY (Materia) REFERENCES Materias(ID),
    CONSTRAINT FK_Periodo_Cal foreign key (Periodo) REFERENCES Periodos(ID)
);

CREATE TABLE Calificaciones_Criterios(
	ID INT PRIMARY KEY auto_increment,
    ID_Usuario INT,
    Nota FLOAT,
    Criterio INT,
    Periodo INT,
    
    CONSTRAINT FK_Usuario_CC foreign key (ID_Usuario) REFERENCES Usuarios(ID),
    CONSTRAINT FK_Criterio_CC FOREIGN KEY (Criterio) REFERENCES Criterios_Evaluacion(ID),
    CONSTRAINT FK_Periodo_CC foreign key (Periodo) REFERENCES Periodos(ID)
);

CREATE TABLE Materias_Inscritas(
	ID INT PRIMARY KEY auto_increment,
    Alumno INT,
    Materia INT,
    Periodo INT,
    
    CONSTRAINT FK_Alumno_MatI foreign key (Alumno) REFERENCES Usuarios(ID),
    CONSTRAINT FK_Periodo_MatI foreign key (Periodo) REFERENCES Periodos(ID),
    CONSTRAINT FK_Materia_MatI foreign key (Materia) REFERENCES Materias(ID)
);

CREATE TABLE Noticias(
    ID INT PRIMARY KEY auto_increment,
    Titulo CHAR(200),
    Subtitulo CHAR(200),
    Contenido MEDIUMTEXT,
    Imagen TEXT,
    Destacada BOOL
);

SELECT Nombre, ID FROM Materias WHERE  = 1

/*============= TRIGGERS ===============*/

Delimiter $$
CREATE TRIGGER trigger_codigoUsuario BEFORE INSERT ON Usuarios
	FOR EACH ROW
    BEGIN 
		DECLARE num_rows INTEGER;
        SELECT COUNT(*) INTO num_rows FROM Usuarios where substring(Cod_Usuario,1,4)=year(now());
        IF num_rows =0 THEN
			set NEW.Cod_Usuario=CONCAT(year(now()),"-ISFT-00001");
		ELSE
			set NEW.Cod_Usuario=CONCAT(year(now()),'-ISFT-', (SELECT lpad(cast(MAX(substring(Cod_Usuario,11,15)) AS SIGNED)+1,5,'0') FROM Usuarios WHERE substring(Cod_Usuario,1,4)=year(now())));
		END IF;
	END;
$$

/*============= INSERTS ================*/
/*

DROP TABLE Materias_Inscritas

INSERT INTO Usuarios VALUES (NULL, NULL, "Lucas Jair", "Lopez Tavarez", "001-2112123-1", "Masculino", "2006-01-06", 
"Santo Domingo Este", "Dominicano", "829-828-2190", "ljairolopez@gmail.com", "Calle 6 #23", "Ens. Isabelita", 
"Santo Domingo", "Los Tres Ojos", "Hither Trinidad", "Educacion Somijo", 1, true, "2019-0091");
v
INSERT INTO Iglesias VALUES (NULL, "Los 3 Ojos", "Av. 5ta, Respaldo los 3 Ojos", 1);

INSERT INTO Materias VALUES(null, 1, 'ILC-101', 'Crecimiento Espiritual', 'Materia de Crecimiento Espiritual, sin libro fijo', 100, 2);

INSERT INTO Criterios_Evaluacion VALUES (NULL, "Asistencia", 1, 15);
INSERT INTO Criterios_Evaluacion VALUES (NULL, "Evaluacion 1", 1, 50);
INSERT INTO Criterios_Evaluacion VALUES (NULL, "Practica Grupal", 1, 25);

UPDATE Criterios_Evaluacion SET Nombre = "Examen Final", Maxima_Calificacion = 30, Materia = 1 WHERE ID = 5
INSERT INTO Criterios_Evaluacion VALUES (NULL, "Ensayo", 1, 35);

INSERT INTO Periodos VALUES (NULL, "Ene-Mar 2023", "2023-01-01", "2023-03-30", 1);

INSERT INTO Materias_Inscritas VALUES (NULL, 2, 1, 1);
INSERT INTO Materias_Inscritas VALUES (NULL, 2, 2, 1);

INSERT INTO Calificaciones_Criterios VALUES (NULL,2, 1, 15, 1, 1);

INSERT INTO Requisitos VALUES(null, 1, null);
*/
/*
INSERT INTO Noticias VALUES (NULL, "Chicos van a hotel Catalonia Grand Dominicus", "Se divierten demasiado", "los negocios están floreciendo esta Navidad en Belén, la ciudad natal de Jesús, después de dos años de recesión debido a la pandemia de coronavirus.

Las calles están atestadas de turistas. Las reservaciones hoteleras están agotadas y meses de enfrentamientos entre israelíes y palestinos parecen casi no afectar el sector crucial del turismo.

Elias Arja, titular de la cámara hotelera de Belén, dijo que los turistas visitan ávidamente los sitios religiosos en Tierra Santa después de padecer las cuarentenas y restricciones de viajes de los últimos años. Vaticina que el rebote se prolongará en el nuevo año.

<<Prevemos un boom y excelentes negocios en 2023 porque el mundo entero, y los turistas religiosos cristianos en particular, quieren regresar a Tierra Santa>>, dijo Arja, propietario del Hotel Bethlehem.

En un día reciente, decenas de grupos de todos los continentes posaban para fotos frente a la Iglesia de la Natividad, que se alza sobre la gruta donde los cristianos creen que nació Jesús. Un gigantesco árbol de Navidad brillaba en la Plaza del Pesebre adyacente, y los turistas compraban cruces de madera de olivo y otros recuerdos.

La Navidad es la temporada pico del turismo en Belén, en la Cisjordania ocupada por Israel, a pocos kilómetros al sureste de Jerusalén. En tiempos prepandémicos, miles de peregrinos y turistas de todo el mundo llegaban para festejar.

<br><br>Pero las cifras cayeron bruscamente durante la pandemia. Aunque el turismo no se ha recuperado totalmente, las hordas de turistas elevan los ánimos.

La ciudad se convirtió en una ciudad de fantasmas, dijo Saliba Nissan frente a un enorme pesebre dentro del Bethlehem New Store, la fábrica de productos de madera de olivo de la cual es copropietario junto con su hermano. La tienda estaba llena de turistas estadounidenses.

La mayoría de los viajeros internacionales llegan vía Israel porque los palestinos no tienen un aeropuerto propio. El Ministerio de Turismo israelí prevé que llegarán unos 120.000 turistas cristianos durante la semana de Navidad.

El récord es de 150.000 en 2019, pero la cifra es más alta que la del año pasado, cuando el espacio aéreo estaba cerrado a la mayoría de los visitantes. Si Dios quiere, este año regresaremos a donde estaban las cosas antes del coronavirus y tal vez mejor, dijo el alcalde de Belén, Hanna Hanania. Dijo que unas 15.000 personas asistieron al encendido del árbol de Navidad, y que se espera la presencia de delegaciones internacionales, artistas y cantantes en los festejos. La recuperación ha comenzado significativamente, dijo Hanania, pero añadió que la violencia reciente y la ocupación israelí de Cisjordania siempre afectan el turismo en cierta medida.", "Piti.jpeg", true);


*/

/*
=================== CONSULTAS MULTIFUNCIONALES ====================

---   PARA SABER CUANTOS ALUMNOS FALTAN POR CORREGIR ---

	SELECT * FROM Materias;
    SELECT * FROM Usuarios WHERE Tipo = 0;
    SELECT * FROM Criterios_Evaluacion;
    SELECT * FROM Materias_Inscritas;
    SELECT * FROM Calificaciones_Criterios;
    SELECT * FROM Periodos;
    
    SELECT MAX(Nombre) As PeriodoMaximo FROM Periodos WHERE Estado = 1
    
    SELECT Materias.Nombre, Materias.ID AS Materia_ID, Usuarios.ID AS Usuario FROM Materias, Usuarios, Materias_Inscritas 
    WHERE Usuarios.ID = Materias_Inscritas.Alumno AND Materias.ID = Materias_Inscritas.Materia AND Materias_Inscritas.Periodo = 1 AND Usuarios.ID = 3
    
    -- INSERTS --
    
    INSERT INTO Periodos VALUES (NULL, "Ene-Mar 2023", "2023-01-01", "2023-03-30", 1);
    
    INSERT INTO Usuarios VALUES (NULL, NULL, "Lucas", "Lopez", "001-2112123-1", "Masculino", "2006-01-06", "Santo Domingo Este", "Dominicano", "829-828-2190", "ljairolopez@gmail.com", "Calle 6 #23", "Ens. Isabelita", "Santo Domingo", "Los Tres Ojos", 0, "Educacion Somijo", 1, true, 1,"$2b$10$LRJo1Pn7.KM1E8UcfZJzcepxVnE.flFZWWWocuqsn.ONhf/.T9oNu");
    INSERT INTO Usuarios VALUES (NULL, NULL, "Dariel", "Jerez", "001-2112123-1", "Masculino", "2006-01-06", "Santo Domingo Este", "Dominicano", "829-828-2190", "ljairolopez@gmail.com", "Calle 6 #23", "Ens. Isabelita", "Santo Domingo", "Los Tres Ojos", 0, "Educacion Somijo", 1, true, 1,"$2b$10$LRJo1Pn7.KM1E8UcfZJzcepxVnE.flFZWWWocuqsn.ONhf/.T9oNu");
    INSERT INTO Usuarios VALUES (NULL, NULL, "Alanna", "Segura", "001-2112123-1", "Masculino", "2006-01-06", "Santo Domingo Este", "Dominicano", "829-828-2190", "ljairolopez@gmail.com", "Calle 6 #23", "Ens. Isabelita", "Santo Domingo", "Los Tres Ojos", 0, "Educacion Somijo", 0, true, 1,"$2b$10$LRJo1Pn7.KM1E8UcfZJzcepxVnE.flFZWWWocuqsn.ONhf/.T9oNu");
    INSERT INTO Usuarios VALUES (NULL, NULL, "Luis", "Calderon", "001-2112123-1", "Masculino", "2006-01-06", "Santo Domingo Este", "Dominicano", "829-828-2190", "ljairolopez@gmail.com", "Calle 6 #23", "Ens. Isabelita", "Santo Domingo", "Los Tres Ojos", 0, "Educacion Somijo", 0, true, 1,"$2b$10$LRJo1Pn7.KM1E8UcfZJzcepxVnE.flFZWWWocuqsn.ONhf/.T9oNu");
    INSERT INTO Usuarios VALUES (NULL, NULL, "Luis", "Calderon", "001-2112123-1", "Masculino", "2006-01-06", "Santo Domingo Este", "Dominicano", "829-828-2190", "ljairolopez@gmail.com", "Calle 6 #23", "Ens. Isabelita", "Santo Domingo", "Los Tres Ojos", 1, "Educacion Somijo", 2, true, 1,"$2b$10$LRJo1Pn7.KM1E8UcfZJzcepxVnE.flFZWWWocuqsn.ONhf/.T9oNu");
    
    INSERT INTO Materias VALUES (NULL, 1, 1, "Matematicas", "Hola", 100, 2);
    INSERT INTO Materias VALUES (NULL, 1, 2, "Fisica II", "Hola", 100, 2);
    INSERT INTO Materias VALUES (NULL, 2, 3, "Formacion Humana", "Hola", 100, 2);
    INSERT INTO Materias VALUES (NULL, 2, 4, "Arquitectura", "Hola", 100, 2);    
    
    INSERT INTO Materias_Inscritas VALUES (NULL, 3, 1, 1);
    INSERT INTO Materias_Inscritas VALUES (NULL, 3, 2, 1);
    INSERT INTO Materias_Inscritas VALUES (NULL, 4, 3, 1);
    INSERT INTO Materias_Inscritas VALUES (NULL, 4, 4, 1);
    
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Asistencia", 1, 1, 10);
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Asistencia", 2, 1, 15);
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Asistencia", 3, 1, 20);
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Asistencia", 4, 1, 25);
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Examen Final", 1, 1, 30);
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Examen Final", 2, 1, 25);
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Examen Final", 3, 1, 20);
    INSERT INTO Criterios_Evaluacion VALUES (NULL, "Examen Final", 4, 1, 15);
    
    INSERT INTO Calificaciones_Criterios VALUES (NULL, 3, 10, 1, 1);
    INSERT INTO Calificaciones_Criterios VALUES (NULL, 3, 11, 6, 1);
    INSERT INTO Calificaciones_Criterios VALUES (NULL, 4, 12, 3, 1);
    INSERT INTO Calificaciones_Criterios VALUES (NULL, 4, 13, 8, 1);
    
    INSERT INTO Calificaciones VALUES (NULL, 3, 1, 100, 1);
    
    -- FIN INSERTS --
    
	SELECT Usuarios.Nombres AS "Alumno", Usuarios.ID AS Alumno_Id, Criterios_Evaluacion.Nombre AS "Criterio", 
	Calificaciones_Criterios.Nota AS "Nota", Maxima_Calificacion AS "Nota Maxima"
	FROM Usuarios
	INNER JOIN Materias_Inscritas ON Materias_Inscritas.Alumno = Usuarios.ID
	INNER JOIN Materias ON Materias_Inscritas.Materia = Materias.ID
	INNER JOIN Criterios_Evaluacion ON Criterios_Evaluacion.Materia = Materias.ID
	LEFT JOIN Calificaciones_Criterios ON Criterios_Evaluacion.ID = Calificaciones_Criterios.Criterio
    WHERE Usuarios.ID = 3 AND Materias.ID = 2 AND Materias_Inscritas.Periodo = 1;
    
	SELECT Materias.Nombre, Materias.ID AS Materia_ID, Usuarios.ID AS Usuario FROM Materias, Usuarios, Materias_Inscritas WHERE Usuarios.ID = Materias_Inscritas.Alumno AND Materias.ID = Materias_Inscritas.Materia AND Materias_Inscritas.Periodo = 1 AND Usuarios.ID = 3
    
    SELECT * FROM Calificaciones WHERE ID_Usuario = 3 AND Materia = 1 AND Periodo = 1
    
    SELECT COUNT(*) AS Cantidad FROM Usuarios WHERE E_Aceptado = true AND Tipo = 0
    SELECT COUNT(*) AS Cantidad FROM Usuarios WHERE E_Aceptado = false AND Tipo = 0
    
--- PARA SABER LA NOTA MAXIMA DE CALIFICACION DEUNA MATERIA ---

	SELECT Materias.Cod_Materia, Materias.Nombre, SUM(Criterios_Evaluacion.Maxima_Calificacion) AS "Maxima Suma"
    FROM Materias, Criterios_Evaluacion, Periodos
    WHERE Criterios_Evaluacion.Materia = Materias.ID AND Materias.ID = 1
    GROUP BY Materias.Cod_Materia, Materias.Nombre 
    
    SELECT Usuarios.Nombres AS Alumno, Criterios_Evaluacion.Nombre AS Criterio, Calificaciones_Criterios.Nota AS Nota, Maxima_Calificacion AS Nota_Maxima FROM Usuarios INNER JOIN Materias_Inscritas ON Materias_Inscritas.Alumno = Usuarios.ID INNER JOIN Materias ON Materias_Inscritas.Materia = Materias.ID INNER JOIN Criterios_Evaluacion ON Criterios_Evaluacion.Materia = Materias.ID LEFT JOIN Calificaciones_Criterios ON Criterios_Evaluacion.ID = Calificaciones_Criterios.Criterio WHERE Materias.ID = 1 AND Materias_Inscritas.Periodo = 1 AND Calificaciones_Criterios.Nota IS NOT NULL
	
    SELECT 
*/