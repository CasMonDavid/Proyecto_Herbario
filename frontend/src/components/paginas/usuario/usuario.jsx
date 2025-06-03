import React, { useEffect, useState } from "react";
import './usuario.css';
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Usuario = ({ nombreUsuario, correo }) => {
    const navigate = useNavigate();

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const [nombre, setNombre] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");

    
    // Redirige al login si no hay sesión activa
    useEffect(() => {
        if (!user) {
            navigate('/iniciarsesion');
        }
    }, [user, navigate]);

    if (!user) return null; // Previene errores de renderizado antes de redirigir
    
    useEffect(() => {
        Axios.get(`http://localhost:4000/usuarioedit/${user.id_investigador}`)
        .then((response) => {
            setNombre(response.data.nombre);
            setCorreoElectronico(response.data.correo_electronico);
        })
        .catch((error) => {
            console.error("Hubo un error al obtener los datos:", error);
        });
    }, [user.id_investigador]);
    
    return (
        <div className="editar-bg">
            <div className="editar-uno">
        <img src="/default-user.png" alt="img" className="imgn-edr" />
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre: {nombre}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Correo: {correoElectronico}</h1></div>
                <Link to={`/usuarioedit/${user.id_investigador ? user.id_investigador : user.administrador}`}>
                    <button className="boton-ep">Editar</button>
                </Link>
                <button
                    onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/iniciarsesion');
                    }}
                    className=" cerrar-sesion"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Usuario;
