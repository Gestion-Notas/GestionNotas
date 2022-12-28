import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import logo from "../logoseminario1.png";
import {
  FaUsers,
  FaEnvelopeOpenText,
  FaBars,
  FaHome,
  FaUserCircle,
} from "react-icons/fa";
import { BiChurch, BiLogOut } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdGrading } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { CgTimelapse } from "react-icons/cg";
import { HiNewspaper } from "react-icons/hi";

const MainPage_Admin = ({ Main }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fullbody">
        <div className={`sidebar ${isOpen && "active"}`}>
          <div className="logo-content">
            <div className="logo">
              <img src={logo} className="logo" />
              <div className="logo-text">ISFT</div>
            </div>
          </div>
          <FaBars onClick={() => setIsOpen(!isOpen)} className="iconBar" />

          <ul className="nav_list">
            <li>
              <Link to="/admin/home" className="a">
                <FaHome className="icon" />
                <span className="links_name">Inicio</span>
                <span className="tooltip">Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/usuarios" className="a">
                <FaUsers className="icon" />
                <span className="links_name">Usuarios</span>
                <span className="tooltip">Usuarios</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="a">
                <BiChurch className="icon" />
                <span className="links_name">Iglesias</span>
                <span className="tooltip">Iglesias</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="a">
                <ImBooks className="icon" />
                <span className="links_name">Materias</span>
                <span className="tooltip">Materias</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="a">
                <BsPatchCheckFill className="icon" />
                <span className="links_name">Requisitos</span>
                <span className="tooltip">Requisitos</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="a">
                <MdGrading className="icon" />
                <span className="links_name">Criterios</span>
                <span className="tooltip">Criterios</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="a">
                <GoTasklist className="icon" />
                <span className="links_name">Calificaciones</span>
                <span className="tooltip">Calificaciones</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="a">
                <RiContactsBookUploadFill className="icon" />
                <span className="links_name">Materias-Usuarios</span>
                <span className="tooltip">Materias-Usuarios</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="a">
                <FaEnvelopeOpenText className="icon" />
                <span className="links_name">Grados Finales</span>
                <span className="tooltip">Grados Finales</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="a">
                <CgTimelapse className="icon" />
                <span className="links_name">Periodos</span>
                <span className="tooltip">Periodos</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="a">
                <HiNewspaper className="icon" />
                <span className="links_name">Noticias</span>
                <span className="tooltip">Noticias</span>
              </Link>
            </li>
          </ul>
          <div className="profile_content">
            <div className="profile">
              <div className="profile_details">
                <FaUserCircle className="imageUser" />
                <div className="name_job">
                  <div className="nombre">Lucas Lopez</div>
                </div>
              </div>
              <BiLogOut className="logout" />
            </div>
          </div>
        </div>
        <div className="home-content">
          <Main />
        </div>
      </div>
    </>
  );
};

export default MainPage_Admin;
