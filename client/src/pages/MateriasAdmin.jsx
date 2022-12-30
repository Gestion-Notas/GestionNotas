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
import Axios from "axios";
import { MdEdit } from "react-icons/md";

const MateriasAdmin = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/print/materias";
    navigate(path);
  };

  const [materiasarray, setMateriasarray] = useState([]);
  const [materiasTemp, setMateriasTemp] = useState([]);
  const [cbMaestros, setCbMaestros] = useState([]);
  const [search, setSearch] = useState("");

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [id_maestroInsert, setId_maestroInsert] = useState("");
  const [cod_materiaInsert, setCod_materiaInsert] = useState("");
  const [nombreInsert, setNombreInsert] = useState("");
  const [descripcionInsert, setDescripcionInsert] = useState("");
  const [nivelInsert, setNivelInsert] = useState("");
  const [creditosInsert, setCreditosInsert] = useState("");

  /* STATE UPDATE */

  const [updateData, setUpdateData] = useState([]);
  const [id_maestroUpdate, setId_maestroUpdate] = useState("");
  const [cod_materiaUpdate, setCod_materiaUpdate] = useState("");
  const [nombreUpdate, setNombreUpdate] = useState("");
  const [descripcionUpdate, setDescripcionUpdate] = useState("");
  const [nivelUpdate, setNivelUpdate] = useState("");
  const [creditosUpdate, setCreditosUpdate] = useState("");

  /* BACKEND INSERTAR */

  const getMaestros = () => {
    Axios.get("http://localhost:4001/comboboxMaestros").then((response) => {
      setCbMaestros(response.data);
    });
  };

  const insertMateria = () => {
    Axios.post("http://localhost:4001/insertMaterias", {
      id_maestro: id_maestroInsert,
      cod_materia: cod_materiaInsert,
      nombre: nombreInsert,
      descripcion: descripcionInsert,
      nivel: nivelInsert,
      creditos: creditosInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
  };

  /* BACKEND BUSQUEDA Y SELECT */

  const getSearch = () => {
    Axios.get("http://localhost:4001/getMaterias").then((response) => {
      setMateriasTemp(response.data);
      setMateriasarray(response.data);
    });
  };

  useEffect(() => {
    getSearch();
    getMaestros();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = materiasarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.ID_Maestro.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Cod_Materia.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Descripcion.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nivel.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Creditos.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setMateriasTemp(resultadobusqueda);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  /* BACKEND UPDATE */

  const execUpdate = (id) => {
    Axios.post("http://localhost:4001/getmateriasUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const updateMateria = (id) => {
    Axios.put("http://localhost:4001/updateMaterias", {
      id: id,
      id_maestro: id_maestroUpdate,
      cod_materia: cod_materiaUpdate,
      nombre: nombreUpdate,
      descripcion: descripcionUpdate,
      nivel: nivelUpdate,
      creditos: creditosUpdate,
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
      <div className="title-AdminPages">Materias</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Materia
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
                <th>ID Maestro</th>
                <th>Cod_Materia</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Nivel</th>
                <th>Creditos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materiasTemp.map((val, key) => {
                return (
                  <tr key={key}>
                    <th>{val.ID}</th>
                    <td>{val.ID_Maestro}</td>
                    <td>{val.Cod_Materia}</td>
                    <td>{val.Nombre}</td>
                    <td>{val.Descripcion}</td>
                    <td>{val.Nivel}</td>
                    <td>{val.Creditos}</td>
                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setId_maestroUpdate(val.ID_Maestro);
                            setCod_materiaUpdate(val.Cod_Materia);
                            setNombreUpdate(val.Nombre);
                            setDescripcionUpdate(val.Descripcion);
                            setNivelUpdate(val.Nivel);
                            setCreditosUpdate(val.Creditos);
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
              Agregar Materias
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ID_Maestro" hidden></Label>
                    <Input
                      type="select"
                      autoComplete="off"
                      id="ID_Maestro"
                      onChange={(event) => {
                        setId_maestroInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Id_Maestro
                      </option>
                      {cbMaestros.map((val, key) => {
                        return (
                          <option value={val.ID}>
                            {val.Nombres + " " + val.Apellidos}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Cod_Materia" hidden></Label>
                    <Input
                      autoComplete="off"
                      id="Cod_Materia"
                      placeholder="Cod_Materia"
                      onChange={(event) => {
                        setCod_materiaInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="Nombre" hidden></Label>
                <Input
                  id="Nombre"
                  placeholder="Nombre"
                  autoComplete="off"
                  onChange={(event) => {
                    setNombreInsert(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Descripcion" hidden></Label>
                <Input
                  type="textarea"
                  id="Descripcion"
                  autoComplete="off"
                  placeholder="Descripción"
                  onChange={(event) => {
                    setDescripcionInsert(event.target.value);
                  }}
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nivel" hidden></Label>
                    <Input
                      type="select"
                      id="Nivel"
                      autoComplete="off"
                      onChange={(event) => {
                        setNivelInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Nivel
                      </option>
                      <option value={100}>Nivel 100</option>
                      <option value={200}>Nivel 200</option>
                      <option value={300}>Nivel 300</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Creditos" hidden></Label>
                    <Input
                      id="Creditos"
                      placeholder="Creditos"
                      autoComplete="off"
                      onChange={(event) => {
                        setCreditosInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  insertMateria();
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
                    Actualizar Materias
                  </ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="ID_Maestro" hidden></Label>
                          <Input
                            type="select"
                            id="ID_Maestro"
                            autoComplete="off"
                            defaultValue={val.ID_Maestro}
                            onChange={(event) => {
                              setId_maestroUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Id_Maestro
                            </option>
                            {cbMaestros.map((val, key) => {
                              return (
                                <option value={val.ID}>
                                  {val.Nombres + " " + val.Apellidos}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Cod_Materia" hidden></Label>
                          <Input
                            defaultValue={val.Cod_Materia}
                            id="Cod_Materia"
                            placeholder="Cod_Materia"
                            autoComplete="off"
                            onChange={(event) => {
                              setCod_materiaUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="Nombre" hidden></Label>
                      <Input
                        id="Nombre"
                        defaultValue={val.Nombre}
                        placeholder="Nombre"
                        autoComplete="off"
                        onChange={(event) => {
                          setNombreUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Descripcion" hidden></Label>
                      <Input
                        defaultValue={val.Descripcion}
                        type="textarea"
                        id="Descripcion"
                        placeholder="Descripción"
                        autoComplete="off"
                        onChange={(event) => {
                          setDescripcionUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Nivel" hidden></Label>
                          <Input
                            defaultValue={val.Nivel}
                            type="select"
                            id="Nivel"
                            autoComplete="off"
                            onChange={(event) => {
                              setNivelUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Nivel
                            </option>
                            <option value={100}>Nivel 100</option>
                            <option value={200}>Nivel 200</option>
                            <option value={300}>Nivel 300</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Creditos" hidden></Label>
                          <Input
                            defaultValue={val.Creditos}
                            id="Creditos"
                            placeholder="Creditos"
                            autoComplete="off"
                            onChange={(event) => {
                              setCreditosUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        updateMateria(val.ID);
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

export default MateriasAdmin;
