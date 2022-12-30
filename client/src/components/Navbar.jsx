import "../css/Navbar.css";
import React, { useState, useEffect } from "react";
import logo from "../logoseminario1.png";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Axios from "axios";

export function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  Axios.defaults.withCredentials = true;

  Axios.get("http://localhost:4001/login").then((response) => {
    if (response.data.loggedIn == true) {
      setLoginStatus(response.data.user[0]);

      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  });

  var loginButton;
  console.log(loginStatus);
  if (userAuthenticated == true) {
    loginButton = loginStatus.map((val, key) => {
      return (
        <div className="Link-Navbar">
          <div>{val.Nombre}</div>
          <FaUserCircle className="usericon-Navbar" />
        </div>
      );
    });
  } else {
    loginButton = (
      <Link to="/login" className="Link-Navbar">
        <div>INICIAR SESIÓN</div>
        <FaUserCircle className="usericon-Navbar" />
      </Link>
    );
  }

  console.log(loginButton);

  return (
    <header>
      <div className="seccion2-Navbar">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-Navbar" />
        </Link>
        <h1 className="logotitle-Navbar">ISFT</h1>
        <ul className={`navbarlist ${isOpen && "open"}`}>
          <li>
            <Link to="/pensum">PENSUM</Link>
          </li>
          <li>
            <Link to="/noticias">NOTICIAS</Link>
          </li>
          <li>
            <Link to="/nosotros">NOSOTROS</Link>
          </li>
          <li>
            <Link to="/notas/vista">NOTAS</Link>
          </li>
          <li>
            <Link to="/admisiones">ADMISIONES</Link>
          </li>
        </ul>
      </div>

      <div className="userDetails-Navbar">
        {loginButton}
        <FaBars
          id="icon"
          className={`menuicon-Navbar ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </header>
  );
}
