import React from "react";
import "../css/GradesCard.css";
import bgimage from "../img/imagen_news-Home.jpg";

const GradesCard = (props) => {
  return (
    <div className="container-GradesCard">
      <div className="container_img-GradesCard">
        <div
          className="imagen-GradesCard"
          style={{ backgroundImage: `url(${bgimage})` }}
        >
          {" "}
        </div>
      </div>
      <p>{props.name}</p>
    </div>
  );
};

export default GradesCard;
