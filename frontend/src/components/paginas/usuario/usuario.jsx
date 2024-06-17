import React from "react";
import './usuario.css'
import { Link } from "react-router-dom";

const Usuario = ({nombreUsuario, correo}) => {
    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src="https://media.licdn.com/dms/image/D5603AQFlXGZNIOH97A/profile-displayphoto-shrink_200_200/0/1697257441298?e=1724284800&v=beta&t=tqYh_UHmcvUancWaY1hCtWN_M5EcggunY6kdsJ5YK8g" alt="img"  className="imgn-edr"/>
                <div className="nam-tit-ed"><h1 className="tit-ed">{nombreUsuario}</h1></div>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Correo: {correo}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Contraseña: *********</h1></div>
                <Link to="/usuarioedit">
                    <button className="boton-ep ">Editar</button>
                </Link>
            </div>
        </div>
    );
}

export default Usuario;