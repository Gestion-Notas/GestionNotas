import React, { useState } from "react";
import DropdownAccordion from "../components/DropdownAccordion";
import "../css/Admisiones.css";

const Admisiones = () => {
  const [faqs, setfaqs] = useState([
    {
      question: "Datos Personales",
      answer: (
        <div className="form-Admisiones">
          <div className="grid1-1">
            <input type="text" placeholder="Nombres" id="Nombres" />
            <input type="text" placeholder="Apellidos" id="Apellidos" />
          </div>
          <div className="grid3-1"></div>
          <div className="grid3-1">
            <input type="text" placeholder="Cédula" id="Cedula" />
            <select name="Sexo" id="Sexo" placeholder="Sexo">
              <option value="">Sexo</option>
              <option value="">Masculino</option>
              <option value="">Femenino</option>
            </select>
          </div>
          <div className="grid3-2">
            <input
              type="text"
              placeholder="Lugar de Nacimiento"
              id="L_Nacimiento"
            />
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              id="F_Nacimiento"
            />
          </div>
          <div className="grid3-1">
            <input type="text" placeholder="Nacionalidad" id="Nacionalidad" />
            <input type="tel" placeholder="Teléfono" id="Tel" />
          </div>
          <input type="email" placeholder="Correo Electrónico" id="Correo" />
          <input
            type="text"
            placeholder="Dirección (Calle, Nro, Edificio, Apto.)"
            id="Direccion"
          />
          <div className="grid1-1">
            <input type="text" placeholder="Sector" id="Sector" />
            <input type="text" placeholder="Provincia" id="Provincia" />
          </div>
        </div>
      ),
      open: true,
    },
    {
      question: "Datos familiares",
      answer: (
        <div className="form-Admisiones">
          <div className="grid1-1">
            <select name="E_Civil" id="E_Civil">
              <option value="">Seleccione su Estado Civil</option>
              <option value="">Casado</option>
              <option value="">Soltero</option>
              <option value="">Viudo</option>
            </select>
            <input type="text" placeholder="Cantidad De Hijos" id="C_Hijos" />
          </div>
          <textarea
            name="Enfermedad"
            id="Enfermedad"
            rows="8"
            placeholder="Padece de Alguna Enfermedad? Indique Cual/es"
          ></textarea>
          <textarea
            name="Alergias"
            id="Alergias"
            rows="8"
            placeholder="Padece de Alergias? Indique Cual/es"
          ></textarea>
        </div>
      ),
      open: false,
    },
    {
      question: "Datos Ocupacionales",
      answer: (
        <div className="form-Admisiones">
          <input
            type="text"
            placeholder="Ocupación que Ejerce"
            id="Ocupacion"
          />
          <input
            type="text"
            placeholder="Grado Académico Alcanzado"
            id="G_Academico"
          />
          <div className="grid1-1">
            <label htmlFor="">Trabaja Actualmente?</label>
            <div className="grid1-1">
              <input type="checkbox" value={true} id="Estado_Trabajo" />
            </div>
          </div>
          Ocupacion CHAR(60), G_Academico CHAR(20), Estado_Trabajo BOOL,
          Lugar_Trabajo CHAR(60), Dir_Trabajo CHAR(90), Tel_Trabajo CHAR(12),
          Cargo_Trabajo CHAR(60),/*duda*/ H_Laboral CHAR(30), Estado_Estudios
          BOOL, Lugar_Estudio CHAR(60), Estudios CHAR(30),
        </div>
      ),
      open: false,
    },
    {
      question: "Datos esclesiásticos",
      answer: "Holamundo",
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
          <form action="">
            {faqs.map((faq, i) => (
              <DropdownAccordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
            ))}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Admisiones;
