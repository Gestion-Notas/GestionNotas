import React,{useState} from "react";
import {
  Accordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Pensum.css";

const Pensum = () => {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <main className="main">
      <div className="container-Pensum">
        <div className="cardColumn-Pensum">
          <div className="header-Pensum">
            <h2>Nivel 100</h2>
          </div>
          <div className="text-Pensum">
            <Accordion flush open={open} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId="1">Accordion Item 1</AccordionHeader>
                <AccordionBody accordionId="1">
                  <strong>This is the first item&#39;s accordion body.</strong>
                  You can modify any of this with custom CSS or overriding our
                  default variables. It&#39;s also worth noting that just about
                  any HTML can go within the <code>.accordion-body</code>,
                  though the transition does limit overflow.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
                <AccordionBody accordionId="2">
                  <strong>This is the second item&#39;s accordion body.</strong>
                  You can modify any of this with custom CSS or overriding our
                  default variables. It&#39;s also worth noting that just about
                  any HTML can go within the <code>.accordion-body</code>,
                  though the transition does limit overflow.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
                <AccordionBody accordionId="3">
                  <strong>This is the third item&#39;s accordion body.</strong>
                  You can modify any of this with custom CSS or overriding our
                  default variables. It&#39;s also worth noting that just about
                  any HTML can go within the <code>.accordion-body</code>,
                  though the transition does limit overflow.
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="cardColumn-Pensum">
          <div className="header-Pensum">
            <h2>Nivel 200</h2>
          </div>
          <div className="text-Pensum">
            <details className="details-Pensum">
              <summary className="titleDetails-Pensum">
                Crecimiento Espiritual
              </summary>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                libero.
              </p>
            </details>
            <details className="details-Pensum">
              <summary className="titleDetails-Pensum">
                Teologia Cristiana
              </summary>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                libero.
              </p>
            </details>
            <details className="details-Pensum">
              <summary className="titleDetails-Pensum">
                Ministerio de la Oracion
              </summary>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                libero.
              </p>
            </details>
          </div>
        </div>
        <div className="cardColumn-Pensum">
          <div className="header-Pensum">
            <h2>Nivel 300</h2>
          </div>
          <div className="text-Pensum">
            <details className="details-Pensum">
              <summary className="titleDetails-Pensum">
                Crecimiento Espiritual
              </summary>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                libero.
              </p>
            </details>
            <details className="details-Pensum">
              <summary className="titleDetails-Pensum">
                Teologia Cristiana
              </summary>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                libero.
              </p>
            </details>
            <details className="details-Pensum">
              <summary className="titleDetails-Pensum">
                Ministerio de la Oracion
              </summary>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                libero.
              </p>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pensum;
