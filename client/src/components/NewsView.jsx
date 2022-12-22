import React from "react";
import NewsButton from "./NewsButton";
import Axios from "axios";
import "../css/NewsView.css"

const NewsView = (props) => {

  const imageconcat = "http://localhost:4001/static/images/" + props.image;
  return (
    <div className="container-NewsView">
        <div className="image-NewsView" style={{backgroundImage: `url(${imageconcat})`}}/>
        <div className="text-NewsView">
            <p className="title-NewsView">{props.title}</p>
            <div className="thin-line"/>
            <p>
                {props.subtitle}
            </p>
            <NewsButton idnews={props.idnew}/>
        </div>
    </div>
  );
};

export default NewsView;