import "./cardAdmin.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import ver from "./ojo.png";
import editar from "./lapiz.png";
import borrar from "./borrar.png";
import React from "react";

const CardAdmin = ({ title, id, imageUrl }) => {
  const baseUrl = "http://localhost:4000";


  const eliminarPlanta = async () => {
    const confirmar = window.confirm("¿Eliminar esta planta?");
    if (!confirmar) return;

    try {
        const respuesta = await fetch(`http://localhost:4000/planta/borrar/${id}`, {
            method: 'DELETE',
        });

        if (respuesta.ok) {
            alert("Planta eliminada correctamente");
            window.location.href = window.location.href;
        } else {
            alert("Error al eliminar la planta");
        }
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al intentar eliminar");
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
