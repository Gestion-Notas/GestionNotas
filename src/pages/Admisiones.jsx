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
            <input type="text" placeholder="Nombres" id="Nombres" required />
            <input
              type="text"
              placeholder="Apellidos"
              id="Apellidos"
              required
            />
          </div>
          <div className="grid3-1"></div>
          <div className="grid3-1">
            <input type="text" placeholder="Cédula" id="Cedula" required />
            <select name="Sexo" id="Sexo" placeholder="Sexo" required>
              <option value="">Sexo</option>
              <option value="">Masculino</option>
              <option value="">Femenino</option>
            </select>
          </div>
          <div className="grid3-2">
            <input
              type="text"
              placeholder="Lugar y Fecha de Nacimiento"
              id="L_Nacimiento"
            />
            <div className="grid1-3">
              <label htmlFor="">Fecha:</label>
              <input
                type="date"
                placeholder="Fecha de Nacimiento"
                id="F_Nacimiento"
              />
            </div>
          </div>
          <div className="grid3-1">
            <input
              type="text"
              placeholder="Nacionalidad"
              id="Nacionalidad"
              required
            />
            <input type="tel" placeholder="Teléfono" id="Tel" required />
          </div>
          <input
            type="email"
            placeholder="Correo Electrónico"
            id="Correo"
            required
          />
          <input
            type="text"
            placeholder="Dirección (Calle, Nro, Edificio, Apto.)"
            id="Direccion"
            required
          />
          <div className="grid1-1">
            <input type="text" placeholder="Sector" id="Sector" required />
            <input
              type="text"
              placeholder="Provincia"
              id="Provincia"
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
            id="Iglesia"
            required
          />
          <div className="grid1-1">
            <input
              type="text"
              placeholder="Pastor de su iglesia"
              id="Pastor"
              required
            />
            <input
              type="text"
              placeholder="Tiempo congregándose"
              id="Tiempo_Iglesia"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Cargo que desempeña"
            id="Cargo_Iglesia"
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
          <form action="">
            {faqs.map((faq, i) => (
              <DropdownAccordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
            ))}
            <button type="submit">Ingresar y Enviar tus Datos</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Admisiones;
