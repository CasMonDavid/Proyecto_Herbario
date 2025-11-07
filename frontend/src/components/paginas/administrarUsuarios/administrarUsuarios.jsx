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

  // 👇 Nueva función para eliminar usuario
  const eliminarUsuario = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      Axios.delete(`http://localhost:4000/usuario/${id}`)
        .then(() => {
          alert("Usuario eliminado correctamente");
          setUsuarios(prev => prev.filter(u => u.id_investigador !== id));
        })
        .catch(error => {
          console.error("Error al eliminar usuario:", error);
          alert("Hubo un error al eliminar el usuario");
        });
    }
  };

  return (
    <div className="page-container">
      <button className="btn-volver" onClick={() => window.history.back()}>
        Volver
      </button>

      <h1> Adminitrar usuarios</h1>
      
      {isLoading ? (
        <p className="loading-text">Cargando...</p>
      ) : (
        <div className="usuarios-container">
          {usuarios.map((user) => (
            <div className="usuario-card" key={user.id_investigador}>
              <img src="/default-user.png" alt="Usuario" />
              <h2 className="usuario-nombre">{user.nombre}</h2>
              <p className="usuario-correo">{user.correo_electronico}</p>

              {/* Contenedor centrado para los botones */}
              <div className="botones-acciones">
                <Link to={`/usuarioedit/${user.id_investigador}`} className="editar-btn btn-accion">
                  Editar
                </Link>
                <button
                  className="eliminar-btn btn-accion"
                  onClick={() => eliminarUsuario(user.id_investigador)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdministrarUsuarios;
