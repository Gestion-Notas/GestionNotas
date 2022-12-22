import React, { useState } from "react";
import DropdownAccordion from "../components/DropdownAccordion";
import Axios from "axios";
import "../css/Admisiones.css";

const Admisiones = () => {
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
  const [iglesia, setIglesia] = useState("");
  const [pastor, setPastor] = useState("");
  const [tiempo_iglesia, setTiempo_Iglesia] = useState("");
  const [cargo_iglesia, setCargo_Iglesia] = useState("");

  console.log(sexo);
  const addUsuario = () => {
    console.log(nombres);
    Axios.post("http://localhost:4001/sumbitAdmisiones", {
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
      iglesia: iglesia,
      pastor: pastor,
      tiempo_iglesia: tiempo_iglesia,
      cargo_iglesia: cargo_iglesia,
    }).then(() => {
      console.log("success!");
    });
  };

  const [faqs, setfaqs] = useState([
    {
      question: "Datos Personales",
      answer: (
        <div className="form-Admisiones">
          <div className="grid1-1">
            <input
              type="text"
              placeholder="Nombres"
              onChange={(event) => {
                setNombres(event.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Apellidos"
              onChange={(event) => {
                setApellidos(event.target.value);
              }}
              required
            />
          </div>
          <div className="grid3-1"></div>
          <div className="grid3-1">
            <input
              type="text"
              placeholder="Cédula"
              data-inputmask="'mask': '999-9999999-9'"
              required
              onChange={(event) => {
                setCedula(event.target.value);
              }}
            />
            <select
              name="Sexo"
              onChange={(event) => {
                setSexo(event.target.value);
              }}
              placeholder="Sexo"
              required
            >
              <option>Sexo</option>
              <option value={"Masculino"}>Masculino</option>
              <option value={"Femenino"}>Femenino</option>
            </select>
          </div>
          <div className="grid3-2">
            <input
              type="text"
              placeholder="Lugar y Fecha de Nacimiento"
              onChange={(event) => {
                setLugar_Nacimiento(event.target.value);
              }}
            />
            <div className="grid1-3">
              <label htmlFor="">Fecha:</label>
              <input
                type="date"
                required
                placeholder="Fecha de Nacimiento"
                onChange={(event) => {
                  setF_Nacimiento(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="grid3-1">
            <input
              type="text"
              placeholder="Nacionalidad"
              onChange={(event) => {
                setNacionalidad(event.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              id="Tel"
              onChange={(event) => {
                setTel(event.target.value);
              }}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Correo Electrónico"
            onChange={(event) => {
              setCorreo(event.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Dirección (Calle, Nro, Edificio, Apto.)"
            onChange={(event) => {
              setDireccion(event.target.value);
            }}
            required
          />
          <div className="grid1-1">
            <input
              type="text"
              placeholder="Sector"
              onChange={(event) => {
                setSector(event.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Provincia"
              onChange={(event) => {
                setProvincia(event.target.value);
              }}
              required
            />
          </div>
        </div>
      ),
      open: true,
    },

    {
      question: "Datos esclesiásticos",
      answer: (
        <div className="form-Admisiones">
          <input
            type="text"
            placeholder="Iglesia en la que se congrega actualmente"
            onChange={(event) => {
              setIglesia(event.target.value);
            }}
            required
          />
          <div className="grid1-1">
            <input
              type="text"
              placeholder="Pastor de su iglesia"
              onChange={(event) => {
                setPastor(event.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Tiempo congregándose"
              onChange={(event) => {
                setTiempo_Iglesia(event.target.value);
              }}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Cargo que desempeña"
            onChange={(event) => {
              setCargo_Iglesia(event.target.value);
            }}
            required
          />
        </div>
      ),
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <main>
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
            {faqs.map((faq, i) => (
              <DropdownAccordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
            ))}
            <button onClick={addUsuario}>Ingresar y Enviar tus Datos</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admisiones;
