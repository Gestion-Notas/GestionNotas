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
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "../libs/axios";
import { MdEdit } from "react-icons/md";

const RequisitosAdmin = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/print/requisitos";
    navigate(path);
  };

  const [requisitosarray, setRequisitosarray] = useState([]);
  const [requisitosTemp, setRequisitosTemp] = useState([]);
  const [cbMaterias, setCbMaterias] = useState([]);
  const [cbRequisitos, setCbRequisitos] = useState([]);
  const [search, setSearch] = useState("");

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [materiaInsert, setMateriaInsert] = useState("");
  const [requisitosInsert, setRequisitosInsert] = useState("");

  /* STATE UPDATE */

  const [updateData, setUpdateData] = useState([]);
  const [materiaUpdate, setMateriaUpdate] = useState("");
  const [requisitosUpdate, setRequisitosUpdate] = useState("");

  /* BACKEND INSERTAR */

  const getMaterias = () => {
    Axios.get("/getMaterias").then((response) => {
      setCbMaterias(response.data);
      setCbRequisitos(response.data);
    });
  };

  const insertRequisitos = () => {
    Axios.post("/insertRequisitos", {
      materia: materiaInsert,
      requisitos: requisitosInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
  };

  /* BACKEND BUSQUEDA Y SELECT */

  const getSearch = () => {
    Axios.get("/getRequisitos").then((response) => {
      setRequisitosTemp(response.data);
      setRequisitosarray(response.data);
    });
  };

  useEffect(() => {
    getSearch();
    getMaterias();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = requisitosarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Materia.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Requisitos.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setRequisitosTemp(resultadobusqueda);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  /* BACKEND UPDATE */

  const execUpdate = (id) => {
    Axios.post("/getrequisitosUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const updateRequisitos = (id) => {
    Axios.put("/updateRequisitos", {
      id: id,
      materia: materiaUpdate,
      requisitos: requisitosUpdate,
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
      <div className="title-AdminPages">Requisitos</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Requisitos
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
                <th>Materia</th>
                <th>Requisitos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requisitosTemp.map((val, key) => {
                return (
                  <tr key={key}>
                    <th>{val.ID}</th>
                    <td>{val.Materia}</td>
                    <td>{val.Requisitos}</td>

                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setRequisitosUpdate(val.Requisitos);
                            setMateriaUpdate(val.Materia);
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
              Agregar Requisitos
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="Materia" hidden></Label>
                <Input
                  type="select"
                  autoComplete="off"
                  id="Materia"
                  onChange={(event) => {
                    setMateriaInsert(event.target.value);
                  }}
                >
                  <option disabled selected="selected">
                    Materias
                  </option>
                  {cbMaterias.map((val, key) => {
                    return (
                      <option value={val.ID}>
                        {val.Cod_Materia + " - " + val.Nombre}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="Requisitos" hidden></Label>
                <Input
                  type="select"
                  autoComplete="off"
                  id="Requisitos"
                  onChange={(event) => {
                    setRequisitosInsert(event.target.value);
                  }}
                >
                  <option disabled selected="selected">
                    Requisitos
                  </option>
                  {cbRequisitos.map((val, key) => {
                    return (
                      <option value={val.ID}>
                        {val.Cod_Materia + " - " + val.Nombre}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  insertRequisitos();
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
                    Actualizar Requisitos
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Materia" hidden></Label>
                      <Input
                        defaultValue={val.Materia}
                        type="select"
                        autoComplete="off"
                        id="Materia"
                        onChange={(event) => {
                          setMateriaUpdate(event.target.value);
                        }}
                      >
                        <option disabled selected="selected">
                          Materias
                        </option>
                        {cbMaterias.map((val, key) => {
                          return (
                            <option value={val.ID}>
                              {val.Cod_Materia + " - " + val.Nombre}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Requisitos" hidden></Label>
                      <Input
                        defaultValue={val.Requisitos}
                        type="select"
                        autoComplete="off"
                        id="Requisitos"
                        onChange={(event) => {
                          setRequisitosUpdate(event.target.value);
                        }}
                      >
                        <option disabled selected="selected">
                          Requisitos
                        </option>
                        {cbRequisitos.map((val, key) => {
                          return (
                            <option value={val.ID}>
                              {val.Cod_Materia + " - " + val.Nombre}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        updateRequisitos(val.ID);
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

export default RequisitosAdmin;
