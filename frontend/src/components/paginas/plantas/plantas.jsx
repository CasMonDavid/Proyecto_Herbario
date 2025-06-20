import React, { useState, useEffect } from "react";
import "./plantas.css";
import { Link } from "react-router-dom";
import Card from "./card";
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app

const Plantas = () => {
  //INICIO DE SESION MEDIANTE LOCALSTORAGE
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const [plantas, setPlantas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:4000/plantas/getall")
      .then((response) => {
        setPlantas(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
        setIsLoading(false);
      });
  }, []);

  if (user) {
  return (
    <div className="plantas">
      <h1>Plantas</h1>
      <div className="panel-admin">
        <h1 className="titulo-admin">Zona Administrativa</h1>
        <div className="botones-admin">
          <Link to="/plantasadmin"><button className="btn-admin">Administrar Plantas</button></Link>
          <Link to="/registrarplanta"><button className="btn-admin">Registrar Planta</button></Link>
          <Link to="/administrarusuarios"><button className="btn-admin">Administrar Usuarios</button></Link>
          <Link to="/descubrimientos/agregar"><button className="btn-admin">Agregar Descubrimiento</button></Link>
        </div>
      </div>

      {isLoading ? (
        <p className="cargando-texto">Cargando...</p>
      ) : (
        <div className="cartas">
          {plantas.map((planta) => (
            <Card
              key={planta.id_planta}
              id={planta.id_planta}
              title={planta.nombre_cientifico}
              imageUrl={planta.fotografia}
            />
          ))}
        </div>
      )}
    </div>
  );
} else {
    return (
      <div className="plantas">
        <h1>Plantas</h1>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="cartas">
            {plantas.map((planta) => {
              return (
                <Card
                  key={planta.id_planta}
                  id={planta.id_planta}
                  title={planta.nombre_cientifico}
                  imageUrl={planta.fotografia}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
};

export default Plantas;
