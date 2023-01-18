import React, {useState} from "react";
import "../css/GradesCard.css";
import bgimage from "../img/imagen_news-Home.jpg";
import { Modal, ModalBody, ModalHeader, ModalFooter, Table, Button, Container, FormGroup } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const CardMaestro = (props) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className="container-GradesCard" onClick={toggle}>
      <div className="container_img-GradesCard" >
        <div
          className="imagen-GradesCard"
          style={{ backgroundImage: `url(${bgimage})` }}
        >
        </div>
      </div>
      <p>{props.name}</p>
      <Modal isOpen={modal} toggle={toggle} size={"xl"}>
        <ModalHeader toggle={toggle}>Calificaciones del Parcial</ModalHeader>
        <ModalBody>
          {props.idMaestro}
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

export default CardMaestro ;
