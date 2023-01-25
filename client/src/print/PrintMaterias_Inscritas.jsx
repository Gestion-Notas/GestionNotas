import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "../libs/axios";
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintCriterios_Evaluacion = () => {
  const componentRef = useRef();
  const [materias_inscritasTemp, setmaterias_inscritasTemp] = useState({});
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Criterios-Impresion",
  });

  const getSearch = () => {
    Axios.get("/getMaterias_Inscritas").then((response) => {
      console.log(response.data);
      setmaterias_inscritasTemp(response.data);
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
        IMPRIMIR MATERIAS INSCRITAS - VISTA DEBAJO
      </Button>
      <div
        className="container-AdminPages"
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <div className="title-AdminPages">MATERIAS INSCRITAS</div>
        <div className="container_table-AdminPages"></div>
        <div className="tablePrint-AdminPages">
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Alumo</th>
                <th>Materia</th>
                <th>Periodo</th>
              </tr>
            </thead>
            <tbody>
              {materias_inscritasTemp.map((val, key) => {
                return (
                  <tr>
                    <th>{val.ID}</th>
                    <td>{val.Alumno}</td>
                    <td>{val.Materia}</td>
                    <td>{val.Periodo}</td>
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
