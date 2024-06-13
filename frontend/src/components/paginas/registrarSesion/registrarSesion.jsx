import React from "react";
import { Link } from 'react-router-dom'
import './registrarSesion.css'
import fondoo from './caclog.jpg'
import logoo from './logo_uabcs.png'

const RegistrarSesion = () => {
    return (
        <div className="registrar-sesion">
            <div className="primera-parteRS">
                <img className="fondo-imgRS" src= {fondoo} alt="img" />
            </div>
            <div className="segunda-parteRS">
                <div className="tituloRS">
                    <img className="logo-imgRS" src={logoo} alt="logo" />
                    <h1>HERBARIO</h1>
                </div>
                <h1 className="subRS">Registrarse</h1>
                <input type="name" placeholder="Nombre completo" className="inRS"/>
                <input type="email" placeholder="Correo" className="inRS"/>
                <input type="password" placeholder="Contraseña" className="inRS"/>
                <input type="password" placeholder="Confirmar contraseña" className="inRS"/>
                <button className="botonRS">Registrarse</button>
                <h1 className="textRS">¿Ya tienes cuenta? <span><Link to='/iniciarsesion' className="linkRSD"> Iniciar sesión</Link></span></h1>
            </div>
        </div>
    );
}

export default RegistrarSesion;