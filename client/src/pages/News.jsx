import React, { useState } from "react";
import NewsView from "../components/NewsView";
import "../css/News.css";
import Axios from "axios";

const News = () => {
  const [noticias, setNoticias] = useState([]);

  Axios.get("http://localhost:4001/getNoticias").then((response) => {
    setNoticias(response.data);
  });

  return (
    <main>
      <div className="news-Container">
        {noticias.map((val, key) => {
          return (
            <NewsView
              idnew={val.ID}
              image={val.Imagen}
              title={val.Titulo}
              subtitle={val.Subtitulo}
            />
          );
        })}
      </div>
    </main>
  );
};

export default News;
