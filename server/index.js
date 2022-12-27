const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken")

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "ISFT",
});

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(4001, () => {
  console.log("Server Running at port 4001");
});

app.post("/login", (req,res) => {

  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM Usuarios WHERE Cod_Usuario = ? AND Clave = ?",
    [username, password], (err, results) => {
      if (err) {
        res.send({err:err})
      } else {
        if (results){
          res.send
        }else{
          res.send({message: "Codigo de Usuario y/o Contraseña incorrectos"})
        }
      }
    }

  )
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
  const pastor = req.body.pastor;
  const tiempo_iglesia = req.body.tiempo_iglesia;
  const cargo_iglesia = req.body.cargo_iglesia;
  const clave = req.body.clave;

  db.query(
    "INSERT INTO Usuarios VALUES (NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, false, 2019-0091)",
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
      tiempo_iglesia,
      cargo_iglesia,
      clave
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
      console.log(err)
    } else {
      res.send(result);
    }
  })
})

app.get("/getNoticiasDetails/:id", (req, res) => {
  db.query("SELECT * FROM Noticias WHERE ID=?", [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

