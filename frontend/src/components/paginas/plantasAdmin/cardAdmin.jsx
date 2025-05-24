import React from "react";
import "./cardAdmin.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import ver from "./ojo.png";
import editar from "./lapiz.png";
import borrar from "./borrar.png";

const CardAdmin = ({ title, id, imageUrl, onDelete }) => {
  const baseUrl = "http://localhost:4000";


  const eliminarPlanta = async () => {
  if (!window.confirm("¿Eliminar esta planta?")) return;

  try {
    const response = await Axios.delete(`http://localhost:4000/planta/borrar/${id}`);
    console.log("Planta eliminada:", id); // 🔍 Debug
    onDelete(id); // ✅ Actualiza el estado
  } catch (error) {
    console.error("Error al eliminar:", error);
    alert("No se pudo eliminar la planta");
  }
};


  return (
    <div className="cardA" style={{ width: "18rem", marginTop: "10px" }}>
      <div className="card-bodyA">
        <img
          src={`${baseUrl}/${imageUrl}`}
          className="card-img-topA"
          alt={title}
        />
        <div className="atriA">
          <Link to={`/informacion/${id}`} className="card-img-butt-2">
            <img src={ver} className="card-img-denA" alt="ver" />
          </Link>
          <Link to={`/editar/${id}`} className="card-img-butt-1">
            <img src={editar} className="card-img-denA" alt="editar" />
          </Link>
          <div
            className="card-img-butt-3"
            style={{ cursor: "pointer" }}
            onClick={eliminarPlanta}
          >
            <img src={borrar} alt="borrar" className="card-img-denA" />
          </div>
        </div>
        <h5 className="card-titleA">{title}</h5>
      </div>
    </div>
  );
};

export default CardAdmin;
