import React, { useState, useEffect } from "react";
import "../css/GradesCard.css";
import bgimage from "../img/imagen_news-Home.jpg";
import Axios from "../libs/axios";
import { MdEdit } from "react-icons/md";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  Button,
  Container,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CardMaestro = (props) => {
  const [modal, setModal] = useState(false);
  const [modalCorregirState, setModalCorregirState] = useState(false);
  const [modalUpdateCorregidosState, setModalUpdateCorregidosState] =
    useState(false);

  function refreshpage() {
    window.location.reload(false);
  }

  const toggle = () => setModal(!modal);
  const toggleCorregirState = () => setModalCorregirState(!modalCorregirState);
  const toggleUpdateCorregidosState = () =>
    setModalUpdateCorregidosState(!modalUpdateCorregidosState);

  const [corregir, setCorregir] = useState([]);
  const [corregidos, setCorregidos] = useState([]);
  const [criterios, setCriterios] = useState([]);

  const [updateCorregir, setUpdateCorregir] = useState(() => {
    return {
      id: "",
      Nombre: "",
      Alumno_ID: "",
      Criterio: "",
      Criterio_ID: "",
      Nota: "",
      Nota_Maxima: "",
      ExecUpdateID: ""
    };
  });

  const getAlumnosCorregir = (ID) => {
    Axios.post("/getUsersCorregir", { id: ID }).then((response) => {
      setCorregir(response.data);
    });
  };

  const getAlumnosCorregidos = (ID) => {
    Axios.post("/getUsersCorregidos", { id: ID }).then((response) => {
      setCorregidos(response.data);
    });
  };

  const getCriteriosExistentes = (ID) => {
    Axios.post("/getCriteriosExistentes", { id: ID }).then((response) => {
      setCriterios(response.data);
    });
  };

  const execUpdate = (user, criterio) => {
    Axios.post("/getcorreccionesupdate", {
      usuario: user,
      criterio: criterio
    }).then((response) => {
      setUpdateCorregir({ ...updateCorregir, ExecUpdateID: response.data[0].ID})
    });
  };

  const insertCorreccion = () => {
    Axios.post("/insertCorreccion", {
      id_usuario: updateCorregir.Alumno_ID,
      nota: updateCorregir.Nota,
      criterio: updateCorregir.Criterio_ID,
    }).then(() => {
      toggleCorregirState;
      console.log("success!");
    });
  };

  const updateCorreccion = () => {
    console.log(updateCorregir)
    Axios.put("/updateCorregidos", {
      id: updateCorregir.ExecUpdateID,
      id_usuario: updateCorregir.Alumno_ID,
      nota: updateCorregir.Nota,
      criterio_id: updateCorregir.Criterio_ID,
    }).then(() => {
      toggleUpdateCorregidosState();
      console.log("success!");
    });
  };

  useEffect(() => {
    getAlumnosCorregir(props.idMateria);
    getAlumnosCorregidos(props.idMateria);
    getCriteriosExistentes(props.idMateria);
  }, []);

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
            <div className="table100-Cards">
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
                  {corregir.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val.Alumno}</td>
                        <td>{val.Criterio}</td>
                        <td>{val.Nota}</td>
                        <td>{val.Nota_Maxima}</td>
                        <td>
                          <div className="acciones-AdminPages">
                            <Button
                              color="primary"
                              onClick={() => {
                                setUpdateCorregir({
                                  id: val.ID,
                                  Nombre: val.Alumno,
                                  Alumno_ID: val.Alumno_ID,
                                  Criterio: val.Criterio,
                                  Criterio_ID: val.Criterio_ID,
                                  Nota: val.Nota,
                                  Nota_Maxima: val.Nota_Maxima,
                                });
                                toggleCorregirState();
                              }}
                            >
                              <MdEdit fontSize={"20px"} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="container_leftside">
              <div className="table50-Cards">
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
                    {corregidos.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val.Alumno}</td>
                          <td>{val.Criterio}</td>
                          <td>{val.Nota}</td>
                          <td>{val.Nota_Maxima}</td>
                          <td>
                            <div className="acciones-AdminPages">
                              <Button
                                color="primary"
                                onClick={() => {
                                  
                                  execUpdate(val.Alumno_ID, val.Criterio_ID)
                                  setUpdateCorregir({
                                    id: val.ID,
                                    Nombre: val.Alumno,
                                    Alumno_ID: val.Alumno_ID,
                                    Criterio: val.Criterio,
                                    Criterio_ID: val.Criterio_ID,
                                    Nota: val.Nota,
                                    Nota_Maxima: val.Nota_Maxima,
                                  });
                                  toggleUpdateCorregidosState();
                                }}
                              >
                                <MdEdit fontSize={"20px"} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="container_bottomside">
                <div className="tablebutton-Cards">
                  <Table hover responsive bordered>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Maxima Calificacion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criterios.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val.Nombre}</td>
                            <td>{val.Maxima_Calificacion}</td>
                            <td>
                              <div className="acciones-AdminPages">
                                <Button color="primary" onClick={() => {}}>
                                  <MdEdit fontSize={"20px"} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>

                <div className="container_bottomCards">
                  <div className="normaldiv"></div>
                  <div className="normaldiv"></div>
                  <div className="centernormal">
                    <Button color="primary">Agregar Criterio</Button>
                  </div>
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
      <Modal isOpen={modalCorregirState} toggle={toggleCorregirState}>
        <ModalHeader toggle={toggleCorregirState}>
          Corrección del Alumno {updateCorregir.Nombre}
        </ModalHeader>
        <ModalBody>
          {!props.auth ? (
            <></>
          ) : (
            <>
              <FormGroup>
                <Label for="Nombre" hidden></Label>
                <Input
                  defaultValue={updateCorregir.Nombre}
                  id="Cod_Materia"
                  readOnly
                  placeholder="Cod_Materia"
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Nombre" hidden></Label>
                <Input
                  defaultValue={updateCorregir.Criterio}
                  id="Cod_Materia"
                  readOnly
                  placeholder="Cod_Materia"
                  autoComplete="off"
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nota" hidden></Label>
                    <Input
                      defaultValue={updateCorregir.Nota}
                      id="Nota"
                      placeholder="Nota"
                      autoComplete="off"
                      onChange={(event) => {
                        setUpdateCorregir({
                          ...updateCorregir,
                          Nota: event.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nombre" hidden></Label>
                    <Input
                      defaultValue={updateCorregir.Nota_Maxima}
                      id="Nota_Maxima"
                      readOnly
                      placeholder="Nota Maxima"
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              insertCorreccion();
              refreshpage();
            }}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={modalUpdateCorregidosState}
        toggle={toggleUpdateCorregidosState}
      >
        <ModalHeader toggle={toggleUpdateCorregidosState}>
          Corrección del Alumno {updateCorregir.Nombre}
        </ModalHeader>
        <ModalBody>
          {!props.auth ? (
            <></>
          ) : (
            <>

              <FormGroup>
                <Label for="Nombre" hidden></Label>
                <Input
                  defaultValue={updateCorregir.Nombre}
                  id="Nombre"
                  readOnly
                  placeholder="Nombre"
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Criterio" hidden></Label>
                <Input
                  defaultValue={updateCorregir.Criterio}
                  id="Criterio"
                  readOnly
                  placeholder="Criterio"
                  autoComplete="off"
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nota" hidden></Label>
                    <Input
                      defaultValue={updateCorregir.Nota}
                      id="Nota"
                      placeholder="Nota"
                      autoComplete="off"
                      onChange={(event) => {
                        setUpdateCorregir({
                          ...updateCorregir,
                          Nota: event.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nombre" hidden></Label>
                    <Input
                      defaultValue={updateCorregir.Nota_Maxima}
                      id="Nota_Maxima"
                      readOnly
                      placeholder="Nota Maxima"
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              updateCorreccion();
              //refreshpage();
            }}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CardMaestro;
