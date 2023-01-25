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
  Form,
  Row,
  Col,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "../libs/axios";
import { MdEdit } from "react-icons/md";

const Materias_InscritasAdmin = () => {

let navigate = useNavigate();
const routeChange = () => {
let path = "/print/materias_inscritas";
navigate(path);
};

  const [materias_inscritasarray, setMaterias_inscritasarray] = useState([]);
  const [materias_inscritasTemp, setMaterias_inscritasTemp] = useState([]);
  const [search, setSearch] = useState("");
  const [comboboxAlumno_MatI, setcomboboxAlumno_MatI] = useState([]);

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [alumnoInsert, setalumnoInsert] = useState("");
  const [periodoInsert, setperiodoInsert] = useState("");
  const [materiaInsert, setmateriaInsert] = useState("");

  /* STATE UPDATE */

  const [updateData, setUpdateData] = useState([]);
  const [alumnoUpdate, setAlumnoUpdate] = useState("");
  const [periodoUpdate, setPeriodoUpdate] = useState("");
  const [materiaUpdate, setMateriaUpdate] = useState("");

  /* BACKEND INSERTAR */

  const getAlumno = () => {
    Axios.get("/comboboxAlumno_MatI").then((response) => {
      setcomboboxAlumno_MatI(response.data);
    });
  };

  const getPeriodo = () => {
    Axios.get("/comboboxPeriodo_MatI").then((response) => {
      setcomboboxPeriodo_MatI(response.data);
    });
  };

  const getMateria = () => {
    Axios.get("/comboboxMateria_MatI").then((response) => {
      setcomboboxMateria_MatI(response.data);
    });
  };

  const insertMaterias_Inscritas = () => {
    Axios.post("/Materias_Inscritas", {
      alumno: alumnoInsert,
      periodo: periodoInsert,
      materia: materiaInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
  };

  /* BACKEND BUSQUEDA Y SELECT */

  const getSearch = () => {
    Axios.get("/getMaterias_Inscritas").then((response) => {
      setMaterias_inscritasTemp(response.data);
      setMaterias_inscritasarray(response.data);
    });
  };

  useEffect(() => {
    getSearch();
    getAlumno();
    getPeriodo();
    getMateria();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = materias_inscritasarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Alumno.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Periodo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Materia.toString()
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

  /*  BACKEND UPDATE */
  const execUpdate = (id) => {
    Axios.post("/getmaterias_inscritasUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response[0].data);
    });
  };

  const updateMaterias_Inscritas = (id) => {
    Axios.put("/updateMaterias_Inscritas", {
      id: id,
      alumno: alumnoUpdate,
      periodo: periodoUpdate,
      materia: materiaUpdate,
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
      <div className="title-AdminPages">Materias-Usuarios</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Materia-Usuario
            </Button>

            <Button color="primary" onClick={() => (navigate)}>Imprimir</Button>
          </div>
          <div className="botones-AdminPages">
            <Input
              placeholder="Busqueda..."
              className="search-AdminPages"
              onChange={handleChange}
            ></Input>
          </div>
        </div>
      </div>
      <div className="table-AdminPages">
        <Table hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Alumno</th>
              <th>Materia</th>
              <th>Periodo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias_inscritasTemp.map((val, key) => {
              return (
                <tr>
                  <th>{val.ID}</th>
                  <td>{val.Alumno}</td>
                  <td>{val.Periodo}</td>
                  <td>{val.Materia}</td>
                  <td>
                    <div className="acciones-AdminPages">
                      <Button
                        color="primary"
                        onClick={() => {
                          execUpdate(val.ID);
                          setAlumnoUpdate(val.Alumno);
                          setPeriodoUpdate(val.Periodo);
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
            Agregar Materias-Usuarios
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="Alumno" hidden></Label>
              <Input
                type="select"
                autoComplete="off"
                id="Alumno"
                onChange={(event) => {
                  setalumnoInsert(event.target.value);
                }}
              >
                <option disabled selected="selected">
                  Alumno
                </option>
                {comboboxAlumno_MatI.map((val, key) => {
                  return (
                    <option value={val.ID}>
                      {val.Cod_Materia +
                        " - " +
                        val.Nombre +
                        " - " +
                        val.Apellidos}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Periodo" hidden></Label>
              <Input
                type="select"
                autoComplete="off"
                id="Periodo"
                onChange={(event) => {
                  setperiodoInsert(event.target.value);
                }}
              >
                <option disabled selected="selected">
                  Periodo
                </option>
                {comboboxAlumno_MatI.map((val, key) => {
                  return (
                    <option value={val.ID}>
                      {val.Cod_Materia + " - " + val.Nombre}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
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
                  Materia
                </option>
                {comboboxAlumno_MatI.map((val, key) => {
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
                insertMaterias_Inscritas();
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
                  Actualizar Materias-Usuarios
                </ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="Alumno" hidden></Label>
                    <Input
                      type="select"
                      autoComplete="off"
                      id="Alumno"
                      defaultValue={val.Alumno}
                      onChange={(event) => {
                        setAlumnoUpdate(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Alumno
                      </option>
                      {comboboxAlumno_MatI.map((val, key) => {
                        return (
                          <option value={val.ID}>
                            {val.Cod_Materia +
                              " - " +
                              val.Nombre +
                              " - " +
                              val.Apellidos}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Periodo" hidden></Label>
                    <Input
                      defaultValue={val.Periodo}
                      type="select"
                      autoComplete="off"
                      id="Periodo"
                      onChange={(event) => {
                        setPeriodoUpdate(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Periodo
                      </option>
                      {comboboxAlumno_MatI.map((val, key) => {
                        return (
                          <option value={val.ID}>
                            {val.Cod_Materia + " - " + val.Nombre}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
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
                        Materia
                      </option>
                      {comboboxAlumno_MatI.map((val, key) => {
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
                      updateMaterias_Inscritas(val.ID);
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
  );
};

export default Materias_InscritasAdmin;
