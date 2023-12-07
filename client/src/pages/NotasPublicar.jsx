import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth";
import "../css/NotasVista.css";
import Axios from "../libs/axios";
import "../css/NotasPublicar.css";
import CardMaestro from "../components/CardMaestro";

const NotasPublicar = () => {
  const [User, SetUser] = useAuthContext();
  const [materias, setMaterias] = useState([]);
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

    doCheck();
  }, []);

  useEffect(() => {
    !User.auth ? console.log("No Auth") : getMateriasMaestros(User.userdata.ID);
  }, []);

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
            return <CardMaestro name={val.Nombre} idMateria={val.ID} auth={User.auth} />;
          })}
        </div>
      )}
      
    </main>
  );
};

export default NotasPublicar;
