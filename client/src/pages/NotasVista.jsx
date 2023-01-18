import React from "react";
import "../css/NotasVista.css";
import CardEstudiante from "../components/CardEstudiante";

const NotasVista = () => {
  return (
    <main className="main">
        <div className="container-Notas">
            <CardEstudiante name="ISFT"/>
        </div>
    </main>
  );
};

export default NotasVista;