import React, { useState } from "react";
import './cardAdmin.css'
import { Link } from "react-router-dom";
import ver from "./ojo.png"
import editar from "./lapiz.png"
import borrar from "./borrar.png"

const CardAdmin = ({ title, id, imageUrl}) => {
    return (
        <div className="cardA" style={{ width: "18rem", marginTop: "10px" }}>
            <div className="card-bodyA">
                <img src={imageUrl} className="card-img-topA" alt={title} />
                <div className="atriA"> {/* SE OCUPA COLOCAR LA LLAVE PRIMARIA PARA HACER EL VINCULO A LA FOTO SELECCIONADA */}
                    <Link to="/informacion" className="card-img-butt-2">
                        <img src={ver} className="card-img-denA" alt="ver" />
                    </Link>
                    <Link to={`/editar/${id}`} className="card-img-butt-1">
                        <img src={editar} className="card-img-denA" alt="editar" />
                    </Link>
                    <div className="card-img-butt-3">
                        <img src={borrar} alt="borrar"  className="card-img-denA"/>
                    </div>
                </div>
                <h5 className="card-titleA">{title}</h5>
            </div>
        </div>
    );
}

export default CardAdmin;