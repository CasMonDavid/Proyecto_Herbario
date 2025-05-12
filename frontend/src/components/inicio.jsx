import React from "react";
import DescripcionPP from "./descripcionPP/descripcion"
import Mapa from "./mapa/mapa"

const Inicio = () => {
    return (
        <div className="descripcion">
            <DescripcionPP></DescripcionPP>
            <div className="mapa">
                <Mapa></Mapa>
            </div>
        </div>
    );
}

export default Inicio;