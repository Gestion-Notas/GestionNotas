import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../libs/axios";
import "../css/Login.css";
import { Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthContext } from "../contexts/Auth";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const toggle = () => setAlert(!alert);
  const [User, SetUser] = useAuthContext();
  const homeroute = () => {
    const path = "/";
    navigate(path);
  };

  useEffect(() => {
    const doCheck = async () => {
      if (!localStorage.getItem("auth")) return;
      try {
        const response = await Axios.get("/auth");
        if (response.status !== 200 || response.status >= 500) {
          SetUser({ auth: false, token: null, data: {} });
          localStorage.removeItem("auth");
          return;
        }
        console.log(response)
        localStorage.setItem("auth", response.data.token);
        SetUser({
          auth: true,
          token: response.data.token,
          data: response.data.user,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        if (error.name === "AbortError") return;
        if (error.response.status === 401) {
          SetUser({ auth: false, token: null, data: {} });
          localStorage.removeItem("auth");
          return;
        }
      }
    };
    doCheck();
    return () => {
      AbortSignal.abort();
    };
  }, []);
  const loginauth = () => {
    Axios.post("/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.length == 0) {
        toggle();
      } else {
        localStorage.setItem("auth", response.data.token);
        SetUser({
          auth: true,
          token: response.data.token,
          User: response.data.result,
        });
        homeroute();
      }
    });
  };

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
