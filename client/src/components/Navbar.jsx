import "../css/Navbar.css";
import React, { useState, useEffect } from "react";
import logo from "../logoseminario1.png";
import Axios from "../libs/axios";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth";
export const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [User, SetUser] = useAuthContext();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  function refreshpage() {
    window.location.reload(false);
  }
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
        localStorage.setItem("auth", response.data.token);
        SetUser({
          auth: true,
          token: response.data.token,
          data: response.data.user,
        });
      } catch (error) {
        if (error.name === "AbortError") return;
        if (error.response.status === 401) {
          SetUser({ auth: false, token: null, data: {} });
          localStorage.removeItem("auth");
          return;
        }
      }
    };
    doCheck();
  }, []);

  const notaslink = () => {};
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
          {!User.auth ? (
            <></>
          ) : (
            User.data.Tipo == "0" ? (
              <li>
                <Link to="/notas/vista">NOTAS</Link>
              </li>
            ) : (
              <li>
                <Link to="/notas/publicar">NOTAS</Link>
              </li>
            )
          )}
          <li>
            <Link to="/admisiones">ADMISIONES</Link>
          </li>
        </ul>
      </div>

      <div className="userDetails-Navbar">
        {!User.auth ? (
          <Link to="/login" className="Link-Navbar">
            <div>INICIAR SESIÓN</div>
            <FaUserCircle className="usericon-Navbar" />
          </Link>
        ) : (
          <div className="Link-Navbar">
            <div>Hola, {User.data.Nombres + " " + User.data.Apellidos}</div>
            <div style={{ cursor: "pointer" }}>
              <BiLogOut
                className="usericon-Navbar"
                onClick={() => {
                  localStorage.removeItem("auth");
                  refreshpage();
                }}
              />
            </div>
          </div>
        )}
        <FaBars
          id="icon"
          className={`menuicon-Navbar ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </header>
  );
};
