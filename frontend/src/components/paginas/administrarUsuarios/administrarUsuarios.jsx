import React, { useState, useEffect } from "react";
import './administrarUsuarios.css'
import { Link } from "react-router-dom";
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app

const AdministrarUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get('http://localhost:4000/administrarusuarios/getall')
            .then(response => {
                setUsuarios(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
                setIsLoading(false);
            });
    }, []); 

    return (
        <div>
        {isLoading ? (
            <p>Cargando...</p>
        ) : (
                <div className="nombresUAU">
                    {usuarios.map((user) => {
                        return (
                            <div className="cont-nom">
                                <h1 className="nombresOuAU">{user.nombre}</h1>
                                <h1 className="nombresOuAU">{user.correo_electronico}</h1>
                                <h1 className="opcionesOuAU">Eliminar</h1>
                                <Link to={`/usuarioedit/${user.id_investigador}`} >
                                    <h1 className="opcionesOuAU">Editar</h1>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default AdministrarUsuarios;