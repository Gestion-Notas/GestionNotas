import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
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

const Criterios_EvaluacionAdmin = () => {
let navigate = useNavigate();
const routeChange = () => {
let path = "/print/criterios_evaluacion";
navigate(path);
};

  const [criterios_evaluacionarray, setcriterios_evaluacionarray] = useState(
    []
  );
  const [criterios_evaluaciontemp, setcriterios_evaluaciontemp] = useState([]);
  const [search, setSearch] = useState("");
  const [cbMaterias, setCbMaterias] = useState([]);
  const [cbPeriodos, setCbPeriodos] = useState([]);

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [nombreInsert, setnombreInsert] = useState("");
  const [materiaInsert, setmateriaInsert] = useState("");
  const [periodoInsert, setperiodoInsert] = useState("");
  const [maxima_calificacionInsert, setmaxima_calificacionInsert] =
    useState("");

  /* STATE UPDATE */

  const [updateData, setUpdateData] = useState([]);
  const [nombreUpdate, setnombreUpdate] = useState("");
  const [materiaUpdate, setmateriaUpdate] = useState("");
  const [periodoUpdate, setperiodoUpdate] = useState("");
  const [maxima_calificacionUpdate, setmaxima_calificacionUpdate] =
    useState("");

  /* BACKEND INSERTAR */

  const getMaterias = () => {
    Axios.get("/comboboxMateriaAsuntos").then((response) => {
      setCbMaterias(response.data);
    });
  };

  const getPeriodos = () => {
    Axios.get("/comboboxPeriodoAsuntos").then((response) => {
      setCbPeriodos(response.data);
    });
  };

  const insertCriterios_Evaluacion = () => {
    Axios.post("/insertCriterios_Evaluacion", {
      nombre: nombreInsert,
      materia: materiaInsert,
      periodo: periodoInsert,
      maxima_calificacion: maxima_calificacionInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
  };

  /* BACKEND BUSQUEDA Y SELECT */

  const getSearch = () => {
    Axios.get("/getCriterios_Evaluacion").then((response) => {
      setcriterios_evaluaciontemp(response.data);
      setcriterios_evaluacionarray(response.data);
    });
  };

  useEffect(() => {
    getSearch();
    getMaterias();
    getPeriodos();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = criterios_evaluacionarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Materia.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Periodo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Maxima_Calificacion.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });

    setcriterios_evaluaciontemp(resultadobusqueda);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  /*  BACKEND UPDATE */
  const execUpdate = (id) => {
    Axios.get("/getcriterios_evaluacionUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response[0].data);
    });
  };

  const updateCriterios_Evaluacion = (id) => {
    Axios.put("/updateCriterios_Evaluacion", {
      id:id,
      nombre: nombreUpdate,
      materia: materiaUpdate,
      periodo: periodoUpdate,
      maxima_calificacion: maxima_calificacionUpdate,
    }).then(() => {
      toggleUpdateState;
      console.log("success!");
    });
  };

  /*  FUNCIONES VARIAS*/

  function refreshpage() {
    window.location.reload(false);
  }

  return (
    <div className="container-AdminPages">
      <div className="title-AdminPages">Criterios</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="buton-AdminPages"
            >
              Agregar Criterio
            </Button>
            <Button
              color="primary"
              onClick={() => {routeChange();
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
                <th>Nombre</th>
                <th>Materia</th>
                <th>Periodo</th>
                <th>Maxima Calificacion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {criterios_evaluaciontemp.map((val, key) => {
                return (
                  <tr>
                    <th>{val.ID}</th>
                    <td>{val.Nombre}</td>
                    <td>{val.Materia}</td>
                    <td>{val.Periodo}</td>
                    <td>{val.Maxima_Calificacion}</td>
                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setnombreUpdate(val.Nombre);
                            setmateriaUpdate(val.Materia);
                            setperiodoUpdate(val.Periodo);
                            setmaxima_calificacionUpdate(
                              val.Maxima_Calificacion
                            );
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
        </div>

        <Modal isOpen={modalInsertState} toggle={toggleInsertState}>
          <ModalHeader toggle={toggleInsertState}>
            Agregar Criterios
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="Nombre" hidden></Label>
                  <Input
                    id="Nombre"
                    onChange={(event) => {
                      setnombreInsert(event.target.value);
                    }}
                    placeholder="Nombre"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="Materia" hidden></Label>
                  <Input
                    type="select"
                    autoComplete="off"
                    id="Materia"
                    onChange={(event) => {
                      setmateriaInsert(event.target.value);
                    }}
                  >
                    <option disabled selected="selected">
                      Materias
                    </option>
                    {cbMaterias.map((val, key) => {
                      return (
                        <option key={key} value={val.ID}>
                          {val.Cod_Materia + " - " + val.Nombre}
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
                  setperiodoInsert(event.target.value);
                }}
                placeholder="Periodo"
              >
                <option disable selected="selected">
                  Periodo
                </option>
                {cbPeriodos.map((val, key) => {
                  return (
                    <option key={key} value={val.ID}>
                      {val.Nombre}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="Calificacion Maxima" hidden></Label>
              <Input
                id="Calificacion_Maxima"
                onChange={(event) => {
                  setmaxima_calificacionInsert(event.target.value);
                }}
                placeholder="Calificacion Maxima"
              ></Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => {
                insertCriterios_Evaluacion();
                refreshpage();
              }}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalUpdateState} toggle={toggleUpdateState}>
          {updateData.map((val, key) => {
            /*return (*/
            <>
              <ModalHeader toggle={toggleUpdateState}>
                Agregar Criterios
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Nombre" hidden></Label>
                      <Input
                      defaultValue={val.Nombre} 
                        id="Nombre"
                        onChange={(event) => {
                          setnombreUpdare(event.target.value);
                        }}
                        placeholder="Nombre"
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Materia" hidden></Label>
                      <Input
                        type="select"
                        autoComplete="off"
                        id="Materia"
                        defaultValue={val.Materia}
                        onChange={(event) => {
                          setmateriaUpdate(event.target.value);
                        }}
                      >
                        <option disabled selected="selected">
                          Materias
                        </option>
                        {cbMaterias.map((val, key) => {
                          return (
                            <option key={key} value={val.ID}>
                              {val.Cod_Materia + " - " + val.Nombre}
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
                    defaultValue={val.Periodo}
                    type="select"
                    id="Periodo"
                    onChange={(event) => {
                      setperiodoUpdate(event.target.value);
                    }}
                    placeholder="Periodo"
                  >
                    <option disable selected="selected">
                      Periodo
                    </option>
                    {cbPeriodos.map((val, key) => {
                      return (
                        <option key={key} value={val.ID}>
                          {val.Nombre}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="Calificacion Maxima" hidden></Label>
                  <Input
                  defaultValue={val.Calificacion_Maxima}
                    id="Calificacion_Maxima"
                    onChange={(event) => {
                      setmaxima_calificacionUpdate(event.target.value);
                    }}
                    placeholder="Calificacion Maxima"
                  ></Input>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  onClick={() => {
                    updateCriterios_Evaluacion(val.ID);
                    refreshpage();
                  }}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>;
            /*);*/
          })}
        </Modal>
      </div>
    </div>
  );
};

export default Criterios_EvaluacionAdmin;
