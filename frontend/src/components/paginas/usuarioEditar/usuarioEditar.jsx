import React, { useState, useEffect } from "react";
import './usuarioEditar.css';
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app

const UsuarioEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:4000/usuarioedit/${id}`)
            .then(response => {
                setNombre(response.data.nombre);
                setCorreoElectronico(response.data.correo_electronico);
                setPassword(response.data.contrasena);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [id]);

    const editarUsuario = (event) => {
        event.preventDefault();

        if (password !== undefined && passwordConfirm !== undefined && password === passwordConfirm) {
            Axios.put(`http://localhost:4000/usuarioedit/${id}`, {
                nombre: nombre,
                correo_electronico: correoElectronico,
                contrasena: password
            }).then(response => {
                alert("Usuario actualizado de forma correcta");
                navigate("/usuario"); // Redirigir después de guardar
            }).catch(error => {
                console.error("Hubo un error al actualizar los datos:", error);
                alert("Error al actualizar los datos");
            });
        } else {
            alert("Las contraseñas no concuerdan o no se llenó el espacio solicitado");
        }
    };

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img
                    src="https://media.licdn.com/dms/image/D5603AQFlXGZNIOH97A/profile-displayphoto-shrink_200_200/0/1697257441298?e=1724284800&v=beta&t=tqYh_UHmcvUancWaY1hCtWN_M5EcggunY6kdsJ5YK8g"
                    alt="img"
                    className="imgn-edr"
                />
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="cont-ed">Nombre</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Nuevo nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <div className="nam-sub-ed"><h1 className="cont-ed">Correo</h1></div>
                <input
                    type="email"
                    className="in-ep"
                    placeholder="Correo electrónico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                />
                <div className="nam-sub-ed"><h1 className="cont-ed">Contraseña</h1></div>
                <input
                    type="password"
                    className="in-ep"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="in-ep"
                    placeholder="Confirma contraseña"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                    <button onClick={editarUsuario} className="boton-epUE">Guardar</button>
                    <button onClick={() => navigate(-1)} className="boton-epUE2">Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default UsuarioEditar;
