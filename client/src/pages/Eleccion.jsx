import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../css/Eleccion.css";
import Axios from "../libs/axios";
import { useAuthContext } from "../contexts/auth";

const Eleccion = () => {
  const [materias, setMaterias] = useState([]);
  const [User, SetUser] = useAuthContext();

  useEffect(() => {
    const doCheck = async () => {
      if (!localStorage.getItem("auth")) return;
      try {
        const response = await Axios.get("/auth");
        if (response.status !== 200 || response.status >= 500) {
          SetUser({ auth: false, token: null, userdata: {} });
          localStorage.removeItem("auth");
          return;
        }
        localStorage.setItem("auth", response.data.token);
        SetUser({
          auth: true,
          token: response.data.token,
          userdata: response.data.userdata,
        });
      } catch (error) {
        if (error.name === "AbortError") return;
        if (error.response.status === 401) {
          SetUser({ auth: false, token: null, userdata: {} });
          localStorage.removeItem("auth");
          return;
        }
      }
    };
    doCheck();
  }, []);

  useEffect(() => {
    !User.auth
      ? console.log("No Auth" + " - " + User.auth)
      : getElegibles(User.userdata.ID);
  });

  const getElegibles = (ID) => {
    Axios.post("/getMateriasElegibles", { id: ID }).then((response) => {
      setMaterias(response.data);
    });
  };

  return (
    <main className="main">
      <div className="grid2-3_Eleccion">
        <div className="elegibles_Eleccion">
          {!User.auth ? (
            <></>
          ) : (
            <Form className="formulario_Eleccion">
              {materias.map((val, key) => {
                return (
                  <FormGroup check inline>
                    <Input type="checkbox" />
                    <Label check>{val.Materia}</Label>
                  </FormGroup>
                );
              })}
            </Form>
          )}
        </div>
        <div className="info_Eleccion"></div>
      </div>
    </main>
  );
};

export default Eleccion;
