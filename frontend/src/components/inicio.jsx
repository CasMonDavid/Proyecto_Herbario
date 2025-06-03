import React from "react";
import DescripcionPP from "./descripcionPP/descripcion"
import Mapa from "./mapa/mapa"

const Inicio = () => {
    return (
        <div className="descripcion">
            <DescripcionPP></DescripcionPP>
            <div className="mapa">
            </div>
        </div>
    );
}

export default Inicio;