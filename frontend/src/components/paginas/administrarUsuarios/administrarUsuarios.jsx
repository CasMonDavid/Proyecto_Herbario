import React, { useState, useEffect } from "react";
import './administrarUsuarios.css';
import { Link } from "react-router-dom";
import Axios from "axios";

const AdministrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost:4000/administrarusuarios/getall')
      .then(response => {
        setUsuarios(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <button className="btn-volver" onClick={() => window.history.back()}>
        Volver
      </button>

      {isLoading ? (
        <p className="loading-text">Cargando...</p>
      ) : (
        <div className="usuarios-container">
          {usuarios.map((user) => (
            <div className="usuario-card" key={user.id_investigador}>
              <img src="/default-user.png" alt="Usuario" />
              <h2 className="usuario-nombre">{user.nombre}</h2>
              <p className="usuario-correo">{user.correo_electronico}</p>
              <Link to={`/usuarioedit/${user.id_investigador}`} className="editar-btn">
                Editar
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdministrarUsuarios;
