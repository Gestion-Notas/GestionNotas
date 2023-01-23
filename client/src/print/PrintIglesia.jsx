import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "axios";
import "../css/AdminPages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintMaterias = () => {
  const componentRef = useRef();
const [IglesiaTemp, setIglesiasTemp] = useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Iglesia-Impresion",
  });

  const getSearch = () => {
    Axios.get("http://localhost:4001/getIglesias").then((response) => {
      setIglesiasTemp(response.data);
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
        IMPRIMIR IGLESIAS - VISTA DEBAJO
      </Button>
      <div
        className="container-AdminPages"
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <div className="title-AdminPages">IGLESIAS</div>
        <div className="container_tabla-AdminPages">
          <div className="tablePrint-AdminPages">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Direccion</th>
                  <th>Pastor</th>
                </tr>
              </thead>
              <tbody>
                {IglesiaTemp.map((val, key) => {
                  return (
                    <tr key={key}>
                      <th>{val.ID}</th>
                      <td>{val.Nombre}</td>
                      <td>{val.Direccion}</td>
                      <td>{val.Pastor}</td>
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

export default PrintMaterias;