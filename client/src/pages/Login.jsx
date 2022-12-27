import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../css/Login.css";

const Login = () => {

  const loginauth = () => {
    Axios.post("http://localhost:4001/login", {
      username: username,
      password: password
    }).then((response) => {
      console.log(response);
    });
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("initialState");
  return (
    <main>
      <div className="container-Login">
        <div className="imagen-Login">
          <div className="yellow-filter"></div>
        </div>
        <div className="texto-Login">
          <p>Iniciar Sesión</p>
          <div>
            <ul>
              <li>
                <p>Código</p>
                <input
                  type="text"
                  name="usercode"
                  id=""
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
                  name="pass"
                  id=""
                  placeholder="Introduce tu Contraseña"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </li>
            </ul>
            <div className="links-Login">
              <button onClick={() => {
                  loginauth();
                }}>Ingresar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
