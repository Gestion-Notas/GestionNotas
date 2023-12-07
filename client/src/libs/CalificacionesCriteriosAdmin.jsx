import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const CalificacionesCriteriosAdmin = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/print/calificaciones_criterios";
    navigate(path);
  };

  const [calificacionescriteriosarray, setCalificacionesCriteriosarray] =
    useState([]);
  const [calificacionescriteriosTemp, setCalificacionesCriteriosTemp] =
    useState([]);
  const [cbUsuario, setCbUsuario] = useState([]);
  const [cbCriterio, setCbCriterio] = useState([]);
  const [cbPeriodo, setCbPeriodo] = useState([]);
  const [search, setSearch] = useState("");

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [id_UsuarioInsert, setID_UsuarioInsert] = useState("");
  const [notaInsert, setNotaInsert] = useState("");
  const [criterioInsert, setCriterioInsert] = useState("");
  const [periodoInsert, setPeriodoInsert] = useState("");

  /* STATE UPDATE */

  const [updateData, setUpdateData] = useState([]);
  const [id_UsuarioUpdate, setID_UsuarioUpdate] = useState("");
  const [notaUpdate, setNotaUpdate] = useState("");
  const [criterioUpdate, setCriterioUpdate] = useState("");
  const [periodoUpdate, setPeriodoUpdate] = useState("");

  /* BACKEND INSERTAR */

  const getComboboxes = () => {
    Axios.get("/comboboxCalificaciones").then((response) => {
      setCbUsuario(response.data);
    });
    Axios.get("/comboboxCriterios").then((response) => {
      setCbCriterio(response.data);
    });
    Axios.get("/comboboxPeriodos").then((response) => {
      setCbPeriodo(response.data);
    });
  };

  const insertCalificacionesCriterios = () => {
    Axios.post("/insertCalificaciones_Criterios", {
      id_usuario: id_UsuarioInsert,
      nota: notaInsert,
      criterio: criterioInsert,
      periodo: periodoInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
  };

  /* BACKEND BUSQUEDA Y SELECT */

  const getSearch = () => {
    Axios.get("/getCalificaciones_Criterios").then((response) => {
      setCalificacionesCriteriosTemp(response.data);
      setCalificacionesCriteriosarray(response.data);
    });
  };

  useEffect(() => {
    getSearch();
    getComboboxes();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = calificacionescriteriosarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.ID_Usuario.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nota.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Criterio.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Periodo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCalificacionesCriteriosTemp(resultadobusqueda);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  /* BACKEND UPDATE */

  const execUpdate = (id) => {
    Axios.post("/getCalificaciones_CriteriosUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const updateCalificacionesCriterios = (id) => {
    Axios.put("/updateCalificaciones_Criterios", {
      id: id,
      id_usuario: id_UsuarioUpdate,
      nota: notaUpdate,
      criterio: criterioUpdate,
      periodo: periodoUpdate,
    }).then(() => {
      toggleUpdateState();
      console.log("success!");
    });
  };

  /* FUNCIONES VARIAS */

  function refreshpage() {
    window.location.reload(false);
  }

  return (
    <div className="container-AdminPages">
      <div className="title-AdminPages">CALIFICACIONES CRITERIOS</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Calificación
            </Button>
            <Button
              color="primary"
              onClick={() => {
                routeChange();
              }}
            >
              Imprimir
            </Button>
          </div>
          <div className="botones-AdminPages">
            <Input
              placeholder="Busqueda..."
              className="search-AdminPages"
              onChange={handleChange}
            ></Input>
          </div>
        </div>
        <div className="table-AdminPages">
          <Table hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>ID_Usuario</th>
                <th>Nota</th>
                <th>Criterio</th>
                <th>Periodo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {calificacionescriteriosTemp.map((val, key) => {
                return (
                  <tr key={key}>
                    <th>{val.ID}</th>
                    <td>{val.ID_Usuario}</td>
                    <td>{val.Nota}</td>
                    <td>{val.Criterio}</td>
                    <td>{val.Periodo}</td>
                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setID_UsuarioUpdate(val.ID_Usuario);
                            setNotaUpdate(val.Nota);
                            setCriterioUpdate(val.Criterio);
                            setPeriodoUpdate(val.Periodo);
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
              Agregar Calificación Por Criterio
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="ID_Usuario" hidden></Label>
                <Input
                  id="ID_Usuario"
                  autoComplete="off"
                  type="select"
                  onChange={(event) => {
                    setID_UsuarioInsert(event.target.value);
                  }}
                >
                  <option disabled selected="selected">
                    ID_Usuario
                  </option>
                  {cbUsuario.map((val, key) => {
                    return (
                      <option value={val.ID}>
                        {val.Cod_Usuario +
                          " - " +
                          val.Nombres +
                          " " +
                          val.Apellidos}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nota" hidden></Label>
                    <Input
                      id="Nota"
                      placeholder="Nota"
                      autoComplete="off"
                      onChange={(event) => {
                        setNotaInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Criterio" hidden></Label>
                    <Input
                      id="Criterio"
                      type="select"
                      autoComplete="off"
                      onChange={(event) => {
                        setCriterioInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Criterio
                      </option>
                      {cbCriterio.map((val, key) => {
                        return (
                          <option value={val.ID}>
                            {val.ID +
                              " - " +
                              val.Nombre_Criterio +
                              " (" +
                              val.Nombre_Materia +
                              ")"}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
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
                  {cbPeriodo.map((val, key) => {
                    return <option value={val.ID}>{val.Nombre}</option>;
                  })}
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  insertCalificacionesCriterios();
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
                    Agregar Calificación Por Criterio
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="ID_Usuario" hidden></Label>
                      <Input
                        id="ID_Usuario"
                        autoComplete="off"
                        type="select"
                        defaultValue={val.ID_Usuario}
                        onChange={(event) => {
                          setID_UsuarioUpdate(event.target.value);
                        }}
                      >
                        <option disabled selected="selected">
                          ID_Usuario
                        </option>
                        {cbUsuario.map((val, key) => {
                          return (
                            <option value={val.ID}>
                              {val.Cod_Usuario +
                                " - " +
                                val.Nombres +
                                " " +
                                val.Apellidos}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Nota" hidden></Label>
                          <Input
                            id="Nota"
                            defaultValue={val.Nota}
                            placeholder="Nota"
                            autoComplete="off"
                            onChange={(event) => {
                              setNotaUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Criterio" hidden></Label>
                          <Input
                            id="Criterio"
                            type="select"
                            defaultValue={val.Criterio}
                            autoComplete="off"
                            onChange={(event) => {
                              setCriterioUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Criterio
                            </option>
                            {cbCriterio.map((val, key) => {
                              return (
                                <option value={val.ID}>
                                  {val.ID +
                                    " - " +
                                    val.Nombre_Criterio +
                                    " (" +
                                    val.Nombre_Materia +
                                    ")"}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="Periodo" hidden></Label>
                      <Input
                        type="select"
                        id="Periodo"
                        defaultValue={val.Periodo}
                        onChange={(event) => {
                          setPeriodoUpdate(event.target.value);
                        }}
                      >
                        <option disabled selected="Periodo">
                          Periodo
                        </option>
                        {cbPeriodo.map((val, key) => {
                          return <option value={val.ID}>{val.Nombre}</option>;
                        })}
                      </Input>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        updateCalificacionesCriterios(val.ID);
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

export default CalificacionesCriteriosAdmin;
