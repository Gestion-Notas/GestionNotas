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
  const [nombreUpdate, setNombreUpdate] = useState("");
  const [f_inicialUpdate, setf_inicialUpdate] = useState("");
  const [f_finalUpdate, setf_finalUpdate] = useState("");
  const [estadoUpdate, setestadoUpdate] = useState("");

  /* BACKEND INSERTAR */

  const insertPeriodos = () => {
    Axios.post("http://localhost:4001/insertarPeriodos", {
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
    Axios.get("http://localhost:4001/getPeriodos").then((response) => {
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
        elemento.ID.toString().tolowercase().includes(busqueda.tolowercase()) ||
        elemento.Nombre.toString()
          .tolowercase()
          .includes(busqueda.tolowercase()) ||
        elemento.F_Inicial.toString()
          .tolowercase()
          .includes(busqueda.tolowercase()) ||
        elemento.F_Final.toString()
          .tolowercase()
          .includes(busqueda.tolowercase()) ||
        elemento.Estado.toString()
          .tolowercase()
          .includes(busqueda.tolowercase())
      ) {
        return elemento;
      }
    });
    setiperiodoTemp(resultadobusqueda);
  };

  /*BACKEND UPDATE*/
  const execUpdate = (id) => {
    Axios.post("http://localhost:4001/getPeriodosUptade", {
      id: id,
    }).then((response) => {
      setupdateData(response.data);
    });
  };

  const Updatecalificaciones = (id) => {
    Axios.put("http://localhost:4001/updatePeriodos", {
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
            <Button color="primary" className="button-AdminPages">
              imprimir
            </Button>
          </div>
          <div className="botones-AdminPages">
            <Input
              placeholder="busqueda..."
              className="search-AdminPages"
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
              </tr>
            </thead>
            <tbody>
              {peridosTemp.map((val, key) => {
                return (
                  <tr key={key}>
                    <th>{val.ID}</th>
                    <td>{val.Nombre}</td>
                    <td>{val.F_Inicial}</td>
                    <td>{val.F_Final}</td>
                    <td>{val.Estado}</td>
                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            setnombreInsert(val.Nombre);
                            setf_inicialInsert(val.F_Inicial);
                            setf_finalInsert(val.F_Final);
                            setestadoInsert(val.Estado);
                            toggleInsertState();
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
                <Input id="Nombre" placeholder="Nombre"></Input>
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
                <Input type="select" id="estado">
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
        </div>
      </div>
    </div>
  );
};
export default PeriodosAdmin;
