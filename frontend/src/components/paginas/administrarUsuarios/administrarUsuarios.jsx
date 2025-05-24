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

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '10px'
  };

  const imageStyle = {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '50%'
  };

  return (
    <div>
      {isLoading ? (
        <p className="loading-text">Cargando...</p>
      ) : (
        <div className="usuarios-container">
          {usuarios.map((user) => (
            <div className="usuario-card" key={user.id_investigador}>
              <img src="/default-user.png" alt="Usuario" style={imageStyle} />
              <div className="usuario-info">
                <h2 className="usuario-nombre">{user.nombre}</h2>
                <p className="usuario-correo">{user.correo_electronico}</p>
                <Link to={`/usuarioedit/${user.id_investigador}`} style={buttonStyle}>Editar</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdministrarUsuarios;
