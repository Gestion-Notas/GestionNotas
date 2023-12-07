import React from "react";
import "../css/Restricted.css"
import { TiCancel } from "react-icons/ti";

function Restricted() {
  return (
    <main>
      <div className="container-403">
        <div className="text-403">
          <p className="Acceso-403">ACCESO</p>
          <p className="Restringido-403">RESTRINGIDO</p>
        </div>
        <div className="icon-403"><TiCancel className="iconChild-403"/></div>
      </div>
    </main>
  );
}

export default Restricted;
