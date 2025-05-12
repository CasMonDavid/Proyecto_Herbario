import React from "react";
import './mapa.css'
import mapa from './mapa.PNG';

const Mapa = () => {
    return (
        <div className="mapa">
            <h1>Mapa</h1>
            <div className="mapaD">
                <img className="mapa-img" src={mapa} alt="mapa" />
            </div>
        </div>
    );
}

export default Mapa;