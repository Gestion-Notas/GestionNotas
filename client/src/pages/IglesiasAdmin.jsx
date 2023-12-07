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

const IglesiaAdmin = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/print/iglesias";
    navigate(path);
  };

  const [iglesiasarray, setIglesiasarray] = useState([]);
  const [iglesiasTemp, setIglesiasTemp] = useState([]);
  const [cbpastor, setCbPastor] = useState([]);
  const [search, setSearch] = useState("");

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [nombreInsert, setNombreInsert] = useState("");
  const [direccionInsert, setDireccionInsert] = useState("");
  const [pastorInsert, setPastorInsert] = useState("");

  /* STATE UPDATE */

  const [updateData, setUpdateData] = useState([]);
  const [nombreUpdate, setNombreUpdate] = useState("");
  const [direccionUpdate, setDireccionUpdate] = useState("");
  const [pastorUpdate, setPastorUpdate] = useState("");

  /* BACKEND INSERTAR */

  const getIglesias = () => {
    Axios.get("comboboxIglesia").then((response) => {
      setCbPastor(response.data);
    });
  };

  const insertPastor = () => {
    Axios.post("/insertIglesias", {
      nombre: nombreInsert,
      direccion: direccionInsert,
      pastor: pastorInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
  };

  /* BACKEND BUSQUEDA Y SELECT */

  const getSearch = () => {
    Axios.get("/getIglesias").then((response) => {
      setIglesiasTemp(response.data);
      setIglesiasarray(response.data);
    });
  };

  useEffect(() => {
    getSearch();
    getIglesias();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = iglesiasarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Direccion.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Pastor.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setIglesiasTemp(resultadobusqueda);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  /* BACKEND UPDATE */

  const execUpdate = (id) => {
    Axios.post("/getIglesiasUptade", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const updateIglesias = (id) => {
    Axios.put("/updateIglesias", {
      id: id,
      nombre: nombreUpdate,
      direccion: direccionUpdate,
      pastor: pastorUpdate,
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
      <div className="title-AdminPages">Iglesias</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Iglesia
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
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Pastor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {iglesiasTemp.map((val, key) => {
                return (
                  <tr key={key}>
                    <th>{val.ID}</th>
                    <td>{val.Nombre}</td>
                    <td>{val.Direccion}</td>
                    <td>{val.Pastor}</td>
                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setNombreUpdate(val.Nombre);
                            setDireccionUpdate(val.Direccion);
                            setPastorUpdate(val.Pastor);
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
              Agregar Iglesias
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nombre" hidden></Label>
                    <Input
                      id="Nombre"
                      autoComplete="off"
                      placeholder="Nombre"
                      onChange={(event) => {
                        setNombreInsert(event.target.value);
                      }}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Pastor" hidden></Label>
                    <Input
                      type="select"
                      autoComplete="off"
                      onChange={(event) => {
                        setPastorInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Pastor
                      </option>
                      {cbpastor.map((val, key) => {
                        return (
                          <option value={val.ID}>
                            {val.Nombres + " " + val.Apellidos}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="direccion" hidden></Label>
                <Input
                  id="direccion"
                  placeholder="Direccion"
                  autoComplete="off"
                  onChange={(event) => {
                    setDireccionInsert(event.target.value);
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  insertPastor();
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
                    Actualizar Iglesias
                  </ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Nombre" hidden></Label>
                          <Input
                            id="Nombre"
                            autoComplete="off"
                            defaultValue={val.Nombre}
                            placeholder="Nombre"
                            onChange={(event) => {
                              setNombreUpdate(event.target.value);
                            }}
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Pastor" hidden></Label>
                          <Input
                            type="select"
                            autoComplete="off"
                            defaultValue={val.Pastor}
                            onChange={(event) => {
                              setPastorUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Pastor
                            </option>
                            {cbpastor.map((val, key) => {
                              return (
                                <option value={val.ID}>
                                  {val.Nombres + " " + val.Apellidos}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="direccion" hidden></Label>
                      <Input
                        id="direccion"
                        placeholder="Direccion"
                        defaultValue={val.Direccion}
                        autoComplete="off"
                        onChange={(event) => {
                          setDireccionUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        updateIglesias(val.ID);
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

export default IglesiaAdmin;
