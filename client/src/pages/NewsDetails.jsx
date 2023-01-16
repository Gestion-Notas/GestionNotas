import React, { useState } from "react";
import bgimage from "../img/imagen_news-Home.jpg";
import ImportantNews from "../components/ImportantNews";
import Axios from "../libs/axios"
import { useParams } from "react-router-dom";
import "../css/NewsDetails.css";

const NewsDetails = () => {
  const [noticiasdetalles, setNoticiasdetalles] = useState([]);
  const { id } = useParams();
  const routeconcat = "/getNoticiasDetails/" + id;

  Axios.get(routeconcat).then((response) => {
    setNoticiasdetalles(response.data);
  });

  return (
    <main className="main">  
      <div className="container-NewsDetails">
        {noticiasdetalles.map((val, key) => {
          const imageconcat = import.meta.env.VITE_HOSTAPI + "/static/images/" + val.Imagen;
          return (
            <div className="containerPrincipal-NewsDetails">
              <p className="title-NewsDetails">{val.Titulo}</p>
              <p className="subtitle-NewsDetails">»{val.Subtitulo}</p>
              <img
                src={imageconcat}
                alt="Imagen Cabecera"
                className="imagen-NewsDetails"
              />

              <p className="text_content-NewsDetails">
                {val.Contenido}
              </p>
            </div>
          );
        })}

        <div className="importantSection-NewsDetails">
          <p className="titleimportant-NewsDetails">Noticias Destacadas</p>
          <ImportantNews />
          <ImportantNews />
          <ImportantNews />
        </div>
      </div>
    </main>
  );
};

export default NewsDetails;
