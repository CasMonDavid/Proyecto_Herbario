import React from "react";
import './card.css';
import { Link } from "react-router-dom";

const Card = ({ title, id, imageUrl }) => {
    const baseUrl = "http://localhost:4000";
    return (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
            <div className="card-body">
                {/* Aquí envolvemos la imagen completa en el Link */}
                <Link to={`/informacion/${id}`}>
                    <img 
                        src={`${baseUrl}/${imageUrl}`} 
                        className="card-img-top" 
                        alt={title} 
                        style={{ cursor: "pointer" }} 
                    />
                </Link>
                
                {/* El nombre de la planta también lo puedes hacer clickeable si quieres */}
                <h5 className="card-title">{title}</h5>
            </div>
        </div>
    );
};

export default Card;
