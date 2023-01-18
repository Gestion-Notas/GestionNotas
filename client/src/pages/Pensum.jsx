import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
} from "reactstrap";
import Axios from "../libs/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Pensum.css";

const Pensum = () => {
  const [open, setOpen] = useState("");
  const [nivel100, setNivel100] = useState([]);
  const [nivel200, setNivel200] = useState([]);
  const [nivel300, setNivel300] = useState([]);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    Axios.get("/getPensum100").then((response) => {
      setNivel100(response.data);
      console.log(response.data);
    });
    Axios.get("/getPensum200").then((response) => {
      setNivel200(response.data);
    });
    Axios.get("/getPensum300").then((response) => {
      setNivel300(response.data);
    });
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
    </main>
  );
};

export default Pensum;
