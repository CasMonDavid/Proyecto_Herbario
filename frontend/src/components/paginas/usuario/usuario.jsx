import React from "react";
import './usuario.css'
import { Link } from "react-router-dom";

//local: http://localhost:4000
//railway: https://backherbario-production-7369.up.railway.app

const Usuario = ({nombreUsuario, correo}) => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (user) {
        console.log(user.id_investigador);    // Output: 1
        console.log(user.nombre);  // Output: Alice
        console.log(user.correo_electronico); // Output: alice@example.com
    }

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src="https://media.licdn.com/dms/image/D5603AQFlXGZNIOH97A/profile-displayphoto-shrink_200_200/0/1697257441298?e=1724284800&v=beta&t=tqYh_UHmcvUancWaY1hCtWN_M5EcggunY6kdsJ5YK8g" alt="img"  className="imgn-edr"/>
                <div className="nam-tit-ed"><h1 className="tit-ed">{nombreUsuario}</h1></div>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre: {user.nombre}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Correo: {user.correo_electronico}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Contraseña: {user.contrasena}</h1></div>
                <Link to={`/usuarioedit/${user.id_investigador ? user.id_investigador : user.administrador}`}>
                    <button className="boton-ep ">Editar</button>
                </Link>
            </div>
        </div>
    );
}

export default Usuario;