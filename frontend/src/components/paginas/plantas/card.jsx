import React from "react";
import './card.css'

const Card = ({ title, description, imageUrl}) => {
    return (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
            <div className="card-body">
            <img src={imageUrl} className="card-img-top" alt={title} />
                <h5 className="card-title">{title}</h5>
            </div>
        </div>
    );
}

export default Card;