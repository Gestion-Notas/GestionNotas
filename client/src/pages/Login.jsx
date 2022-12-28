import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../css/Login.css";
import { Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const toggle = () => setAlert(!alert);

  const homeroute = () => {
    const path = "/";
    navigate(path);
  };

  Axios.defaults.withCredentials = true;

  const loginauth = () => {
    Axios.post("http://localhost:4001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.length == 0) {
        toggle();
      } else {
        setLoginStatus(response.data);
        homeroute();
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:4001/login").then((response) =>{
      setLoginStatus(response.data.user[0].ID)
    })
  }, []);

  return (
    <main className="main">
      <div className="container-Login">
        <div className="imagen-Login">
          <div className="yellow-filter"></div>
        </div>
        <div className="texto-Login">
          <p>Iniciar Sesión</p>
          <Alert color="danger" isOpen={alert} toggle={toggle} fade>
            Codigo y/o Contraseña Incorrectos
          </Alert>
          <div>
            <ul>
              <li>
                <p>Código</p>
                <input
                  type="text"
                  placeholder="Introduce tu Código"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </li>
              <li>
                <p>Contraseña</p>
                <input
                  type="password"
                  placeholder="Introduce tu Contraseña"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </li>
            </ul>
            <div className="links-Login">
              <button
                onClick={() => {
                  loginauth();
                }}
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
