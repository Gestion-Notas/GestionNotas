import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "axios";
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintMaterias = () => {
  const componentRef = useRef();
  const [materiasTemp, setMateriasTemp] = useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Materias-Impresion",
  });

  const getSearch = () => {
    Axios.get("http://localhost:4001/getMaterias").then((response) => {
      setMateriasTemp(response.data);
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
          IMPRIMIR MATERIAS - VISTA DEBAJO
        </Button>
        <div
          className="container-AdminPages"
          ref={componentRef}
          style={{ width: "100%", height: window.innerHeight }}
        >
          <div className="title-AdminPages">MATERIAS</div>
          <div className="container_tabla-AdminPages">
            <div className="tablePrint-AdminPages">
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID Maestro</th>
                    <th>Cod_Materia</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Nivel</th>
                    <th>Creditos</th>
                  </tr>
                </thead>
                <tbody>
                  {materiasTemp.map((val, key) => {
                    return (
                      <tr key={key}>
                        <th>{val.ID}</th>
                        <td>{val.ID_Maestro}</td>
                        <td>{val.Cod_Materia}</td>
                        <td>{val.Nombre}</td>
                        <td>{val.Descripcion}</td>
                        <td>{val.Nivel}</td>
                        <td>{val.Creditos}</td>
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
