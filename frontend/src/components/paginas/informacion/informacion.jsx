import React from "react";
import "./informacion.css";

const Informacion = ({URL, nombreCientifico, nombreComun, numCatalogo, taxon, familia, colector, fechaRecoleccion, localidad, habitad, investigador}) => {
    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src={URL} alt="img"  className="imgn-edr"/> {/* AQUI VA LA IMAGEN COLOCADA EN LA BASE DE DATOS */}
                <div className="nam-tit-ed"><h1 className="tit-ed">{nombreCientifico}</h1></div>
                <div className="nam-tit-ed"><h1 className="nombre-comun">{nombreComun}</h1></div>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Numero de catalogo</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{numCatalogo}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{taxon}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Familia</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{familia}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Colector</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{colector}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha de recolección</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{fechaRecoleccion}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Localidad</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{localidad}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Habitad</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{habitad}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Investigador</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{investigador}</h1></div>
            </div>
        </div>
    );
}

export default Informacion;