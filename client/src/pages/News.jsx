import React, { useState, useEffect } from "react";
import NewsView from "../components/NewsView";
import "../css/News.css";
import Axios from "../libs/axios"

const News = () => {
  const [noticias, setNoticias] = useState([]);

 useEffect(()=> {Axios.get("/getNoticias").then((response) => {
    setNoticias(response.data);
  }).catch((err)=>{
    console.log(err)
  })});

  return (
    <main className="main">
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
