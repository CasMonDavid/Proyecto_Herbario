import React from "react";
import './card.css';
import { Link } from "react-router-dom";
import ver from "./ojo.png";

const Card = ({ title, id, imageUrl}) => {
    const baseUrl = "http://localhost:4000";
    return (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
            <div className="card-body">
            <img src={`${baseUrl}/${imageUrl}`} className="card-img-top" alt={title} />
            <div className="atriA">
                <Link to={`/informacion/${id}`} className="card-img-butt-2">
                    <img src={ver} className="card-img-denA" alt="ver" />
                </Link>
            </div>
            <h5 className="card-title">{title}</h5>
            </div>
        </div>
    );
}

export default Card;