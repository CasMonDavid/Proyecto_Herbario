import React from "react";
import './administrarUsuarios.css'
import { Link } from "react-router-dom";

const AdministrarUsuarios = ({nombre}) => { {/* SE TIENE QUE AUTOMATIZAR */}
    return (
        <div className="nombresUAU">
            <div className="cont-nom">
                <h1 className="nombresOuAU">{nombre}</h1>
                <h1 className="opcionesOuAU">Eliminar</h1>
                <Link to="/usuarioedit">
                    <h1 className="opcionesOuAU">Editar</h1>
                </Link>
            </div>
        </div>
    );
}

export default AdministrarUsuarios;