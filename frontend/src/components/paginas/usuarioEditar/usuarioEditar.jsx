import React from "react";
import './usuarioEditar.css'
import { Link } from "react-router-dom";

const UsuarioEditar = ({nombreUsuario, correo}) => {
    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src="https://media.licdn.com/dms/image/D5603AQFlXGZNIOH97A/profile-displayphoto-shrink_200_200/0/1697257441298?e=1724284800&v=beta&t=tqYh_UHmcvUancWaY1hCtWN_M5EcggunY6kdsJ5YK8g" alt="img"  className="imgn-edr"/>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="cont-ed">Nombre</h1></div>
                <input type="text" className="in-ep" placeholder="Nuevo nombre"/>
                <div className="nam-sub-ed"><h1 className="cont-ed">Correo</h1></div>
                <input type="email" className="in-ep" placeholder="Correo electronico"/>
                <div className="nam-sub-ed"><h1 className="cont-ed">Contraseña</h1></div>
                <input type="password" className="in-ep" placeholder="Contraseña"/>
                <input type="password" className="in-ep" placeholder="Confirma contraseña"/>
                <Link to="/usuario">
                    <button className="boton-epUE ">Guardar</button>
                </Link>
            </div>
        </div>
    );
}

export default UsuarioEditar;