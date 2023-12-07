import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
} from "reactstrap";
import Axios from "../libs/axios";
import { useAuthContext } from "../contexts/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Pensum.css";
import io from "socket.io-client";

const Pensum = () => {
  const socket = io("http://localhost:4001");
  const [open, setOpen] = useState("");
  const [nivel100, setNivel100] = useState([]);
  const [nivel200, setNivel200] = useState([]);
  const [nivel300, setNivel300] = useState([]);
  const [User, SetUser] = useAuthContext();
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const navigate = useNavigate();

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

  useEffect(() => {
    Axios.get("/getPensum100").then((response) => {
      setNivel100(response.data);
    });
    Axios.get("/getPensum200").then((response) => {
      setNivel200(response.data);
    });
    Axios.get("/getPensum300").then((response) => {
      setNivel300(response.data);
    });
    doCheck();
    socket.on("saludo", (mensaje) => {
      console.log(mensaje);
      socket.emit("codigoRecibido"); // Imprime el saludo recibido desde el servidor
    });
    socket.on("habilitarBoton", () => {
      setBotonHabilitado(true);
    });

    return () => {
      socket.off("habilitarBoton");
      socket.off("saludo");
    };
  }, []);

  return (
    <main className="main">
      <div className="container-Pensum">
        <div className="cardColumn-Pensum">
          <div className="header-Pensum">
            <h2>Nivel 100</h2>
          </div>
          <div className="text-Pensum">
            <Accordion flush open={open} toggle={toggle}>
              {nivel100.map((val, key) => {
                return (
                  <AccordionItem key={key}>
                    <AccordionHeader targetId={val.ID.toString()}>
                      {val.Nombre}
                    </AccordionHeader>
                    <AccordionBody accordionId={val.ID.toString()}>
                      {val.Descripcion}
                    </AccordionBody>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
        <div className="cardColumn-Pensum">
          <div className="header-Pensum">
            <h2>Nivel 200</h2>
          </div>
          <div className="text-Pensum">
            <Accordion flush open={open} toggle={toggle}>
              {nivel200.map((val, key) => {
                return (
                  <AccordionItem key={key}>
                    <AccordionHeader targetId={val.ID.toString()}>
                      {val.Nombre}
                    </AccordionHeader>
                    <AccordionBody accordionId={val.ID.toString()}>
                      {val.Descripcion}
                    </AccordionBody>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
        <div className="cardColumn-Pensum">
          <div className="header-Pensum">
            <h2>Nivel 300</h2>
          </div>
          <div className="text-Pensum">
            <Accordion flush open={open} toggle={toggle}>
              {nivel300.map((val, key) => {
                return (
                  <AccordionItem key={key}>
                    <AccordionHeader targetId={val.ID.toString()}>
                      {val.Nombre}
                    </AccordionHeader>
                    <AccordionBody accordionId={val.ID.toString()}>
                      {val.Descripcion}
                    </AccordionBody>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>

      {!User.auth ? (
        console.log("Not Authenticated")
      ) : User.userdata.Tipo == "0" ? (
        !botonHabilitado ? (
          console.log("Not In Date")
        ) : (
          <div
            className="container-Elecciones"
            onClick={() => {
              navigate("/eleccionMaterias");
            }}
          >
            ELEGIR MIS MATERIAS
          </div>
        )
      ) : (
        <></>
      )}
    </main>
  );
};

export default Pensum;
