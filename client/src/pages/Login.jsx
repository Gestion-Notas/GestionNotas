import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";
import { Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [alert, setAlert] = useState(false);
  const toggle = () => setAlert(!alert);

  const {setAuth} =useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser("");
    setPwd("");
    setSuccess(true)
  }

  return (
    <main className="main">
      <div className="container-Login">
        <div className="imagen-Login">
          <div className="yellow-filter"></div>
        </div>
        <div className="texto-Login">
          <p>Iniciar Sesión</p>
          <Alert
            color="danger"
            ref={errRef}
            aria-live="assertive"
            isOpen={alert}
            toggle={toggle}
            fade
          >
            {errMsg}
          </Alert>
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <p>Código</p>
                <input
                  type="text"
                  ref={userRef}
                  placeholder="Introduce tu Código"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                />
              </li>
              <li>
                <p>Contraseña</p>
                <input
                  type="password" 
                  placeholder="Introduce tu Contraseña"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </li>
            </ul>
            <div className="links-Login">
              <button>Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
