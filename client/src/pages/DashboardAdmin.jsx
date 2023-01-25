import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import "../css/AdminPages.css";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  Button,
  Input,
  FormGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "../libs/axios";

const MateriasAdmin = () => {

  const [materiasarray, setMateriasarray] = useState([]);
  const [admitidos, setAdmitidos] = useState([]);
  const [espera, setEspera] = useState([]);
  const [periodo, setPeriodo] = useState([]);

  const getSearch = () => {
    Axios.get("/getCountAdmitidos").then((response) => {
      setAdmitidos(response.data);
    });

    Axios.get("/getCountEspera").then((response) => {
      setEspera(response.data);
    });

    Axios.get("/getMaterias").then((response) => {
      setMateriasarray(response.data);
    });

    Axios.get("/getPeriodoActual").then((response) => {
        setPeriodo(response.data);
      });
  };

  useEffect(() => {
    getSearch();
  }, []);

  return espera.length > 0 ? (
    <div className="container-AdminPages">
      <div className="title-AdminPages">Dashboard</div>
      <div className="containertablaDashboard-AdminPages">
        <div className="containerCards-AdminPages">
          <div className="cardsCount-AdminPages">
            <p>Aceptados</p>
            <p>{admitidos[0].Cantidad}</p>
          </div>
          <div className="cardsCount-AdminPages">
            <p>En Espera</p>
            <p>{espera[0].Cantidad}</p>
          </div>
          <div className="cardPeriodo-AdminPages">
            <div className="titlePeriodo-AdminPages">Periodo Actual</div>
            <div className="result-AdminPages">{periodo[0].PeriodoMaximo}</div>
          </div>
        </div>
        <div className="containerTable-Adminpages">
          <Table hover responsive>
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
              {materiasarray.map((val, key) => {
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
  ) : (
    <></>
  );
};

export default MateriasAdmin;
