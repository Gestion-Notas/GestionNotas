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
import { FaClipboardList, FaCalendarCheck } from "react-icons/fa";

const CardMaestro = (props) => {
  const [modal, setModal] = useState(false);
  const [modalCorregirState, setModalCorregirState] = useState(false);
  const [modalUpdateCorregidosState, setModalUpdateCorregidosState] =
    useState(false);
  const [modalAddCriteriosState, setModalAddCriteriosState] = useState(false);

  function refreshpage() {
    window.location.reload(false);
  }

  const toggle = () => setModal(!modal);
  const toggleCorregirState = () => setModalCorregirState(!modalCorregirState);
  const toggleAddCriteriosState = () =>
    setModalAddCriteriosState(!modalAddCriteriosState);
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
      ExecUpdateID: "",
      Nombre_Criterio: "",
    };
  });

  const [countCorregir, setCountCorregir] = useState([]);
  const [countCorregidos, setCountCorregidos] = useState([]);

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

  const getCountCorregidos = (ID) => {
    Axios.post("/getCountCorregidos", { id: ID }).then((response) => {
      setCountCorregidos(response.data[0].Cantidad);
    });
  };

  const getCountCorregir = (ID) => {
    Axios.post("/getCountCorregir", { id: ID }).then((response) => {
      setCountCorregir(response.data[0].Cantidad);
    });
  };

  const getCriteriosExistentes = (ID) => {
    Axios.post("/getCriteriosExistentes", { id: ID }).then((response) => {
      setCriterios(response.data);
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

  const insertCriterios = () => {
    Axios.post("/insertCriterios", {
      nombre: updateCorregir.Nombre_Criterio,
      maxima_calificacion: updateCorregir.Nota_Maxima,
      materia: props.idMateria,
    }).then(() => {
      toggleAddCriteriosState;
      console.log("success!");
    });
  };

  const updateCorreccion = () => {
    console.log(updateCorregir);
    Axios.post("/updateCorregidos", {
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
    getCountCorregidos(props.idMateria);
    getCountCorregir(props.idMateria);
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
        <ModalHeader toggle={toggle}>
          Calificaciones del Parcial - <strong>{props.name}</strong>
        </ModalHeader>
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
                                console.log(val)
                                setUpdateCorregir({
                                  Criterio_ID: val.ID,
                                  Nombre: val.Alumno,
                                  Alumno_ID: val.ID_Usuario,
                                  Criterio: val.Criterio,
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
                                  setUpdateCorregir({
                                    Nombre: val.Alumno,
                                    Alumno_ID: val.ID_Usuario,
                                    Criterio: val.Criterio,
                                    Criterio_ID: val.ID,
                                    Nota: val.Nota,
                                    Nota_Maxima: val.Nota_Maxima,
                                  });
                                  console.log(val)
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
                      </tr>
                    </thead>
                    <tbody>
                      {criterios.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val.Nombre}</td>
                            <td>{val.Maxima_Calificacion}</td>
                            {/*<div className="acciones-AdminPages">
                                <Button color="primary" onClick={() => {}}>
                                  <MdEdit fontSize={"20px"} />
                                </Button>
                        </div>*/}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>

                <div className="container_bottomCards">
                  <div className="normaldiv-Count">
                    <div className="textgradescard">
                      <p className="titlegradescard">POR CORREGIR</p>
                      <p className="numbergradescard">{countCorregir}</p>
                    </div>
                    <FaClipboardList className="icongradescard" />
                  </div>
                  <div className="normaldiv-Count">
                    <div className="textgradescard">
                      <p className="titlegradescard">CORREGIDOS</p>
                      <p className="numbergradescard">{countCorregidos}</p>
                    </div>
                    <FaCalendarCheck className="icongradescard" />
                  </div>
                  <div className="centernormal">
                    <Button
                      color="primary"
                      onClick={() => {
                        toggleAddCriteriosState();
                      }}
                    >
                      Agregar Criterio
                    </Button>
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
                      type="number"
                      min={0}
                      max={updateCorregir.Nota_Maxima}
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
          Agregar Criterios de Evaluacion
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
                      type="number"
                      max={updateCorregir.Nota_Maxima}
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
              refreshpage();
              updateCorreccion();
            }}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalAddCriteriosState} toggle={toggleAddCriteriosState}>
        <ModalHeader toggle={toggleAddCriteriosState}>
          Agregar Criterio
        </ModalHeader>
        <ModalBody>
          {!props.auth ? (
            <></>
          ) : (
            <>
              <FormGroup>
                <Label for="Nombre" hidden></Label>
                <Input
                  id="Nombre"
                  placeholder="Nombre del criterio"
                  autoComplete="off"
                  onChange={(event) => {
                    setUpdateCorregir({
                      ...updateCorregir,
                      Nombre_Criterio: event.target.value,
                    });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Calificacion_Maxima" hidden></Label>
                <Input
                  id="Calificacion_Maxima"
                  placeholder="Máxima Calificación"
                  autoComplete="off"
                  onChange={(event) => {
                    setUpdateCorregir({
                      ...updateCorregir,
                      Nota_Maxima: event.target.value,
                    });
                  }}
                />
              </FormGroup>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              insertCriterios();
              refreshpage();
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
