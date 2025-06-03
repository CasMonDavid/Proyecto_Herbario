import React, { useState, useEffect } from "react";
import './plantasAdmin.css';
import Card from "./cardAdmin";
import Axios from 'axios';

const PlantasAdmin = () => {
  const [plantas, setPlantas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlantas = () => {
    Axios.get('http://localhost:4000/plantasadmin/getall')
      .then(response => {
        setPlantas(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPlantas();
  }, []);

  return (
    <div className="plantasA">
      <h1>Administrar plantas</h1>
      {isLoading ? (
        <p>Cargando...</p>
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
};

export default PlantasAdmin;
