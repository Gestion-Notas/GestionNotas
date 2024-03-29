import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useAuthContext } from "../contexts/auth";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { CgTimelapse } from "react-icons/cg";
import { HiNewspaper } from "react-icons/hi";

const MainPage_Admin = ({ Main }) => {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  const [User, SetUser] = useAuthContext();

  useEffect(() => {
    const doCheck = async () => {
      if (!localStorage.getItem("auth")) return;
      try {
        const response = await Axios.get("/auth");
        if (response.status !== 200 || response.status >= 500) {
          SetUser({ auth: false, token: null, userdata: {} });
          localStorage.removeItem("auth");
          return;
        }
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
    console.log(User.auth);
    doCheck();
  }, []);

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
          <FaBars onClick={() => setIsOpen(!isOpen)} className="iconBar" poin />

          <ul className="nav_list">
            <li>
              <Link to="/admin/home" className="a">
                <FaHome className="icon" />
                <span className="links_name">Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/usuarios" className="a">
                <FaUsers className="icon" />
                <span className="links_name">Usuarios</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/iglesias" className="a">
                <BiChurch className="icon" />
                <span className="links_name">Iglesias</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/materias" className="a">
                <ImBooks className="icon" />
                <span className="links_name">Materias</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/requisitos" className="a">
                <BsPatchCheckFill className="icon" />
                <span className="links_name">Requisitos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/criterios_evaluacion" className="a">
                <MdGrading className="icon" />
                <span className="links_name">Criterios</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/calificaciones_criterios" className="a">
                <GoTasklist className="icon" />
                <span className="links_name">Calificaciones</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/materias_inscritas" className="a">
                <RiContactsBookUploadFill className="icon" />
                <span className="links_name">Materias-Usuarios</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/calificaciones" className="a">
                <FaEnvelopeOpenText className="icon" />
                <span className="links_name">Grados Finales</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/periodos" className="a">
                <CgTimelapse className="icon" />
                <span className="links_name">Periodos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/noticias" className="a">
                <HiNewspaper className="icon" />
                <span className="links_name">Noticias</span>
              </Link>
            </li>
          </ul>
          <div className="profile_content">
            <div className="profile">
              <div className="profile_details">
                <FaUserCircle className="imageUser" />
                <div className="name_job">
                  {!User.auth ? (
                    <></>
                  ) : (
                    <div className="nombre">
                      {User.userdata.Nombres + " " + User.userdata.Apellidos}
                    </div>
                  )}
                </div>
              </div>
              <Link to="/" className="logout">
                <BiLogOut />
              </Link>
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
