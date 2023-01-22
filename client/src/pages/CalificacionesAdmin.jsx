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
import Axios from "axios";
import { MdEdit } from "react-icons/md";

const CalificacionesAdmin = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/print/calificaciones";
    navigate(path);
  };

  const [claificacionesarry, setclaificacionesarry] = useState("");
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
  const [updateData, setupdateData] = useState([]);
  const [id_usuarioUpdate, setid_usuarioUpdate] = useState("");
  const [materiaUpdate, setmateriaUpdate] = useState("");
  const [notaUpdate, setnotaUpdate] = useState("");
  const [periodoUpdate, setperiodoUpdate] = useState("");

  /* BACKEND INSERTAR */

  Axios.get("http://localhost:4001/comboboxCalificaciones").then((response) => {
    setcomboboxCalificaciones(response.data);
  });

  Axios.get("http://localhost:4001/cbx_calificaciones").then((response) => {
    setcbx_calificaciones(response.data);
  });

  Axios.get("http://localhost:4001/comboboxPeriodos").then((response) => {
    setcomboboxPeriodos(response.data);
  });

  const insertcalificaciones = () => {
    Axios.post("http://localhost:4001/insertCalificaciones", {
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
    Axios.get("http://localhost:4001/getCalificaciones").then((response) => {
      setcalificacionesTemp(response.data);
      setclaificacionesarry(response.data);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = claificacionesarry.filter((elemento) => {
      if (
        elemento.ID.toString().tolowercase().includes(busqueda.tolowercase()) ||
        elemento.ID_Usuario.toString()
          .tolowercase()
          .includes(busqueda.tolowercase()) ||
        elemento.Materia.toString()
          .tolowercase()
          .includes(busqueda.tolowercase()) ||
        elemento.Nota.toString()
          .tolowercase()
          .includes(busqueda.tolowercase()) ||
        elemento.Periodo.toString()
          .tolowercase()
          .includes(busqueda.tolowercase())
      ) {
        return elemento;
      }
    });
    setcalificacionesTemp(resultadobusqueda);
  };

  const handleState = (e) => {
    setSearch(e.target.value);
    filtro(e.tragert.value);
  };

  /*BACKEND UPDATE*/
  const execUpdate = (id) => {
    Axios.post("http://localhost:4001/getCalificacionesUptade", {
      id: id,
    }).then((response) => {
      setupdateData(response.data);
    });
  };

  const Updatecalificaciones = (id) => {
    Axios.put("http://localhost:4001/updateCalificaciones", {
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
              onClick={handleState}
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
                    <th>{val.ID_Usuario}</th>
                    <th>{val.Materia}</th>
                    <th>{val.Periodo}</th>
                    <th>{val.Nota}</th>

                    <th>
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
                    </th>
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
                        {val.Nombres + " " + val.Apellido}
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
                            {val.Nombres + " " + val.Apellido}
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
                        return (
                          <option value={val.ID}>
                            {val.Nombres + " " + val.Apellido}
                          </option>
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
        </div>
      </div>
    </div>
  );
};

export default CalificacionesAdmin;
