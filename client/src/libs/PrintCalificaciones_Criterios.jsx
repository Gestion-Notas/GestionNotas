import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "../libs/axios";
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintCalificaciones_Criterios = () => {
  const componentRef = useRef();
  const [calificacionescriteriosTemp, setCalificacionesCriteriosTemp] =
    useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Iglesia-Impresion",
  });

  const getSearch = () => {
    Axios.get("/getCalificaciones_Criterios").then((response) => {
      setCalificacionesCriteriosTemp(response.data);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button color="success" onClick={handlePrint}>
        IMPRIMIR CALIFICACIONES CRITERIOS - VISTA DEBAJO
      </Button>
      <div
        className="container-AdminPages"
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <div className="title-AdminPages">CALIFICACIONES CRITERIOS</div>
        <div className="container_tabla-AdminPages">
          <div className="tablePrint-AdminPages">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID_Usuario</th>
                  <th>Nota</th>
                  <th>Criterio</th>
                  <th>Periodo</th>
                </tr>
              </thead>
              <tbody>
                {calificacionescriteriosTemp.map((val, key) => {
                  return (
                    <tr key={key}>
                      <th>{val.ID}</th>
                      <td>{val.ID_Usuario}</td>
                      <td>{val.Nota}</td>
                      <td>{val.Criterio}</td>
                      <td>{val.Periodo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintCalificaciones_Criterios;
