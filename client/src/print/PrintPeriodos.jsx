import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "../libs/axios"
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintMaterias = () => {
  const componentRef = useRef();
  const [periodosTemp, setPeriodosTemp] = useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Materias-Impresion",
  });

  const getSearch = () => {
    Axios.get("/getPeriodos").then((response) => {
      setPeriodosTemp(response.data);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button color="success" onClick={handlePrint}>
          IMPRIMIR PERIODOS - VISTA DEBAJO
        </Button>
        <div
          className="container-AdminPages"
          ref={componentRef}
          style={{ width: "100%", height: window.innerHeight }}
        >
          <div className="title-AdminPages">PERIODOS</div>
          <div className="container_tabla-AdminPages">
            <div className="tablePrint-AdminPages">
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>F_Inicio</th>
                    <th>F_Final</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {periodosTemp.map((val, key) => {
                    return (
                      <tr key={key}>
                        <th>{val.ID}</th>
                        <td>{val.Nombre}</td>
                        <td>{val.F_Inicio.substring(0,10)}</td>
                        <td>{val.F_Final.substring(0,10)}</td>
                        <td>{val.Estado}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintMaterias;
