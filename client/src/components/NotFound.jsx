import React from "react";
import "../css/Restricted.css"
import { TbMoodSad } from "react-icons/tb";

const NotFound = () => {
  return (
    <main>
      <div className="container-403">
        <div className="text-403">
          <p className="Acceso-403">PÁGINA</p>
          <p className="Restringido-403">INEXISTENTE</p>
        </div>
        <div className="icon-403"><TbMoodSad className="iconChild-403" style={{color: "var(--BaseYellow"}}/></div>
      </div>
    </main>
  );
}

export default NotFound;
