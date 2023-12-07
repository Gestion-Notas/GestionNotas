import "../css/Navbar.css";
import React, { useState, useEffect } from "react";
import logo from "../logoseminario1.png";
import Axios from "../libs/axios";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [User, SetUser] = useAuthContext();
  const navigate = useNavigate();
  function refreshpage() {
    window.location.reload(false);
  }

  const doCheck = async () => {
    if (!localStorage.getItem("auth")) return;
    try {
      const response = await Axios.get("/auth");
      if (response.status !== 200 || response.status >= 500) {
        SetUser({ auth: false, token: null, userdata: {} });
        localStorage.removeItem("auth");
        return;
      }
      console.log(response.data.userdata);
      localStorage.setItem("auth", response.data.token);
      SetUser({
        auth: true,
        token: response.data.token,
        userdata: response.data.userdata,
      });
    } catch (error) {
      if (error.name === "AbortError") return;
      if (error.response.status === 401) {
        SetUser({ auth: false, token: null, userdata: {} });
        localStorage.removeItem("auth");
        return;
      }
    }
  };

  useEffect(() => {
    doCheck();
  }, []);

  return (
    <header>
      <Modal isOpen={modal} toggle={toggle} size="sm">
        <ModalHeader toggle={toggle}>Cerrando Sesión</ModalHeader>
        <ModalBody>Seguro que deseas cerrar sesión?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
          <Button
            color="success"
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/");
              refreshpage();
            }}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
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
          ) : User.userdata.Tipo == "0" ? (
            <li>
              <Link to="/notas/vista">NOTAS</Link>
            </li>
          ) : User.userdata.Tipo == "1" ? (
            <li>
              <Link to="/notas/publicar">NOTAS</Link>
            </li>
          ) : (
            <></>
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
            <div>
              Hola, {User.userdata.Nombres + " " + User.userdata.Apellidos}
            </div>
            <div style={{ cursor: "pointer" }}>
              <BiLogOut className="usericon-Navbar" onClick={toggle} />
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
