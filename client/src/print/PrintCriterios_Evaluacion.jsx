import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "axios";
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintCriterios_Evaluacion = () => {
  const componentRef = useRef();
  const [criterios_evaluacionTemp, setcriterios_evaluacionTemp] = useState({});
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Criterios-Impresion",
  });

  const getSearch = () => {
    Axios.get("/getCriterios_Evaluacion").then((response) => {
      setcriterios_evaluacionTemp(response.data);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alighItems: "center" }}
    >
      <Button color="success" onClick={handlePrint}>
        {" "}
        IMPRIMIR CRITERIOS - VISTA DEBAJO
      </Button>
      <div
        className="container-AdminPages"
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <div className="title-AdminPages">CRITERIOS_EVALUACION</div>
        <div className="container_table-AdminPages"></div>
        <div className="tablePrint-AdminPages">
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Materia</th>
                <th>Periodo</th>
                <th>Maxima Calificacion</th>
              </tr>
            </thead>
            <tbody>
              {criterios_evaluaciontemp.map((val, key) => {
                return (
                  <tr>
                    <th>{val.ID}</th>
                    <td>{val.Nombre}</td>
                    <td>{val.Materia}</td>
                    <td>{val.Periodo}</td>
                    <td>{val.Maxima_Calificacion}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PrintCriterios_Evaluacion;
