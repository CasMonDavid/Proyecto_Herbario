import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // <- Asegúrate de importar useNavigate
import Axios from "axios";
import Card from "../plantas/card";
import "../plantas/plantas.css";
import "./resultadoBuscador.css"; 

function ResultadoBuscador() {
  const { query } = useParams();
  const navigate = useNavigate(); // <- Aquí declaras navigate
  const [resultados, setResultados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    Axios.post("http://localhost:4000/plantas/search", { q: query })
      .then((response) => {
        setResultados(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
        setIsLoading(false);
      });
  }, [query]);

  return (
    <div className="resultado-container">
  <button className="btn-volver" onClick={() => navigate(-1)}>
    ⬅ Volver
  </button>

  <h1 className="resultado-titulo">
    Resultados para: <span>{decodeURIComponent(query)}</span>
  </h1>

  {isLoading ? (
    <p>Cargando resultados...</p>
  ) : resultados.length > 0 ? (
    <div className="cartas">
      {resultados.map((planta) => (
        <Card
          key={planta.id_planta}
          id={planta.id_planta}
          title={planta.nombre_cientifico}
          imageUrl={planta.fotografia}
        />
      ))}
    </div>
  ) : (
    <p>No se encontraron resultados.</p>
  )}
</div>



  );
}

export default ResultadoBuscador;
