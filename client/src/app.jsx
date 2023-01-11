import React, {lazy} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage"
import MainPage_Admin from "./pages/MainPage_Admin";
import "./css/index.css";
import Null from "./pages/Null"
import Home from "./pages/Home";
import NotasVista from "./pages/NotasVista"
import NotasPublicar from "./pages/NotasPublicar";
import Login from "./pages/Login"
import Pensum from "./pages/Pensum";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import AboutUs from "./pages/AboutUs";
import Admisiones from "./pages/Admisiones";

import UsuariosAdmin from "./pages/UsuariosAdmin";
import MateriasAdmin from './pages/MateriasAdmin';
import NoticiasAdmin from "./pages/NoticiasAdmin";

import PrintUsuarios from "./print/PrintUsuarios";
import { AuthProvider } from './contexts/Auth';
import PrintMaterias from "./print/PrintMaterias";
export const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="*" element={<h1>hola 404</h1>} />
        <Route path="/" element={<MainPage Main={Home}/>} />
        <Route path="/pensum" element={<MainPage Main={Pensum}/>} />
        <Route path="/noticias" element={<MainPage Main={News}/>} />
        <Route path="/nosotros" element={<MainPage Main={AboutUs}/>} />
        <Route path="/notas/publicar" element={<MainPage Main={NotasPublicar}/>} />
        <Route path="/notas/vista" element={<MainPage Main={NotasVista}/>} />
        <Route path="/admisiones" element={<MainPage Main={Admisiones}/>} />
        <Route path="/login" element={<MainPage Main={Login}/>} />
        <Route path="/noticias/:id" element={<MainPage Main={NewsDetails}/>}/> 

        <Route path="/admin/home" element={<MainPage_Admin Main={Null}/>}/>
        <Route path="/admin/usuarios" element={<MainPage_Admin Main={UsuariosAdmin}/>}/>
        <Route path="/admin/materias" element={<MainPage_Admin Main={MateriasAdmin}/>}/>
        <Route path="/admin/noticias" element={<MainPage_Admin Main={NoticiasAdmin}/>}/>

        <Route path="/print/usuarios" element={<PrintUsuarios/>}></Route>
        <Route path="/print/materias" element={<PrintMaterias/>}></Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
};
