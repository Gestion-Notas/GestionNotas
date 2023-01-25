const mysql2 = require("mysql2");
require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const noticiasImgUpload = require("./routes/index");

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "ISFT",
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use("/noticias", noticiasImgUpload);

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).send("Token Needed");
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "auth failed" });
      } else {
        db.query(
          `select * from Usuarios where ID=${decoded.id}`,
          (err, result) => {
            req.auth = {
              token,
              user: result.data,
            };
            next();
          }
        );
      }
    });
  }
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM Usuarios WHERE Cod_Usuario = ? AND E_Aceptado = 1; ",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].Clave, (error, response) => {
            if (response) {
              const id = result[0].ID;
              const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 28800,
              });
              res.json({ auth: true, token: token, result: result });
            } else {
              res.send(err);
            }
          });
        } else {
          res.send(err);
        }
      }
    }
  );
});

app.get("/auth", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).send("No Token");
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ auth: false, message: "auth failed" });
      } else {
        db.query(
          `select * from Usuarios where ID=${decoded.id}`,
          (err, result) => {
            res.send({
              auth: true,
              token,
              user: result[0],
            });
          }
        );
      }
    });
  }
});



app.get("/getPensum100", (req, res) => {
  db.query("SELECT * FROM Materias WHERE Nivel = 100", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Se mando el 100")
      res.send(result);
    }
  });
});

