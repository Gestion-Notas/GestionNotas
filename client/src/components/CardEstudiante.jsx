import React, { useState, useEffect } from "react";
import "../css/GradesCard.css";
import bgimage from "../img/imagen_news-Home.jpg";
import Axios from "../libs/axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  Button,
  Container,
  FormGroup,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CardEstudiante = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [notacriterios, setNotacriterios] = useState([]);
  const [notaFinal, setNotaFinal] = useState([]);

  const getNotaAlumno = (idMateria, idAlumno) => {
    Axios.post("/getNotaAlumno", {
      idMateria: idMateria,
      idAlumno: idAlumno,
    }).then((response) => {
      setNotacriterios(response.data);
    });
  };

  const getNotaFinalAlumno = (idMateria, idAlumno) => {
    Axios.post("/getNotaFinalAlumno", {
      idMateria: idMateria,
      idAlumno: idAlumno,
    }).then((response) => {
      setNotaFinal(response.data);
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="container-GradesCard">
      <div
        className="container_img-GradesCard"
        onClick={() => {
          toggle();
          getNotaAlumno(props.idMateria, props.idAlumno);
          getNotaFinalAlumno(props.idMateria, props.idAlumno);
          
        }}
      >
        <div
          className="imagen-GradesCard"
          style={{ backgroundImage: `url(${bgimage})` }}
        ></div>
      </div>
      <p>{props.name}</p>
      <Modal isOpen={modal} toggle={toggle} size={"lg"}>
        <ModalHeader toggle={toggle}>
          Calificaciones del Parcial - <strong>{props.name}</strong>
        </ModalHeader>
        <ModalBody>
          <div className="table100-Cards">
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Criterio</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {notacriterios.map((val, key) => {
                  return (
                    <tr>
                      <td>{val.Criterio}</td>
                      <td>{val.Nota + " / " + val.Nota_Maxima}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="notafinal">
              <Table bordered>
                <tbody>
                  <tr>
                    {console.log(notaFinal)}
                    <th>NOTA FINAL</th>
                    {notaFinal.length > 0 ? (<td>{notaFinal[0].Nota} / 100</td>) : (<td>No ha sido publicada</td>)}
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CardEstudiante;
