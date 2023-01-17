import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "../libs/axios";
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintRequisitos = () => {
  const componentRef = useRef();
  const [requisitosTemp, setRequisitosTemp] = useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Requisitos-Impresion",
  });

  const getSearch = () => {
    Axios.get("/getRequisitos").then((response) => {
      setRequisitosTemp(response.data);
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
          IMPRIMIR REQUISITOS - VISTA DEBAJO
        </Button>
        <div
          className="container-AdminPages"
          ref={componentRef}
          style={{ width: "100%", height: window.innerHeight }}
        >
          <div className="title-AdminPages" >REQUISITOS</div>
          <div className="container_tabla-AdminPages">
            <div className="tablePrint-AdminPages">
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Materia</th>
                    <th>Requisitos</th>

                  </tr>
                </thead>
                <tbody>
                  {requisitosTemp.map((val, key) => {
                    return (
                      <tr key={key}>
                        <th>{val.ID}</th>
                        <td>{val.Materia}</td>
                        <td>{val.Requisitos}</td>
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

export default PrintRequisitos;