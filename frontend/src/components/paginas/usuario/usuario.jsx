import React, { useEffect } from "react";
import './usuario.css';
import { Link, useNavigate } from "react-router-dom";

const Usuario = ({ nombreUsuario, correo }) => {
    const navigate = useNavigate();

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    // Redirige al login si no hay sesión activa
    useEffect(() => {
        if (!user) {
            navigate('/iniciarsesion');
        }
    }, [user, navigate]);

    if (!user) return null; // Previene errores de renderizado antes de redirigir

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src="https://media.licdn.com/dms/image/D5603AQFlXGZNIOH97A/profile-displayphoto-shrink_200_200/0/1697257441298?e=1724284800&v=beta&t=tqYh_UHmcvUancWaY1hCtWN_M5EcggunY6kdsJ5YK8g" alt="img" className="imgn-edr" />
                <div className="nam-tit-ed"><h1 className="tit-ed">{nombreUsuario}</h1></div>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre: {user.nombre}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Correo: {user.correo_electronico}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Contraseña: {user.contrasena}</h1></div>
                <Link to={`/usuarioedit/${user.id_investigador ? user.id_investigador : user.administrador}`}>
                    <button className="boton-ep">Editar</button>
                </Link>
                <button
                    onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/iniciarsesion');
                    }}
                    className="boton-ep cerrar-sesion"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Usuario;
