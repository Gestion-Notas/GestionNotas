import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth";
import "../css/NotasVista.css";
import Axios from "../libs/axios";
import CardEstudiante from "../components/CardEstudiante";

const NotasVista = () => {
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
    !User.auth ? console.log("No Auth" + " - "  + User.auth) : getMateriasAlumnos(User.data.ID);
  }), [];

  const getMateriasAlumnos = (ID) => {
    Axios.post("/getMateriasAlumnos", { id: ID }).then((response) => {
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
            return <CardEstudiante name={val.Nombre} idMateria={val.Materia_ID} idAlumno={val.Usuario}/>
          })}
        </div>
      )}
    </main>
  );
};

export default NotasVista;
