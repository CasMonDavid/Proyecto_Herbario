import React, { useEffect, useState } from "react";
import './usuario.css';
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Usuario = () => {
    const navigate = useNavigate();

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const [nombre, setNombre] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [loading, setLoading] = useState(true); // para controlar render mientras carga

    // Redirige al login si no hay sesión activa
    useEffect(() => {
        if (!user) {
            navigate('/iniciarsesion');
        } else {
            // Obtener datos del usuario
            Axios.get(`http://localhost:4000/usuarioedit/${user.id_investigador}`)
                .then((response) => {
                    setNombre(response.data.nombre);
                    setCorreoElectronico(response.data.correo_electronico);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Hubo un error al obtener los datos:", error);
                    setLoading(false);
                });
        }
    }, [user, navigate]);

    if (!user || loading) {
        return <div>Cargando...</div>; // evita renderizar antes de tener datos
    }

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src="/default-user.png" alt="img" className="imgn-edr" />
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed">
                    <h1 className="sub-ed">Nombre: {nombre}</h1>
                </div>
                <div className="nam-sub-ed">
                    <h1 className="sub-ed">Correo: {correoElectronico}</h1>
                </div>
                <Link to={`/usuarioedit/${user.id_investigador ? user.id_investigador : user.administrador}`}>
                    <button className="boton-ep">Editar</button>
                </Link>
                <button
                    onClick={() => {
                        localStorage.removeItem('user');
                        alert("Has cerrado sesión correctamente"); // mensaje al cerrar sesión
                        navigate('/iniciarsesion');
                    }}
                    className="cerrar-sesion"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Usuario;
