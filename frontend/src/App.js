import './App.css';
//import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Axios from "axios";
import Menu from "./components/menu/menu";
import Inicio from "./components/inicio";
import IniciarSesion from "./components/paginas/inciarSesion/iniciarSesion";
import RegistrarSesion from "./components/paginas/registrarSesion/registrarSesion";
import Plantas from "./components/paginas/plantas/plantas";
import Editar from "./components/paginas/editarPlantaAdmin/editar";
import PlantasAdmin from "./components/paginas/plantasAdmin/plantasAdmin";

function App() {
  
  return (
    <div className="App">
      <div className="datos">
        <Router>
          <Menu />

          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/iniciarsesion' element={<IniciarSesion />} />
            <Route path='/plantas' element={<Plantas />} />
            <Route path='/registrar' element={<RegistrarSesion />} />
            <Route path='/plantasadmin' element={<PlantasAdmin />} />
            <Route path='/editar/:id' element={<Editar />} /> {/* INTERFAZ ACTUALIZADA: ES PARA MANDAR DATOS A TRAVEZ DEL URL */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
