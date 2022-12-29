import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "reactstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/AdminPages.css";

const PrintUsuarios = () => {
  const [usuariosTemp, setUsuariosTemp] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Usuarios-Impresion",
  });

  Axios.get("http://localhost:4001/getUsuarios").then((response) => {
    setUsuariosTemp(response.data);
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button color="success" onClick={handlePrint}>
        Print Usuarios
      </Button>
      <div
        className="container-AdminPages"
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <div className="title-AdminPages">Usuarios</div>
        <div className="container_tabla-AdminPages">
          <div className="tablePrint-AdminPages">
            <Table size="sm" bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Codigo</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Cedula</th>
                  <th>Sexo</th>
                  <th>F_Nacimiento</th>
                  <th>Lugar_Nacimiento</th>
                  <th>Nacionalidad</th>
                  <th>Telefono</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                  <th>Sector</th>
                  <th>Provincia</th>
                  <th>Iglesia</th>
                  <th>Pastor</th>
                  <th>Cargo_Iglesia</th>
                  <th>Tipo</th>
                  <th>Aceptado</th>
                </tr>
              </thead>
              <tbody>
                {usuariosTemp.map((val, key) => {
                  return (
                    <tr key={key}>
                      <th scope="row">{val.ID}</th>
                      <td>{val.Cod_Usuario}</td>
                      <td>{val.Nombres}</td>
                      <td>{val.Apellidos}</td>
                      <td>{val.Cedula}</td>
                      <td>{val.Sexo}</td>
                      <td>{val.F_Nacimiento}</td>
                      <td>{val.Lugar_Nacimiento}</td>
                      <td>{val.Nacionalidad}</td>
                      <td>{val.Tel}</td>
                      <td>{val.Correo}</td>
                      <td>{val.Direccion}</td>
                      <td>{val.Sector}</td>
                      <td>{val.Provincia}</td>
                      <td>{val.Iglesia}</td>
                      <td>{val.Pastor}</td>
                      <td>{val.Cargo_Iglesia}</td>
                      <td>{val.Tipo}</td>
                      <td>{val.E_Aceptado}</td>
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

export default PrintUsuarios;
