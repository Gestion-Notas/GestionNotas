import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = (props) => {
  return (
    <div className="modalBackground-Modal">
      <div className="modalContainer-Modal">
        <button className="exit-Modal">
          <IoClose />
        </button>
        <div className="title-Modal">
          <p>{props.name}</p>
        </div>
        <div className="body-Modal"></div>
        <div className="footer-Modal"></div>
      </div>
    </div>
  );
};

export default Modal;
