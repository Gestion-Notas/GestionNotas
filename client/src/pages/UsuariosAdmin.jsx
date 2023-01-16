import React, { useState, useEffect } from "react";
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

const UsuariosAdmin = () => {
  const [usuariosarray, setUsuariosArray] = useState([]);
  const [usuariosTemp, setUsuariosTemp] = useState([]);
  const [search, setSearch] = useState("");
  const [modalInsertstate, setModalInsertstate] = useState(false);
  const toggleInsertstate = () => setModalInsertstate(!modalInsertstate);

  /* USE STATE INSERT*/
  const [nombresInsert, setNombresInsert] = useState("");
  const [apellidosInsert, setApellidosInsert] = useState("");
  const [cedulaInsert, setCedulaInsert] = useState("");
  const [sexoInsert, setSexoInsert] = useState("");
  const [f_nacimientoInsert, setF_NacimientoInsert] = useState("");
  const [lugar_nacimientoInsert, setLugar_NacimientoInsert] = useState("");
  const [nacionalidadInsert, setNacionalidadInsert] = useState("");
  const [telInsert, setTelInsert] = useState("");
  const [correoInsert, setCorreoInsert] = useState("");
  const [direccionInsert, setDireccionInsert] = useState("");
  const [sectorInsert, setSectorInsert] = useState("");
  const [provinciaInsert, setProvinciaInsert] = useState("");
  const [iglesiaInsert, setIglesiaInsert] = useState("");
  const [pastorInsert, setPastorInsert] = useState("");
  const [cargo_iglesiaInsert, setCargo_IglesiaInsert] = useState("");
  const [tipoInsert, setTipoInsert] = useState("");
  const [e_aceptadoInsert, setE_AceptadoInsert] = useState("");
  const [claveInsert, setClaveInsert] = useState("");

  const insertUsuario = () => {
    Axios.post("/insertUsuarios", {
      nombres: nombresInsert,
      apellidos: apellidosInsert,
      cedula: cedulaInsert,
      sexo: sexoInsert,
      f_nacimiento: f_nacimientoInsert,
      lugar_nacimiento: lugar_nacimientoInsert,
      nacionalidad: nacionalidadInsert,
      tel: telInsert,
      correo: correoInsert,
      direccion: direccionInsert,
      sector: sectorInsert,
      provincia: provinciaInsert,
      iglesia: iglesiaInsert,
      pastor: pastorInsert,
      cargo_iglesia: cargo_iglesiaInsert,
      tipo: tipoInsert,
      e_aceptado: e_aceptadoInsert,
      clave: claveInsert,
    }).then(() => {
      toggleInsertstate();
      console.log("success!");
    });
  };

  /* USE STATE UPDATE */

  const [modalUpdatestate, setModalUpdatestate] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const toggleUpdatestate = () => {
    setModalUpdatestate(!modalUpdatestate);
  };

  const execUpdate = (id) => {
    Axios.post("/getusuariosUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const [nombresUpdate, setNombresUpdate] = useState("");
  const [apellidosUpdate, setApellidosUpdate] = useState("");
  const [cedulaUpdate, setCedulaUpdate] = useState("");
  const [sexoUpdate, setSexoUpdate] = useState("");
  const [f_nacimientoUpdate, setF_NacimientoUpdate] = useState("");
  const [lugar_nacimientoUpdate, setLugar_NacimientoUpdate] = useState("");
  const [nacionalidadUpdate, setNacionalidadUpdate] = useState("");
  const [telUpdate, setTelUpdate] = useState("");
  const [correoUpdate, setCorreoUpdate] = useState("");
  const [direccionUpdate, setDireccionUpdate] = useState("");
  const [sectorUpdate, setSectorUpdate] = useState("");
  const [provinciaUpdate, setProvinciaUpdate] = useState("");
  const [iglesiaUpdate, setIglesiaUpdate] = useState("");
  const [pastorUpdate, setPastorUpdate] = useState("");
  const [cargo_iglesiaUpdate, setCargo_IglesiaUpdate] = useState("");
  const [tipoUpdate, setTipoUpdate] = useState("");
  const [e_aceptadoUpdate, setE_AceptadoUpdate] = useState("");
  const [claveUpdate, setClaveUpdate] = useState("");

  const updateUsuario = (id) => {
    Axios.put("/updateUsuarios", {
      id: id,
      nombres: nombresUpdate,
      apellidos: apellidosUpdate,
      cedula: cedulaUpdate,
      sexo: sexoUpdate,
      f_nacimiento: f_nacimientoUpdate,
      lugar_nacimiento: lugar_nacimientoUpdate,
      nacionalidad: nacionalidadUpdate,
      tel: telUpdate,
      correo: correoUpdate,
      direccion: direccionUpdate,
      sector: sectorUpdate,
      provincia: provinciaUpdate,
      iglesia: iglesiaUpdate,
      pastor: pastorUpdate,
      cargo_iglesia: cargo_iglesiaUpdate,
      tipo: tipoUpdate,
      e_aceptado: e_aceptadoUpdate,
      clave: claveUpdate,
    }).then(() => {
      toggleUpdatestate();
      console.log("success!");
    });
  };

  const getsearch = () => {
    Axios.get("/getUsuarios").then((response) => {
      setUsuariosTemp(response.data);
      setUsuariosArray(response.data);
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const filtro = (busqueda) => {
    var resultadosbusqueda = usuariosarray.filter((elemento) => {
      if (
        elemento.Cod_Usuario.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nombres.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Apellidos.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Cedula.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Sexo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.F_Nacimiento.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Lugar_Nacimiento.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nacionalidad.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Tel.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Correo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Direccion.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Sector.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Provincia.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Iglesia.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Pastor.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Cargo_Iglesia.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Tipo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.E_Aceptado.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuariosTemp(resultadosbusqueda);
  };
  useEffect(() => {
    getsearch();
  }, []);

  return (
    <div className="container-AdminPages">
      <div className="title-AdminPages">Usuarios</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              color="success"
              className="button-AdminPages"
              onClick={toggleInsertstate}
            >
              Agregar Usuario
            </Button>
            <Button color="primary">Imprimir</Button>
          </div>
          <div className="botones-AdminPages">
            <Input
              placeholder="Busqueda..."
              className="search-AdminPages"
              value={search}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="table-AdminPages">
          <Table hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Codigo</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Cedula</th>
                <th>Sexo</th>
                <th>F_Nacimiento</th>
                <th>Lugar_Nacimiento</th>
                <th>Nacionalidad</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Sector</th>
                <th>Provincia</th>
                <th>Iglesia</th>
                <th>Pastor</th>
                <th>Cargo_Iglesia</th>
                <th>Tipo</th>
                <th>Aceptado</th>
                <th>Clave</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosTemp.map((val, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{val.ID}</th>
                    <td>{val.Cod_Usuario}</td>
                    <td>{val.Nombres}</td>
                    <td>{val.Apellidos}</td>
                    <td>{val.Cedula}</td>
                    <td>{val.Sexo}</td>
                    <td>{val.F_Nacimiento}</td>
                    <td>{val.Lugar_Nacimiento}</td>
                    <td>{val.Nacionalidad}</td>
                    <td>{val.Tel}</td>
                    <td>{val.Correo}</td>
                    <td>{val.Direccion}</td>
                    <td>{val.Sector}</td>
                    <td>{val.Provincia}</td>
                    <td>{val.Iglesia}</td>
                    <td>{val.Pastor}</td>
                    <td>{val.Cargo_Iglesia}</td>
                    <td>{val.Tipo}</td>
                    <td>{val.E_Aceptado}</td>
                    <td>{val.Clave}</td>
                    <td>
                      <div className="acciones-AdminPages">
                        <Button
                          color="primary"
                          onClick={() => {
                            execUpdate(val.ID);
                            setNombresUpdate(val.Nombres);
                            setApellidosUpdate(val.Apellidos);
                            setCedulaUpdate(val.Cedula);
                            setSexoUpdate(val.Sexo);
                            setF_NacimientoUpdate(
                              val.F_Nacimiento.substring(0, 10)
                            );
                            setLugar_NacimientoUpdate(val.Lugar_Nacimiento);
                            setNacionalidadUpdate(val.Nacionalidad);
                            setTelUpdate(val.Tel);
                            setCorreoUpdate(val.Correo);
                            setDireccionUpdate(val.Direccion);
                            setSectorUpdate(val.Sector);
                            setProvinciaUpdate(val.Provincia);
                            setIglesiaUpdate(val.Iglesia);
                            setPastorUpdate(val.Pastor);
                            setCargo_IglesiaUpdate(val.Cargo_Iglesia);
                            setTipoUpdate(val.Tipo);
                            setE_AceptadoUpdate(val.E_Aceptado);
                            setClaveUpdate(val.Clave);
                            toggleUpdatestate();
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

          <Modal isOpen={modalInsertstate} toggle={toggleInsertstate}>
            <ModalHeader toggle={toggleInsertstate}>
              Agregar Usuario
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nombres" hidden></Label>
                    <Input
                      id="Nombres"
                      placeholder="Nombres"
                      autoComplete="off"
                      onChange={(event) => {
                        setNombresInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Apellidos" hidden></Label>
                    <Input
                      id="Apellidos"
                      autoComplete="off"
                      placeholder="Apellidos"
                      onChange={(event) => {
                        setApellidosInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="Cedula" hidden></Label>
                    <Input
                      id="Cedula"
                      autoComplete="off"
                      placeholder="Cedula"
                      onChange={(event) => {
                        setCedulaInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="Tel" hidden></Label>
                    <Input
                      id="Tel"
                      autoComplete="off"
                      placeholder="Teléfono"
                      onChange={(event) => {
                        setTelInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="Sexo" hidden></Label>
                    <Input
                      type="select"
                      id="Sexo"
                      autoComplete="off"
                      onChange={(event) => {
                        setSexoInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Sexo
                      </option>
                      <option value={"Masculino"}>Masculino</option>
                      <option value={"Femenino"}>Femenino</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="Lugar_Nacimiento" hidden></Label>
                <Input
                  id="Lugar_Nacimiento"
                  placeholder="Lugar de Nacimiento y Fecha (Debajo)"
                  autoComplete="off"
                  onChange={(event) => {
                    setLugar_NacimientoInsert(event.target.value);
                  }}
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="F_Nacimiento" hidden></Label>
                    <Input
                      id="F_Nacimiento"
                      type="date"
                      autoComplete="off"
                      onChange={(event) => {
                        setF_NacimientoInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Nacionalidad" hidden></Label>
                    <Input
                      id="Nacionalidad"
                      placeholder="Nacionalidad"
                      autoComplete="off"
                      onChange={(event) => {
                        setNacionalidadInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="Correo" hidden></Label>
                <Input
                  id="Correo"
                  type="email"
                  autoComplete="off"
                  placeholder="Correo"
                  onChange={(event) => {
                    setCorreoInsert(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Direccion" hidden></Label>
                <Input
                  id="Direccion"
                  placeholder="Dirección"
                  autoComplete="off"
                  onChange={(event) => {
                    setDireccionInsert(event.target.value);
                  }}
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Sector" hidden></Label>
                    <Input
                      id="Sector"
                      placeholder="Sector"
                      autoComplete="off"
                      onChange={(event) => {
                        setSectorInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Provincia" hidden></Label>
                    <Input
                      id="Provincia"
                      autoComplete="off"
                      placeholder="Provincia"
                      onChange={(event) => {
                        setProvinciaInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Iglesia" hidden></Label>
                    <Input
                      id="Iglesia"
                      autoComplete="off"
                      placeholder="Iglesia"
                      onChange={(event) => {
                        setIglesiaInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Cargo" hidden></Label>
                    <Input
                      id="Cargo"
                      placeholder="Cargo"
                      autoComplete="off"
                      onChange={(event) => {
                        setCargo_IglesiaInsert(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="Pastor" hidden></Label>
                    <Input
                      id="Pastor"
                      type="select"
                      placeholder="Pastor"
                      autoComplete="off"
                      onChange={(event) => {
                        setPastorInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Es Pastor?
                      </option>
                      <option value={"1"}>Lo Es</option>
                      <option value={"0"}>No lo es</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="Tipo" hidden></Label>
                    <Input
                      type="select"
                      id="Tipo"
                      autoComplete="off"
                      onChange={(event) => {
                        setTipoInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Tipo
                      </option>
                      <option value={"0"}>Estudiante</option>
                      <option value={"1"}>Maestro</option>
                      <option value={"2"}>Administrativo</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="E_Aceptado" hidden></Label>
                    <Input
                      type="select"
                      id="E_Aceptado"
                      autoComplete="off"
                      onChange={(event) => {
                        setE_AceptadoInsert(event.target.value);
                      }}
                    >
                      <option disabled selected="selected">
                        Estado
                      </option>
                      <option value={1}>Admitido</option>
                      <option value={0}>En Espera</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="Clave" hidden></Label>
                <Input
                  type="password"
                  id="Clave"
                  placeholder="Clave"
                  onChange={(event) => {
                    setClaveInsert(event.target.value);
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  insertUsuario();
                  refreshPage();
                }}
              >
                Aceptar
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalUpdatestate} toggle={toggleUpdatestate}>
            {updateData.map((val, key) => {
              return (
                <>
                  <ModalHeader toggle={toggleUpdatestate}>
                    Agregar Usuario
                  </ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Nombres" hidden></Label>

                          <Input
                            id="Nombres"
                            placeholder="Nombres"
                            defaultValue={val.Nombres}
                            onChange={(event) => {
                              setNombresUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Apellidos" hidden></Label>
                          <Input
                            id="Apellidos"
                            defaultValue={val.Apellidos}
                            placeholder="Apellidos"
                            onChange={(event) => {
                              setApellidosUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Cedula" hidden></Label>
                          <Input
                            id="Cedula"
                            defaultValue={val.Cedula}
                            placeholder="Cedula"
                            onChange={(event) => {
                              setCedulaUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Tel" hidden></Label>
                          <Input
                            id="Tel"
                            defaultValue={val.Tel}
                            placeholder="Teléfono"
                            onChange={(event) => {
                              setTelUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Sexo" hidden></Label>
                          <Input
                            type="select"
                            id="Sexo"
                            defaultValue={val.Sexo}
                            onChange={(event) => {
                              setSexoUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Sexo
                            </option>
                            <option value={"Masculino"}>Masculino</option>
                            <option value={"Femenino"}>Femenino</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="Lugar_Nacimiento" hidden></Label>
                      <Input
                        id="Lugar_Nacimiento"
                        defaultValue={val.Lugar_Nacimiento}
                        placeholder="Lugar de Nacimiento y Fecha (Debajo)"
                        onChange={(event) => {
                          setLugar_NacimientoUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="F_Nacimiento" hidden></Label>
                          <Input
                            id="F_Nacimiento"
                            type="date"
                            defaultValue={val.F_Nacimiento.substring(0, 10)}
                            onChange={(event) => {
                              setF_NacimientoUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Nacionalidad" hidden></Label>
                          <Input
                            id="Nacionalidad"
                            defaultValue={val.Nacionalidad}
                            placeholder="Nacionalidad"
                            onChange={(event) => {
                              setNacionalidadUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="Correo" hidden></Label>
                      <Input
                        id="Correo"
                        type="email"
                        defaultValue={val.Correo}
                        placeholder="Correo Electronico"
                        onChange={(event) => {
                          setCorreoUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Direccion" hidden></Label>
                      <Input
                        id="Direccion"
                        placeholder="Dirección"
                        defaultValue={val.Direccion}
                        onInput={(event) => {
                          setDireccionUpdate(event.target.value);
                        }}
                        onChange={(event) => {
                          setDireccionUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Sector" hidden></Label>
                          <Input
                            id="Sector"
                            defaultValue={val.Sector}
                            placeholder="Sector"
                            onChange={(event) => {
                              setSectorUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Provincia" hidden></Label>
                          <Input
                            id="Provincia"
                            defaultValue={val.Provincia}
                            placeholder="Provincia"
                            onChange={(event) => {
                              setProvinciaUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Iglesia" hidden></Label>
                          <Input
                            id="Iglesia"
                            placeholder="Iglesia"
                            defaultValue={val.Iglesia}
                            onChange={(event) => {
                              setIglesiaUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Cargo" hidden></Label>
                          <Input
                            id="Cargo"
                            placeholder="Cargo"
                            defaultValue={val.Cargo_Iglesia}
                            onChange={(event) => {
                              setCargo_IglesiaUpdate(event.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Pastor" hidden></Label>
                          <Input
                            id="Pastor"
                            type="select"
                            placeholder="Pastor"
                            autoComplete="off"
                            defaultValue={val.Pastor}
                            onChange={(event) => {
                              setPastorUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Es Pastor?
                            </option>
                            <option value={"1"}>Lo Es</option>
                            <option value={"0"}>No lo es</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Tipo" hidden></Label>
                          <Input
                            type="select"
                            id="Tipo"
                            defaultValue={val.Tipo}
                            onChange={(event) => {
                              setTipoUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Tipo
                            </option>
                            <option value={"0"}>Estudiante</option>
                            <option value={"1"}>Maestro</option>
                            <option value={"2"}>Administrativo</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="E_Aceptado" hidden></Label>
                          <Input
                            type="select"
                            defaultValue={val.E_Aceptado}
                            id="E_Aceptado"
                            onChange={(event) => {
                              setE_AceptadoUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected="selected">
                              Estado
                            </option>
                            <option value={1}>Admitido</option>
                            <option value={0}>En Espera</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="Clave" hidden></Label>
                      <Input
                        type="password"
                        id="Clave"
                        defaultValue={val.Clave}
                        placeholder="Clave"
                        disabled
                        onChange={(event) => {
                          setClaveUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => {
                        updateUsuario(val.ID);
                        refreshPage();
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

export default UsuariosAdmin;
