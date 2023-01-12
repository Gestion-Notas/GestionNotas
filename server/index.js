const mysql2 = require("mysql2");

const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
app.use(cors({
  origin: ["*"]
})
);
app.use("/noticias", noticiasImgUpload);

app.use(
  session({
    key: "userID",
    secret: "institutoseminariometodistalibre",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 21600,
    },
  })
);

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM Usuarios WHERE Cod_Usuario = ? AND E_Aceptado = 1; ",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].Clave, (error, response) => {
          if (response) {
            const id = result[0].ID;
            const token = jwt.sign({ id }, "institutoseminariometodistalibre", {
              expiresIn: 300,
            });
            res.cookie("userID", token, {
              maxAge: 900000,
            });
            req.session.user = result;
            res.json({ auth: true, token: token, result: result });
          } else {
            res.send(err);
          }
        });
      } else {
        res.send(err);
      }
    }
  );
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token Needed");
  } else {
    jwt.verify(token, "institutoseminariometodistalibre", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "auth failed" });
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Auth");
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

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
  const pastor = req.body.pastor;
  const cargo_iglesia = req.body.cargo_iglesia;
  bcrypt.hash(req.body.cedula, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO Usuarios VALUES (NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, false, ?)",
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

app.get("/getUsuarios", (req, res) => {
  db.query("SELECT * FROM Usuarios", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      delete result.Clave
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

/* ==== CRUD USUARIOS ==== */
app.get("/getUsuarios", (req, res) => {
  db.query(`SELECT * FROM Usuarios'`, (err, result) => {
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
  const id = req.body.id;
  const titulo = req.body.titulo;
  const subtitulo = req.body.subtitulo;
  const contenido = req.body.contenido;
  const imagen = req.body.imagen;
  const destacada = req.body.destacada;

  db.query(
    "UPDATE Noticias SET Titulo = ?, Subtitulo = ?, Contenido = ?, Imagen = ?, Destacada = ? WHERE ID = ?",
    [titulo, subtitulo, contenido, imagen, destacada, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
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

/* ==== FIN COMBOBOXES ==== */
