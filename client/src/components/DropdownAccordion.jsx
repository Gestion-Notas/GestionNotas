import React from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

function DropdownAccordion({ faq, index, toggleFAQ }) {
  return (
    <div className={"faq " + (faq.open ? "open" : "")} key={index}>
      <div className={"header-faq " + (faq.open ? "open" : "")}>
        <div className="faq-question">{faq.question}</div>
        <div className="arrow" onClick={() => toggleFAQ(index)}><IoIosArrowForward/></div>
      </div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
}

export default DropdownAccordion;
