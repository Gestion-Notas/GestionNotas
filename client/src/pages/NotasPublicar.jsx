import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth";
import "../css/NotasVista.css";
import Axios from "../libs/axios";
import "../css/NotasPublicar.css";
import CardMaestro from "../components/CardMaestro";
import { FaClipboardList, FaCalendarCheck } from "react-icons/fa";

const NotasPublicar = () => {
  const [User, SetUser] = useAuthContext();
  const [materias, setMaterias] = useState([]);
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

  useEffect(() => {
    !User.auth ? console.log("No Auth") : getMateriasMaestros(User.data.ID);
  });

  const getMateriasMaestros = (ID) => {
    Axios.post("/getMateriasMaestros", { id: ID }).then((response) => {
      setMaterias(response.data);
    });
  };

  return (
    <main className="main">
      {!User.auth ? (
        <></>
      ) : (
        <div className="container-Notas">
          {materias.map((val, key) => {
            return <CardMaestro name={val.Nombre} idMateria={val.ID} />;
          })}
        </div>
      )}
      <div className="container_Queries-NotasPublicar">
        <div className="cardQuery-NotasPublicar">
          <div className="text_cardQuery-NotasPublicar">
            <h2>POR CORREGIR</h2>
            <p>999</p>
          </div>
          <FaClipboardList className="icon-NotasPublicar" />
        </div>
        <div className="cardQuery-NotasPublicar">
          <div className="text_cardQuery-NotasPublicar">
            <h2>CORREGIDOS</h2>
            <p>999</p>
          </div>
          <FaCalendarCheck className="icon-NotasPublicar" />
        </div>
      </div>
    </main>
  );
};

export default NotasPublicar;
