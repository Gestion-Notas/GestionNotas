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
  Form,
  Row,
  Col,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "../libs/axios";
import { MdEdit } from "react-icons/md";

const NoticiasAdmin = () => {
  const today = new Date().toISOString().substring(0, 10);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/print/materias";
    navigate(path);
  };

  const [materiasarray, setNoticiasarray] = useState([]);
  const [materiasTemp, setNoticiasTemp] = useState([]);
  const [search, setSearch] = useState("");

  const [modalInsertState, setModalInsertState] = useState(false);
  const [modalUpdateState, setModalUpdateState] = useState(false);
  const [file, setFile] = useState(null);
  const [toggleUpdateImage, setToggleUpdateImage] = useState(false);
  const toggleInsertState = () => setModalInsertState(!modalInsertState);
  const toggleUpdateState = () => setModalUpdateState(!modalUpdateState);

  /* STATE INSERT */

  const [tituloInsert, setTituloInsert] = useState("");
  const [subtituloInsert, setSubtituloInsert] = useState("");
  const [contenidoInsert, setContenidoInsert] = useState("");
  const [imagenInsert, setImagenInsert] = useState("");
  const [destacadaInsert, setDestacadaInsert] = useState("");

  /* STATE UPDATE */

  const [updateData, setUpdateData] = useState([]);
  const [tituloUpdate, setTituloUpdate] = useState("");
  const [subtituloUpdate, setSubtituloUpdate] = useState("");
  const [contenidoUpdate, setContenidoUpdate] = useState("");
  const [imagenUpdate, setImagenUpdate] = useState("");
  const [destacadaUpdate, setDestacadaUpdate] = useState("");

  /* BACKEND INSERTAR */

  /* BACKEND BUSQUEDA Y SELECT */

  useEffect(() => {
    const getSearch = async () => {
      const response = await Axios.get("/getNoticias");
      setNoticiasTemp(response.data);
      setNoticiasarray(response.data);
    };
    getSearch();
  }, []);

  const filtro = (busqueda) => {
    var resultadobusqueda = materiasarray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Titulo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Subtitulo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Contenido.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Imagen.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Destacada.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setNoticiasTemp(resultadobusqueda);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtro(e.target.value);
  };

  /* BACKEND UPDATE */

  const execUpdate = (id) => {
    Axios.post("/getnoticiasUpdate", {
      id: id,
    }).then((response) => {
      setUpdateData(response.data);
    });
  };

  const updateNoticias = (id) => {
    Axios.put("/updateNoticias", {
      id: id,
      titulo: tituloUpdate,
      subtitulo: subtituloUpdate,
      contenido: contenidoUpdate,
      imagen: imagenUpdate,
      destacada: destacadaUpdate,
    }).then(() => {
      toggleUpdateState();
      console.log("success!");
    });
  };

  /* FUNCIONES VARIAS */

  function refreshpage() {
    window.location.reload(false);
  }

  const onInputChangeInsert = (e) => {
    const filename =
      today +
      "-" +
      e.target.value
        .split(/(\\|\/)/g)
        .pop()
        .replace(/\s/g, "");
    setFile(e.target.files[0]);
    setImagenInsert(filename);
    setImagenUpdate(filename)
  };

  const handleSubmitInsert = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("ImagenIDISFT", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    Axios.post("/noticias/uploadImage", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("error", err);
      });
    console.log(tituloInsert);
    Axios.post("/insertNoticias", {
      titulo: tituloInsert,
      subtitulo: subtituloInsert,
      contenido: contenidoInsert,
      imagen: imagenInsert,
      destacada: destacadaInsert,
    }).then(() => {
      toggleInsertState;
      console.log("success!");
    });
    refreshpage();
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("ImagenIDISFT", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    Axios.post("/noticias/uploadImage", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("error", err);
      });
    refreshpage();
  };

  return (
    <div className="container-AdminPages">
      <div className="title-AdminPages">Noticias</div>
      <div className="container_tabla-AdminPages">
        <div className="containerheader-AdminPages">
          <div className="botones-AdminPages">
            <Button
              onClick={toggleInsertState}
              color="success"
              className="button-AdminPages"
            >
              Agregar Noticia
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
                <th>Título</th>
                <th>Subtítulo</th>
                <th>Contenido</th>
                <th>Imagen</th>
                <th>Destacada</th>
              </tr>
            </thead>
            <tbody>
              {materiasTemp.map((val, key) => {
                return (
                  <tr key={key} className="row-height">
                    <th>{val.ID}</th>
                    <td>{val.Titulo}</td>
                    <td>{val.Subtitulo}</td>
                    <td>{val.Contenido}</td>
                    <td>{val.Imagen}</td>
                    <td>{val.Destacada}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Modal isOpen={modalInsertState} toggle={toggleInsertState}>
            <Form
              method="POST"
              action="localhost:4001/noticias/uploadImage"
              enctype="multipart/form-data"
              onSubmit={handleSubmitInsert}
            >
              <ModalHeader toggle={toggleInsertState}>
                Agregar Noticias
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="Titulo" hidden></Label>
                  <Input
                    autoComplete="off"
                    id="Titulo"
                    placeholder="Título"
                    onChange={(event) => {
                      setTituloInsert(event.target.value);
                    }}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="Subtitulo" hidden></Label>
                  <Input
                    autoComplete="off"
                    id="Subtitulo"
                    placeholder="Subtítulo"
                    onChange={(event) => {
                      setSubtituloInsert(event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Contenido" hidden></Label>
                  <Input
                    id="Contenido"
                    type="textarea"
                    placeholder="Contenido"
                    autoComplete="off"
                    onChange={(event) => {
                      setContenidoInsert(event.target.value);
                    }}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="ImagenIDISFT" hidden></Label>
                  <Input
                    id="ImagenIDISFT"
                    autoComplete="off"
                    type="file"
                    name="ImagenIDISFT"
                    accept="image/*"
                    onChange={onInputChangeInsert}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="Destacada" hidden></Label>
                  <Input
                    id="Destacada"
                    type="select"
                    autoComplete="off"
                    onChange={(event) => {
                      setDestacadaInsert(event.target.value);
                    }}
                    required
                  >
                    <option disabled selected="selected">
                      Destacada
                    </option>
                    <option value={1}>Si</option>
                    <option value={0}>No</option>
                  </Input>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="success" type="submit">
                  Aceptar
                </Button>
              </ModalFooter>
            </Form>
          </Modal>

          <Modal isOpen={modalUpdateState} toggle={toggleUpdateState}>
            {updateData.map((val, key) => {
              console.log(tituloUpdate);
              return (
                <Form
                  method="POST"
                  action="localhost:4001/noticias/uploadImage"
                  enctype="multipart/form-data"
                  onSubmit={
                    updateNoticias(val.ID) & handleSubmitUpdate
                  }
                >
                  <ModalHeader toggle={toggleUpdateState}>
                    Actualizar Noticias
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Titulo" hidden></Label>
                      <Input
                        autoComplete="off"
                        id="Titulo"
                        placeholder="Título"
                        defaultValue={val.Titulo}
                        onChange={(event) => {
                          setTituloUpdate(event.target.value);
                        }}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Subtitulo" hidden></Label>
                      <Input
                        autoComplete="off"
                        id="Subtitulo"
                        placeholder="Subtítulo"
                        defaultValue={val.Subtitulo}
                        onChange={(event) => {
                          setSubtituloUpdate(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Contenido" hidden></Label>
                      <Input
                        id="Contenido"
                        type="textarea"
                        placeholder="Contenido"
                        defaultValue={val.Contenido}
                        autoComplete="off"
                        onChange={(event) => {
                          setContenidoUpdate(event.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="ImagenIDISFT" hidden></Label>
                      <Input
                        id="ImagenIDISFT"
                        autoComplete="off"
                        type="file"
                        name="ImagenIDISFT"
                        accept="image/*"
                        onChange={onInputChangeInsert}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Destacada" hidden></Label>
                      <Input
                        id="Destacada"
                        type="select"
                        autoComplete="off"
                        defaultValue={val.Destacada}
                        onChange={(event) => {
                          setDestacadaUpdate(event.target.value);
                        }}
                        required
                      >
                        <option disabled selected="selected">
                          Destacada
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </Input>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" type="submit">
                      Aceptar
                    </Button>
                  </ModalFooter>
                </Form>
              );
            })}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default NoticiasAdmin;
