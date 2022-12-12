import React, { useState } from "react";
import DropdownAccordion from "../components/DropdownAccordion";
import "../css/Admisiones.css";

const Admisiones = () => {
  const [faqs, setfaqs] = useState([
    {
      question: "Datos Personales",
      answer: <><input type="text" placeholder="HolaPili"/></>,
      open: true,
    },
    {
      question: "Who is the most awesome person?",
      answer: "You. The Viewer.",
      open: false,
    },
    {
      question:
        "How many questions does it take to make a successful FAQ Page?",
      answer: "This many.",
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
      <div className="faqs">
        <form action="">
          {faqs.map((faq, i) => (
            <DropdownAccordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
          ))}
        </form>
      </div>
    </main>
  );
};

export default Admisiones;
