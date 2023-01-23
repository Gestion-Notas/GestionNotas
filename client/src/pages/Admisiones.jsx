import React, { useState, useEffect } from "react";
import { Col, Row, Input, Label, FormGroup } from "reactstrap";
import Axios from "../libs/axios";
import "../css/Admisiones.css";

const Admisiones = () => {
  const refreshpage = () => {
    window.location.reload(false);
  };

  const [iglesias, setIglesias] = useState([]);

  useEffect(() => {
    Axios.get("/getIglesiasPublic").then((response) => {
      setIglesias(response.data)
    });
  }, []);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [sexo, setSexo] = useState("");
  const [f_nacimiento, setF_Nacimiento] = useState("");
  const [lugar_nacimiento, setLugar_Nacimiento] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [tel, setTel] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [sector, setSector] = useState("");
  const [provincia, setProvincia] = useState("");
  const [iglesiacampo, setIglesiaCampo] = useState("");
  const [cargo_iglesia, setCargo_Iglesia] = useState("");

  const addUsuario = () => {
    Axios.post("/submitAdmisiones", {
      nombres: nombres,
      apellidos: apellidos,
      cedula: cedula,
      sexo: sexo,
      f_nacimiento: f_nacimiento,
      lugar_nacimiento: lugar_nacimiento,
      nacionalidad: nacionalidad,
      tel: tel,
      correo: correo,
      direccion: direccion,
      sector: sector,
      provincia: provincia,
      iglesia: iglesiacampo,
      cargo_iglesia: cargo_iglesia,
    }).then(() => {
      console.log("success!");
    });
  };

  return (
    <main className="main">
      <div className="container-Admisiones">
        <div className="sidecolumn-Admisiones">
          <p className="title_side-Admisiones">Formulario de Admisiones</p>
          <p className="text_side-Admisiones">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            magni culpa quas numquam, facilis veniam earum aperiam doloribus
            velit deserunt magnam, iure aliquam eum, itaque doloremque. Tempore
            tenetur id praesentium, esse facere voluptatem blanditiis suscipit
            fugiat ratione ipsam unde iste inventore accusantium, in odit labore
            veniam! Fuga, voluptate officiis? Molestiae pariatur autem nihil
            quod animi obcaecati amet cumque nulla repellendus eveniet?
            Repellendus, nobis quam, nam facilis quidem, assumenda amet cumque
            deserunt ad nemo neque! Modi optio delectus tempore nostrum,
            repudiandae inventore animi harum iusto officiis voluptatem
            obcaecati nemo voluptates ut dolor, illum ullam porro? Explicabo
            voluptas similique temporibus repudiandae harum.
          </p>
        </div>
        <div className="faqs">
          <div>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="Nombres" hidden></Label>
                  <Input
                    id="Nombres"
                    placeholder="Nombres"
                    autoComplete="off"
                    onChange={(event) => {
                      setNombres(event.target.value);
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
                      setApellidos(event.target.value);
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
                      setCedula(event.target.value);
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
                      setTel(event.target.value);
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
                      setSexo(event.target.value);
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
                  setLugar_Nacimiento(event.target.value);
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
                      setF_Nacimiento(event.target.value);
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
                      setNacionalidad(event.target.value);
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
                  setCorreo(event.target.value);
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
                  setDireccion(event.target.value);
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
                      setSector(event.target.value);
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
                      setProvincia(event.target.value);
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
                    type="select"
                    autoComplete="off"
                    placeholder="Iglesia"
                    onChange={(event) => {
                      setIglesiaCampo(event.target.value);
                    }}
                  >
                    <option disabled selected="selected">Iglesia</option>
                    {
                      iglesias.map((val, key) => {
                        return(<option value={val.Nombre}>{val.Nombre}</option>)
                      })
                    }
                  </Input>
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
                      setCargo_Iglesia(event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <button
              type="submit"
              onClick={() => {
                addUsuario();
                refreshpage();
              }}
            >
              Ingresar y Enviar tus Datos
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admisiones;
