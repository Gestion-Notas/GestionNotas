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
const e = require("express");
const { response } = require("express");

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "ISFT",
});


app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userID",
    secret: "institutoseminariometodistalibre",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM Usuarios WHERE Cod_Usuario = ? AND E_Aceptado = 1; ",
    [username],
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
            req.session.user = result;
            res.json({ auth: true, token: token, result: result });
          } else {
            res.send(err);
          }
        });
      } else {
        res.json({ auth: false, message: "Error" });
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
            res.setHeader("x-access-token", token);
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
  db.query("SELECT * FROM Materias WHERE ID = ?",[id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

/* ==== FIN  MATERIAS ==== */

/* === CRUD CALIFICACIONES ===*/

app.get("/getCalificaciones",(req ,res)=>{
  db.query("SELECT * FROM Calificaciones",(err, result) => {
     if(err) {
       console.log (err);    
     }
     else{
       res.send(result);
     }
   });
 });
 
 app.post("/insertCalificaciones", (req,res) =>  {
   const id_usuario = req.body.id_usuario;
   const materia = req.body.materia;
   const nota = req.body.nota;
   const periodo = req.body.periodo;
   db.query ("INSERT INTO Calificaciones values(NULL, ?, ?, ?, ?)",[
     id_usuario,
     materia,
     periodo,
     nota
   ], (err,result)=> {
     if (err) {
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });
 
 app.put("/updateCalificaciones", (req, res) => {
   const id = req.body.id;
   const id_usuario = req.body.id_usuario;
   const materia = req.body.materia;
   const nota = req.body.nota;
   const periodo = req.body.periodo;
   db.query ("UPDATE Calificaciones SET ID_Usuario = ?, Materia = ?, Nota = ?, Periodo = ? WHERE ID = ?",
    [id_usuario, materia, nota, periodo, id],
    (err,result)=> {
       if (err) {
        console.log(err);
       }
       else{
        res.send(result);
       }
     }
   );
 });
 
 app.post("/getCalificacionesUptade", (req,res) => {
  db.query("SELCT* FROM Calificaciones WHERE ID=?",[id], (err,result) => {
     if (err) {
      console.log(err)
     } 
     else {
      res.send(result)
     }
   });
 });
 
 /* ====FIN CALIFICACIONES====*/ 


/*===CRUD PERIODO===*/

app.get("/getPeriodos",(req ,res)=>{
  db.query("SELECT * FROM Periodos",(err, result) => {
     if(err) {
       console.log (err);    
     }
     else{
       res.send(result);
     }
   });
 });

 app.post("/insertPeriodo", (req,res) =>  {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const f_inicial = req.f_inicial;
  const f_final = req.body.f_final;
  const estado = req.body.estado;
  db.query(
    "INSERT INTO Periodo VALUES (NULL, ?, ?, ?, ?, ?, ?)",
    [nombre, f_inicial, f_final, estado],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
  

 app.put("/updatePeriodos", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const f_inicio = req.body.f_inicio;
  const f_final = req.body.f_final;
  const estado = req.body.estado;
    db.query ("UPDATE Periodos SET Nombre = ? , F_Inicio = ?, F_Final = ?, Estado = ? WHERE ID = ?",
     [nombre, f_inicio, f_final, estado, id],
     (err,result)=> {
        if (err) {
         console.log(err);
        }
        else{
         res.send(result);
        }
      }
    );
  });

  
  app.post("/getPeriodosUptade", (req,res) => {
    const id = req.body.id;
    db.query("SELCT* FROM Periodos WHERE ID=?",[id], (err,result) => {
       if (err) {
        console.log(err)
       } 
       else {
        res.send(result)
       }
     });
   });


/*===FIN PERIODO===*/

/*====CRUD DE IGLESIA====*/
 app.get("/getIglesias",(req ,res)=>{
  db.query("SELECT * FROM Iglesias",(err, result) => {
     if(err) {
       console.log (err);    
     }
     else{
       res.send(result);
     }
   });
 });

 app.post("/insertIglesias", (req,res) =>  {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const direccion = req.direccion;
  const pastor = req.body.pastor;
  db.query(
    "INSERT INTO Materias VALUES (NULL, ?, ?, ?, ?, ?, ?)",
    [nombre, direccion, pastor],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

  app.put("/updateIglesias", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const pastor = req.body.pastor;   
    db.query ("UPDATE Calificaciones SET Nombre = ? , Direccion = ?, Pastor=? WHERE ID = ?",
     [nombre, direccion, pastor, id],
     (err,result)=> {
        if (err) {
         console.log(err);
        }
        else{
         res.send(result);
        }
      }
    );
  });

  app.post("/getIglesiasUptade", (req,res) => {
    const id = req.body.id;
    console.log(id);
    db.query("SELCT* FROM Iglesias WHERE ID=?",[id], (err,result) => {
       if (err) {
        console.log(err)
       } 
       else {
        res.send(result)
       }
     });
   });
   
/*====FIN IGLESIA==== */


/* ==== COMBOBOXES ==== */

app.get("/comboboxMaestros", (req, res) => {
  db.query("SELECT * FROM Usuarios WHERE Tipo=1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      
      res.send(result);
    }
  });
});

app.get("/comboboxIglesia", (req, res) => {
  db.query("SELECT * FROM Usuarios WHERE Pastor", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      
      res.send(result);
    }
  });
});

app.get("/comboboxCalificaciones", (req,res) => {
  db.query("SELECT * FROM Usuarios WHERE Tipo=0", (err, result) => {
    if(err) {
      console.log (err);    
    }
    else{
      res.send(result);
    }
  });
});

app.get("/cbx_calificaciones", (req,res) => {
  db.query("SELECT * FROM Materias", (err, result) => {
    if(err) {
      console.log (err);    
    }
    else{
      res.send(result);
    }
  });
});

app.get("/comboboxPeriodos", (req,res) => {
  db.query("SELECT * FROM Periodos", (err, result) => {
    if(err) {
      console.log (err);    
    }
    else{
      res.send(result);
    }
  });
});

app.get("/comboboxIglesias", (req,res) => {
  db.query("SELECT * FROM Usuarios WHERE Tipo=0", (err, result) => {
    if(err) {
      console.log (err);    
    }
    else{
      res.send(result);
    }
  });
});

/* ==== FIN COMBOBOXES ==== */








