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

const PeriodosAdmin = () => {
  const [periodosarray, setPeriodosarry] = useState([]);
  const [peridosTemp, setPeriodoTemp] = useState([]);
  const [Search, setSearch] = useState("");

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [nombreInsert, setnombreInsert] = useState("");
  const [f_inicialInsert, setf_inicialInsert] = useState("");
  const [f_finalInsert, setf_finalInsert] = useState("");
  const [estadoInsert, setestadoInsert] = useState("");

  /* STATE UPDATE */
  const [updateData, setUpdateData] = useState([]);
  const [nombreUpdate, setNombreUpdate] = useState("");
  const [f_inicialUpdate, setf_inicialUpdate] = useState("");
  const [f_finalUpdate, setf_finalUpdate] = useState("");
  const [estadoUpdate, setestadoUpdate] = useState("");

  /* BACKEND INSERTAR */

  const navigate = useNavigate();
  
  const insertPeriodos = () => {
    Axios.post("/insertarPeriodos", {
      nombre: nombreInsert,
      f_inicial: f_inicialInsert,
      f_final: f_finalInsert,
      estado: estadoInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
  };
  /*BACKEND BUSQUEDA Y SELECT */

  const getSearch = () => {
    Axios.get("/getPeriodos").then((response) => {
      setPeriodoTemp(response.data);
      setPeriodosarry(response.data);
    });
  };

  useEffect(() => {
    getSearch();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = periodosarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.F_Inicio.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.F_Final.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Estado.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setPeriodoTemp(resultadobusqueda);
  };

  /*BACKEND UPDATE*/
  const execUpdate = (id) => {
    Axios.post("/getPeriodosUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const Updateperiodos = (id) => {
    Axios.put("/updatePeriodos", {
      id: id,
      Nombre: nombreUpdate,
      F_Inicial: f_inicialUpdate,
      F_Final: f_finalUpdate,
      Estado: estadoUpdate,
    }).then(() => {
      toggleUpdateState;
      console.log("success!");
    });
  };
  /*FUNCION VARIAS*/
  function refreshpage() {
    window.location.reload(false);
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  return (
    <div className="container-AdminPages">
      <div className="title-AdminPages">Periodos</div>
      <div className="conteiner_tabla-AdminPage">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Periodos
            </Button>
            <Button color="primary" className="button-AdminPages" onClick={() => navigate("/print/periodos")}>
              imprimir
            </Button>
          </div>
          <div className="botones-AdminPages">
            <Input
              placeholder="busqueda..."
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
                <th>f_inicial</th>
                <th>f_final</th>
                <th>estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {peridosTemp.map((val, key) => {
                return (
                  <tr key={key}>
                    <th>{val.ID}</th>
                    <td>{val.Nombre}</td>
                    <td>{val.F_Inicio}</td>
                    <td>{val.F_Final}</td>
                    <td>{val.Estado}</td>
                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setNombreUpdate(val.Nombre);
                            setf_inicialUpdate(val.F_Inicio.substring(0, 10));
                            setf_finalUpdate(val.F_Final.substring(0, 10));
                            setestadoUpdate(val.Estado);
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
              Agregar periodo
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="Nombre" hidden></Label>
                <Input
                  id="Nombre"
                  placeholder="Nombre"
                  autoComplete="off"
                  onChange={(event) => {
                    setnombreInsert(event.target.value);
                  }}
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="F_Inicial" hidden></Label>
                    <Input
                      id="F_Inicial"
                      type="date"
                      autoComplete="off"
                      onChange={(event) => {
                        setf_inicialInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="F_Final" hidden></Label>
                    <Input
                      id="F_Final"
                      type="date"
                      autoComplete="off"
                      onChange={(event) => {
                        setf_finalInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="Estado" hidden></Label>
                <Input
                  type="select"
                  id="estado"
                  autoComplete="off"
                  onChange={(event) => {
                    setestadoInsert(event.target.value);
                  }}
                >
                  <option disabled selected="selected">
                    Activo
                  </option>
                  <option value={1}>Si</option>
                  <option value={0}>No</option>
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  insertPeriodos();
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
                    Agregar periodo
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Nombre" hidden></Label>
                      <Input
                        id="Nombre"
                        placeholder="Nombre"
                        autoComplete="off"
                        defaultValue={val.Nombre}
                        onChange={(event) => {
                          setNombreUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="F_Inicial" hidden></Label>
                          <Input
                            id="F_Inicial"
                            type="date"
                            autoComplete="off"
                            defaultValue={val.F_Inicio.substring(0, 10)}
                            onChange={(event) => {
                              setf_inicialUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="F_Final" hidden></Label>
                          <Input
                            id="F_Final"
                            type="date"
                            defaultValue={val.F_Final.substring(0, 10)}
                            autoComplete="off"
                            onChange={(event) => {
                              setf_finalUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="Estado" hidden></Label>
                      <Input
                        type="select"
                        id="estado"
                        autoComplete="off"
                        defaultValue={val.Estado}
                        onChange={(event) => {
                          setestadoUpdate(event.target.value);
                        }}
                      >
                        <option disabled selected="selected">
                          Activo
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </Input>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        Updateperiodos(val.ID);
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
export default PeriodosAdmin;
