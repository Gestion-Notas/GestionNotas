import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "axios";
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiDirections } from "react-icons/bi";

const PrintCalificaciones = () => {
  const componentRef = useRef();
  const [calificacionesTemp, setcalificacionesTemp] = useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Calificaciones-Impresion",
  });

  const getSearch = () => {
    Axios.get("http://localhost:4001/getCalificaciones").then((response) => {
      setcalificacionesTemp(response.data);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirections: "Column",
        alignItems: "center",
      }}
    >
      <Button color="success" onClick={handlePrint}>
        IMPRIMIR CALIFICACIONES -VISTA DEBAJO
      </Button>
      <div
        className="container-AdminPages"
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}>
        <div className="title-AdminPages">CALIFICACION</div>
        <div className="conteiner_Tabla-AdminPages">
          <div className="tablePrint-AdminPages">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID_Usuario</th>
                  <th>Materia</th>
                  <th>Nota</th>
                  <th>Periodo</th>
                </tr>
              </thead>
              <tbody>
                {calificacionesTemp.map((val, key) => {
                  return (
                    <tr key={key}>
                      <th>{val.ID}</th>
                      <th>{val.ID_Usuario}</th>
                      <th>{val.Materia}</th>
                      <th>{val.Nota}</th>
                      <th>{val.Periodo}</th>
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

export default PrintCalificaciones;
