import React, { lazy } from "react";
import { AuthProvider } from "./contexts/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainPage_Admin from "./pages/MainPage_Admin";
import "./css/index.css";
import Home from "./pages/Home";
import NotasVista from "./pages/NotasVista";
import NotasPublicar from "./pages/NotasPublicar";
import Login from "./pages/Login";
import Pensum from "./pages/Pensum";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import AboutUs from "./pages/AboutUs";
import Admisiones from "./pages/Admisiones";

import RequireAdmin from "./components/RequireAdmin";
import RequireAlumno from "./components/RequireAlumno";
import RequireMaestro from "./components/RequireMaestro";

import UsuariosAdmin from "./pages/UsuariosAdmin";
import MateriasAdmin from "./pages/MateriasAdmin";
import NoticiasAdmin from "./pages/NoticiasAdmin";
import RequisitosAdmin from "./pages/RequisitosAdmin";
import Criterios_EvaluacionAdmin from "./pages/Criterios_EvaluacionAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";
import CalificacionesAdmin from "./pages/CalificacionesAdmin";
import PeriodosAdmin from "./pages/PeriodosAdmin";
import IglesiasAdmin from "./pages/IglesiasAdmin";
import Materias_InscritasAdmin from "./pages/Materias_InscritasAdmin";

import PrintUsuarios from "./print/PrintUsuarios";
import PrintRequisitos from "./print/PrintRequisitos";
import PrintMaterias from "./print/PrintMaterias";
import PrintCalificaciones from "./print/PrintCalificaciones";
import PrintIglesia from "./print/PrintIglesias";
import PrintPeriodos from "./print/PrintPeriodos";
import PrintCriterios_Evaluacion from "./print/PrintCriterios_Evaluacion";
import PrintMaterias_Inscritas from "./print/PrintMaterias_Inscritas";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<h1>hola 404</h1>} />
          <Route path="/" element={<MainPage Main={Home} />} />
          <Route path="/pensum" element={<MainPage Main={Pensum} />} />
          <Route path="/noticias" element={<MainPage Main={News} />} />
          <Route path="/nosotros" element={<MainPage Main={AboutUs} />} />
          <Route element={<RequireMaestro />}>
            <Route
              path="/notas/publicar"
              element={<MainPage Main={NotasPublicar} />}
            />
          </Route>
          <Route element={<RequireAlumno />}>
            <Route
              path="/notas/vista"
              element={<MainPage Main={NotasVista} />}
            />
          </Route>
          <Route path="/admisiones" element={<MainPage Main={Admisiones} />} />
          <Route path="/login" element={<MainPage Main={Login} />} />
          <Route
            path="/noticias/:id"
            element={<MainPage Main={NewsDetails} />}
          />

          <Route element={<RequireAdmin />}>
            <Route
              path="/admin/home"
              element={<MainPage_Admin Main={DashboardAdmin} />}
            />
            <Route
              path="/admin/usuarios"
              element={<MainPage_Admin Main={UsuariosAdmin} />}
            />
            <Route
              path="/admin/materias"
              element={<MainPage_Admin Main={MateriasAdmin} />}
            />
            <Route
              path="/admin/noticias"
              element={<MainPage_Admin Main={NoticiasAdmin} />}
            />
            <Route
              path="/admin/requisitos"
              element={<MainPage_Admin Main={RequisitosAdmin} />}
            />
            <Route
              path="/admin/criterios_evaluacion"
              element={<MainPage_Admin Main={Criterios_EvaluacionAdmin} />}
            />
            <Route
              path="/admin/calificaciones"
              element={<MainPage_Admin Main={CalificacionesAdmin} />}
            />
            <Route
              path="/admin/periodos"
              element={<MainPage_Admin Main={PeriodosAdmin} />}
            />
            <Route
              path="/admin/iglesias"
              element={<MainPage_Admin Main={IglesiasAdmin} />}
            />
            <Route
              path="/admin/materias_inscritas"
              element={<MainPage_Admin Main={Materias_InscritasAdmin} />}
            />

            <Route path="/print/usuarios" element={<PrintUsuarios />}></Route>
            <Route
              path="/print/requisitos"
              element={<PrintRequisitos />}
            ></Route>
            <Route path="/print/materias" element={<PrintMaterias />}></Route>
            <Route
              path="/print/calificaciones"
              element={<PrintCalificaciones />}
            ></Route>
            <Route path="/print/iglesias" element={<PrintIglesia />}></Route>
            <Route path="/print/periodos" element={<PrintPeriodos />}></Route>
            <Route
              path="/print/criterios_evaluacion"
              element={<PrintCriterios_Evaluacion />}
            ></Route>
            <Route
              path="/print/materias_inscritas"
              element={<PrintMaterias_Inscritas />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
