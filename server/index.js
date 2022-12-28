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
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(
  session({
    key: "userID",
    secret: "institutoseminariometodistalibre",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 6,
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
  const tiempo_iglesia = req.body.tiempo_iglesia;
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
