import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const MainPage = ({ Main }) => {
  return (
    <>
      <Navbar user="Lucas Jair Lopez Tavarez" />
        <Main />
      <Footer />
    </>
  );
};

export default MainPage;
