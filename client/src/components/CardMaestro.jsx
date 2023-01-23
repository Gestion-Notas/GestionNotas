import React, { useState } from "react";
import "../css/GradesCard.css";
import bgimage from "../img/imagen_news-Home.jpg";
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

const CardMaestro = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const getAlumnosCorregir = (ID) => {
    Axios.post("/getMateriasAlumnos", { id: ID }).then((response) => {
      setMaterias(response.data);
    });
  };

  return (
    <div className="container-GradesCard" onClick={toggle}>
      <div className="container_img-GradesCard">
        <div
          className="imagen-GradesCard"
          style={{ backgroundImage: `url(${bgimage})` }}
        ></div>
      </div>
      <p>{props.name}</p>
      <Modal isOpen={modal} toggle={toggle} size={"xl"}>
        <ModalHeader toggle={toggle}>Calificaciones del Parcial</ModalHeader>
        <ModalBody>
          <div className="container_fullmodal">
            <div className="normaldiv">
            <Table hover responsive bordered>
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Criterio</th>
                <th>Nota</th>
                <th>Nota Máxima</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
            </div>
            <div className="container_leftside">
              <div className="container_bottomside">ola</div>
              <div className="container_bottomside">
                <div className="normaldiv">adio</div>
                <div className="container_bottomCards">
                  <div className="normaldiv"></div>
                  <div className="normaldiv"></div>
                </div>
              </div>
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

export default CardMaestro;
