import './App.css';
//import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Axios from "axios";
import Menu from "./components/menu/menu";
import Footer from "./components/footer/footer";
import Inicio from "./components/inicio";
import IniciarSesion from "./components/paginas/inciarSesion/iniciarSesion";
import RegistrarSesion from "./components/paginas/registrarSesion/registrarSesion";
import Plantas from "./components/paginas/plantas/plantas";
import Editar from "./components/paginas/editarPlantaAdmin/editar";
import PlantasAdmin from "./components/paginas/plantasAdmin/plantasAdmin";
import Informacion from "./components/paginas/informacion/informacion";
import Usuario from "./components/paginas/usuario/usuario";
import UsuarioEditar from './components/paginas/usuarioEditar/usuarioEditar';
import AdministrarUsuarios from './components/paginas/administrarUsuarios/administrarUsuarios';
import RegistrarPlanta from './components/paginas/registrarPlanta/registrarPlanta';
import DescubrimientosMapa from './components/paginas/mapaDescubrimientos/mapaDescubrimientos';
import RegistrarDescubrimiento from './components/paginas/registrarDescubrimiento/registrarDescubrimiento';
import EditarDescubrimiento from './components/paginas/editarDescubrimiento/editarDescubrimiento';
import ResultadoBusqueda from './components/paginas/resultadoBuscador/resultadoBuscador';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />

        {/* Contenedor principal */}
        <div className="content">
          {/* Inner wrapper para padding-bottom y elementos absolutos */}
          <div className="content-inner">
            <Routes>
              <Route path='/' element={<Inicio />} />
              <Route path='/iniciarsesion' element={<IniciarSesion />} />
              <Route path='/plantas' element={<Plantas />} />
              <Route path='/registrar' element={<RegistrarSesion />} />
              <Route path='/plantasadmin' element={<PlantasAdmin />} />
              <Route path='/editar/:id' element={<Editar />} />
              <Route path='/informacion/:id' element={<Informacion />} />
              <Route path='/usuario' element={<Usuario />} />
              <Route path='/usuarioedit/:id' element={<UsuarioEditar />} />
              <Route path='/administrarusuarios' element={<AdministrarUsuarios />} />
              <Route path='/registrarplanta' element={<RegistrarPlanta />} />
              <Route path='/descubrimientos' element={<DescubrimientosMapa />} />
              <Route path='/descubrimientos/agregar' element={<RegistrarDescubrimiento />} />
              <Route path='/descubrimiento/:id' element={<EditarDescubrimiento />} />
              <Route path='/resultado/:query' element={<ResultadoBusqueda />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
}



export default App;
