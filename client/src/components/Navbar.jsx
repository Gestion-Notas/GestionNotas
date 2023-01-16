import "../css/Navbar.css";
import React, { useState, useEffect } from "react";
import logo from "../logoseminario1.png";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth";
export const Navbar=(props)=> {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAuthContext();

  const notaslink = () => {
    
  }
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
            <Link to={notaslink}>NOTAS</Link>
          </li>
          <li>
            <Link to="/admisiones">ADMISIONES</Link>
          </li>
        </ul>
      </div>

      <div className="userDetails-Navbar">
        <Link to="/login" className="Link-Navbar">
          <div>INICIAR SESIÓN</div>
          <FaUserCircle className="usericon-Navbar" />
        </Link>
        <FaBars
          id="icon"
          className={`menuicon-Navbar ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </header>
  );
}
