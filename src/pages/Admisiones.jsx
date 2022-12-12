import React, { useState } from "react";
import DropdownAccordion from "../components/DropdownAccordion";
import "../css/Admisiones.css";

const Admisiones = () => {
  const [faqs, setfaqs] = useState([
    {
      question: "Datos Personales",
      answer: (
        <div className="form-Admisiones">
          <input type="text" placeholder="Nombres" />
          <input type="text" placeholder="Apellidos" />
        </div>
      ),
      open: true,
    },
    {
      question: "Datos familiares",
      answer: (
        <div className="form-Admisiones">
          <input type="text" />
          <input type="text" />
        </div>
      ),
      open: false,
    },
    {
      question: "Datos Ocupacionales",
      answer: "This many.",
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
        <div className="faqs">
          <form action="">
            {faqs.map((faq, i) => (
              <DropdownAccordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
            ))}
          </form>
        </div>
        <div className="sidecolumn-Admisiones"></div>
      </div>
    </main>
  );
};

export default Admisiones;