app.get("/getPensum200", (req, res) => {
  db.query("SELECT * FROM Materias WHERE Nivel = 200", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/getPensum300", (req, res) => {
  db.query("SELECT * FROM Materias WHERE Nivel = 300", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getIglesiasPublic", (req, res) => {
  db.query("SELECT Nombre FROM Iglesias", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post("/sumbitAdmisiones", (req, res) => {
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const cedula = req.body.cedula;
  const sexo = req.body.sexo;
  const f_nacimiento = req.body.f_nacimiento;
  const lugar_nacimiento = req.body.lugar_nacimiento;
  const nacionalidad = req.body.nacionalidad;
  const tel = req.body.tel;
  const correo = req.body.correo;
  const direccion = req.body.direccion;
  const sector = req.body.sector;
  const provincia = req.body.provincia;
  const iglesia = req.body.iglesia;
  const cargo_iglesia = req.body.cargo_iglesia;
  bcrypt.hash(req.body.cedula, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO Usuarios VALUES (NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 0, false, ?)",
      [
        nombres,
        apellidos,
        cedula,
        sexo,
        f_nacimiento,
        lugar_nacimiento,
        nacionalidad,
        tel,
        correo,
        direccion,
        sector,
        provincia,
        iglesia,
        cargo_iglesia,
        hash,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
});
app.get("/getNoticias", (req, res) => {
  db.query("SELECT * FROM Noticias", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getIglesias", (req, res) => {
  db.query("SELECT * FROM Iglesias", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getNoticiasDetails/:id", (req, res) => {
  db.query(
    "SELECT * FROM Noticias WHERE ID=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(4001, () => {
  console.log("Server Running at port 4001");
});

app.get;

/* INICIO DE RUTAS PRIVADAS */

app.post("/getMateriasMaestros", (req, res) => {
  const id = req.body.id;

  db.query("SELECT Nombre, ID FROM Materias WHERE ID_Maestro   = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* ==== CRUD USUARIOS ==== */
app.get("/getUsuarios", (req, res) => {
  db.query("SELECT * FROM Usuarios", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/insertUsuarios", (req, res) => {
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const cedula = req.body.cedula;
  const sexo = req.body.sexo;
  const f_nacimiento = req.body.f_nacimiento;
  const lugar_nacimiento = req.body.lugar_nacimiento;
  const nacionalidad = req.body.nacionalidad;
  const tel = req.body.tel;
  const correo = req.body.correo;
  const direccion = req.body.direccion;
  const sector = req.body.sector;
  const provincia = req.body.provincia;
  const iglesia = req.body.iglesia;
  const pastor = req.body.pastor;
  const cargo_iglesia = req.body.cargo_iglesia;
  const tipo = req.body.tipo;
  const e_aceptado = req.body.e_aceptado;

  bcrypt.hash(req.body.clave, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO Usuarios VALUES (NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombres,
        apellidos,
        cedula,
        sexo,
        f_nacimiento,
        lugar_nacimiento,
        nacionalidad,
        tel,
        correo,
        direccion,
        sector,
        provincia,
        iglesia,
        pastor,
        cargo_iglesia,
        tipo,
        e_aceptado,
        hash,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
});

app.put("/updateUsuarios", (req, res) => {
  const id = req.body.id;
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const cedula = req.body.cedula;
  const sexo = req.body.sexo;
  const f_nacimiento = req.body.f_nacimiento;
  const lugar_nacimiento = req.body.lugar_nacimiento;
  const nacionalidad = req.body.nacionalidad;
  const tel = req.body.tel;
  const correo = req.body.correo;
  const direccion = req.body.direccion;
  const sector = req.body.sector;
  const provincia = req.body.provincia;
  const iglesia = req.body.iglesia;
  const pastor = req.body.pastor;
  const cargo_iglesia = req.body.cargo_iglesia;
  const tipo = req.body.tipo;
  const e_aceptado = req.body.e_aceptado;

  db.query(
    "UPDATE Usuarios SET Nombres=?, Apellidos=?, Cedula=?, Sexo=?, F_Nacimiento=?, Lugar_Nacimiento=?, Nacionalidad=?,Tel=?, Correo=?, Direccion=?, Sector=?, Provincia=?, Iglesia=?, Pastor=?, Cargo_Iglesia=?, Tipo=?, E_Aceptado=? WHERE ID=?;",
    [
      nombres,
      apellidos,
      cedula,
      sexo,
      f_nacimiento,
      lugar_nacimiento,
      nacionalidad,
      tel,
      correo,
      direccion,
      sector,
      provincia,
      iglesia,
      pastor,
      cargo_iglesia,
      tipo,
      e_aceptado,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getusuariosUpdate", (req, res) => {
  const id = req.body.id;
  db.query("SELECT * FROM Usuarios WHERE ID=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* ==== FIN  USUARIOS ==== */

/* ==== CRUD MATERIAS ==== */

app.get("/getMaterias", (req, res) => {
  db.query("SELECT * FROM Materias", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/insertMaterias", (req, res) => {
  const id_maestro = req.body.id_maestro;
  const cod_materia = req.body.cod_materia;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const nivel = req.body.nivel;
  const creditos = req.body.creditos;

  db.query(
    "INSERT INTO Materias VALUES (NULL, ?, ?, ?, ?, ?, ?)",
    [id_maestro, cod_materia, nombre, descripcion, nivel, creditos],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateMaterias", (req, res) => {
  const id = req.body.id;
  const id_maestro = req.body.id_maestro;
  const cod_materia = req.body.cod_materia;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const nivel = req.body.nivel;
  const creditos = req.body.creditos;

  db.query(
    "UPDATE Materias SET ID_Maestro = ?, Cod_Materia = ?, Nombre = ?, Descripcion = ?, Nivel = ?, Creditos =? WHERE ID = ?",
    [id_maestro, cod_materia, nombre, descripcion, nivel, creditos, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getmateriasUpdate", (req, res) => {
  const id = req.body.id;
  db.query("SELECT * FROM Materias WHERE ID = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* ==== FIN  MATERIAS ==== */

/* ==== CRUD NOTICIAS ==== */

app.get("/getNoticias", (req, res) => {
  db.query("SELECT * FROM Noticias", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/insertNoticias", (req, res) => {
  const titulo = req.body.titulo;
  const subtitulo = req.body.subtitulo;
  const contenido = req.body.contenido;
  const imagen = req.body.imagen;
  const destacada = req.body.destacada;

  db.query(
    "INSERT INTO Noticias VALUES (NULL, ?, ?, ?, ?, ?)",
    [titulo, subtitulo, contenido, imagen, destacada],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateNoticias", (req, res) => {
  const fs = require("fs");

  const id = req.body.id;
  const titulo = req.body.titulo;
  const subtitulo = req.body.subtitulo;
  const contenido = req.body.contenido;
  const imagen = req.body.imagen;
  const destacada = req.body.destacada;
  db.query(`SELECT * FROM Noticias WHERE ID= ${id}`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const pathDeletable = "public/images/" + results[0].Imagen;
      db.query(
        "UPDATE Noticias SET Titulo = ?, Subtitulo = ?, Contenido = ?, Imagen = ?, Destacada = ? WHERE ID = ?",
        [titulo, subtitulo, contenido, imagen, destacada, id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (!result) {
              console.log(abueno);
            } else {
              fs.unlink(pathDeletable);
              res.send(result);
            }
          }
        }
      );
    }
  });
});

app.post("/getnoticiasUpdate", (req, res) => {
  const id = req.body.id;
  db.query("SELECT * FROM Noticias WHERE ID = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* ==== FIN  NOTICIAS ==== */

/* === CRUD REQUISITOS === */

app.get("/getRequisitos", (req, res) => {
  db.query("SELECT * FROM Requisitos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/insertRequisitos", (req, res) => {
  const materia = req.body.materia;
  const requisitos = req.body.requisitos;

  db.query(
    "INSERT INTO Requisitos VALUES (NULL, ?, ?)",
    [materia, requisitos],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateRequisitos", (req, res) => {
  const id = req.body.id;
  const materia = req.body.materia;
  const requisitos = req.body.requisitos;

  db.query(
    "UPDATE Requisitos SET Materia = ?, Requisitos = ? WHERE ID = ?",
    [materia, requisitos, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getrequisitosUpdate", (req, res) => {
  const id = req.body.id;
  db.query("SELECT * FROM Requisitos WHERE ID = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* ===  FIN REQUISITOS === */

/* === CRUD CRITERIOS_EVALUACION === */

app.get("/getCriterios_Evaluacion", (req, res) => {
  db.query("SELECT * FROM Criterios_Evaluacion", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/insertCriterios_Evaluacion", (req, res) => {
  const nombre = req.body.nombre;
  const materia = req.body.materia;
  const periodo = req.body.periodo;
  const maxima_calificacion = req.body.maxima_calificacion;
  console.log(maxima_calificacion);

  db.query(
    "INSERT INTO Criterios_Evaluacion VALUES (NULL, ?, ?, ?, ?)",
    [nombre, materia, periodo, maxima_calificacion],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateCriterios_Evaluacion", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const materia = req.body.materia;
  const periodo = req.body.periodo;
  const maxima_calificacion = req.body.maxima_calificacion;

  db.query(
    "UPDATE Criterios_Evaluacion SET Nombre = ?, Materia = ?, Periodo = ?, Maxima_Calificacion =? WHERE ID = ?",

    [nombre, materia, periodo, maxima_calificacion, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getCriterios_EvaluacionUpdate", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT * FROM Criterios_Evaluacion WHERE ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* === FIN CRITERIOS_EVALUACION === */

/* === CRUD MATERIAS_INSCRITAS === */

app.get("/getMaterias_Inscritas", (req, res) => {
  db.query("SELECT * FROM Materias_Inscritas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/insertMaterias_Inscritas", (req, res) => {
  const alumno = req.body.alumno;
  const materia = req.body.materia;
  const periodo = req.body.periodo;
  console.log(alumno);

  db.query(
    "INSERT INTO Materias_Inscritas VALUES (NULL, ?, ?, ?)",
    [alumno, materia, periodo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateMaterias_Inscritas", (req, res) => {
  const id = req.body.id;
  const alumno = req.body.alumno;
  const materia = req.body.materia;
  const periodo = req.body.periodo;

  db.query(
    "UPDATE Criterios_Evaluacion SET Alumno = ?, Materia = ?, Periodo = ? WHERE ID = ?",

    [alumno, materia, periodo, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getMaterias_Inscritas", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT * FROM Materias_Inscritas WHERE ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});



/* === FIN MATERIAS_INSCRITAS === */


/* ==== COMBO   BOXES ==== */

app.get("/comboboxMaestros", (req, res) => {
  db.query("SELECT * FROM Usuarios WHERE Tipo=1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/comboboxMateriaAsuntos", (req, res) => {
  db.query("SELECT * FROM Materias", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/comboboxPeriodoAsuntos", (req, res) => {
  db.query("SELECT * FROM Periodos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/comboboxAlumno_MatI", (req, res) => {
  db.query("SELECT * FROM Usuarios WHERE Tipo=0", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/comboboxPeriodo_MatI", (req, res) => {
  db.query("SELECT * FROM Periodos WHERE Tipo=0", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/comboboxMateria_MatI", (req, res) => {
  db.query("SELECT * FROM Materias WHERE Tipo=0", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


/* ==== FIN COMBOBOXES ==== */
