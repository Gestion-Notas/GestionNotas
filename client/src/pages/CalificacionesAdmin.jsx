import React, { useState, useEffect } from "react";
import { Form, Navigate, useNavigate } from "react-router-dom";
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
import { MdEdit } from "react-icons/md";

const CalificacionesAdmin = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/print/calificaciones";
    navigate(path);
  };

  const [calificacionesarray, setcalificacionesarray] = useState("");
  const [calificacionesTemp, setcalificacionesTemp] = useState([]);
  const [Search, setSearch] = useState("");
  const [comboboxCalificaciones, setcomboboxCalificaciones] = useState([]);
  const [cbx_calificaciones, setcbx_calificaciones] = useState([]);
  const [comboboxPeriodos, setcomboboxPeriodos] = useState([]);

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [id_usuarioInsert, setId_usuarioInsert] = useState("");
  const [materiaInsert, setMateriaInsert] = useState("");
  const [notaInsert, setnotaInsert] = useState("");
  const [periodoInsert, setPeriodoInsert] = useState("");

  /* STATE UPDATE */
  const [updateData, setUpdateData] = useState([]);
  const [id_usuarioUpdate, setid_usuarioUpdate] = useState("");
  const [materiaUpdate, setmateriaUpdate] = useState("");
  const [notaUpdate, setnotaUpdate] = useState("");
  const [periodoUpdate, setperiodoUpdate] = useState("");

  /* BACKEND INSERTAR */

  Axios.get("/comboboxCalificaciones").then((response) => {
    setcomboboxCalificaciones(response.data);
  });

  Axios.get("/cbx_calificaciones").then((response) => {
    setcbx_calificaciones(response.data);
  });

  Axios.get("/comboboxPeriodos").then((response) => {
    setcomboboxPeriodos(response.data);
  });

  const insertcalificaciones = () => {
    Axios.post("/insertCalificaciones", {
      id_usuario: id_usuarioInsert,
      materia: materiaInsert,
      nota: notaInsert,
      periodo: periodoInsert,
    }).then(() => {
      toggleInsertState;
      console.log(object);
    });
  };

  /*BACKEND BUSQUEDA Y SELECT*/

  const getSearch = () => {
    Axios.get("/getCalificaciones").then((response) => {
      setcalificacionesTemp(response.data);
      setcalificacionesarray(response.data);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = calificacionesarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.ID_Usuario.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Materia.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nota.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Periodo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setcalificacionesTemp(resultadobusqueda);
  };

  const handleState = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  /*BACKEND UPDATE*/
  const execUpdate = (id) => {
    Axios.post("/getCalificacionesUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const Updatecalificaciones = (id) => {
    Axios.post("/updateCalificaciones", {
      id: id,
      id_usuario: id_usuarioUpdate,
      materia: materiaUpdate,
      nota: notaUpdate,
      periodo: periodoUpdate,
    }).then(() => {
      toggleUpdateState;
      console.log("success!");
    });
  };

  /*FUNCIONES VARIAS*/

  function refreshpage() {
    window.location.reload(false);
  }

  return (
    <div className="container-AdminPages">
      <div className="title-AdminPages">Calificaciones</div>
      <div className="conteiner_tabla-AdminPage">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Calificaciones
            </Button>
            <Button
              color="primary"
              onClick={() => {
                routeChange();
              }}
            >
              imprimir
            </Button>
          </div>
          <div className="botones-AdminPages">
            <Input
              placeholder="busqueda..."
              className="search-AdminPages"
              onChange={handleState}
            ></Input>
          </div>
        </div>
        <div className="table-AdminPages">
          <Table hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>ID_Usuario</th>
                <th>Materia</th>
                <th>Periodo</th>
                <th>Nota</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {calificacionesTemp.map((val, key) => {
                return (
                  <tr>
                    <th>{val.ID}</th>
                    <td>{val.ID_Usuario}</td>
                    <td>{val.Materia}</td>
                    <td>{val.Periodo}</td>
                    <td>{val.Nota}</td>

                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setid_usuarioUpdate(val.ID_Usuario);
                            setmateriaUpdate(val.Materia);
                            setnotaUpdate(val.Nota);
                            setperiodoUpdate(val.Periodo);
                            toggleUpdateState();
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
          <Modal isOpen={modalInsertState} toggle={toggleInsertState}>
            <ModalHeader toggle={toggleInsertState}>
              Agregar Calificaciones
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="ID_Usuario" hidden></Label>
                <Input
                  type="select"
                  id="ID_Usuario"
                  onChange={(event) => {
                    setId_usuarioInsert(event.target.value);
                  }}
                >
                  <option disabled selected="ID_Usuario">
                    ID_Usuario
                  </option>
                  {comboboxCalificaciones.map((val, key) => {
                    return (
                      <option value={val.ID}>
                        {val.Nombres + " " + val.Apellidos}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Materia" hidden></Label>
                    <Input
                      type="select"
                      id="Materia"
                      onChange={(event) => {
                        setMateriaInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="Materia">
                        Materia
                      </option>
                      {cbx_calificaciones.map((val, key) => {
                        return (
                          <option value={val.ID}>
                            {val.Cod_Materia + " " + val.Nombre}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Periodo" hidden></Label>
                    <Input
                      type="select"
                      id="Periodo"
                      onChange={(event) => {
                        setPeriodoInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="Periodo">
                        Periodo
                      </option>
                      {comboboxPeriodos.map((val, key) => {
                        return <option value={val.ID}>{val.Nombre}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="Nota" hidden></Label>
                <Input
                  autoComplete="off"
                  id="Nota"
                  placeholder="Nota"
                  onChange={(event) => {
                    setnotaInsert(event.target.value);
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  insertcalificaciones();
                  refreshpage();
                }}
              >
                Aceptar
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={modalUpdateState} toggle={toggleUpdateState}>
            {updateData.map((val, key) => {
              return (
                <>
                  <ModalHeader toggle={toggleUpdateState}>
                    Agregar Calificaciones
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="ID_Usuario" hidden></Label>
                      <Input
                        type="select"
                        defaultValue={val.ID_Usuario}
                        id="ID_Usuario"
                        onChange={(event) => {
                          setid_usuarioUpdate(event.target.value);
                        }}
                      >
                        <option disabled selected="ID_Usuario">
                          ID_Usuario
                        </option>
                        {comboboxCalificaciones.map((val, key) => {
                          return (
                            <option value={val.ID}>
                              {val.Nombres + " " + val.Apellidos}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Materia" hidden></Label>
                          <Input
                            type="select"
                            id="Materia"
                            defaultValue={val.Materia}
                            onChange={(event) => {
                              setmateriaUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="Materia">
                              Materia
                            </option>
                            {cbx_calificaciones.map((val, key) => {
                              return (
                                <option value={val.ID}>
                                  {val.Cod_Materia + " " + val.Nombre}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Periodo" hidden></Label>
                          <Input
                            type="select"
                            id="Periodo"
                            defaultValue={val.Periodo}
                            onChange={(event) => {
                              setperiodoUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="Periodo">
                              Periodo
                            </option>
                            {comboboxPeriodos.map((val, key) => {
                              return (
                                <option value={val.ID}>{val.Nombre}</option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="Nota" hidden></Label>
                      <Input
                        autoComplete="off"
                        id="Nota"
                        defaultValue={val.Nota}
                        placeholder="Nota"
                        onChange={(event) => {
                          setnotaUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        Updatecalificaciones(val.ID);
                        refreshpage();
                      }}
                    >
                      Aceptar
                    </Button>
                  </ModalFooter>
                </>
              );
            })}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CalificacionesAdmin;
