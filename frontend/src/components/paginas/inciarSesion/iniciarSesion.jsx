import React from "react";
import { Link } from 'react-router-dom'
import './iniciarSesion.css'
import fondo from './caclog.jpg'
import logo from './logo_uabcs.png'

const IniciarSesion = () => {
    return (
        <div className="iniciar-sesion">
            <div className="primera-parteIS">
                <img className="fondo-imgIS" src= {fondo} alt="img" />
            </div>
            <div className="segunda-parteIS">
                <div className="tituloIS">
                    <img className="logo-imgIS" src={logo} alt="logo" />
                    <h1>HERBARIO</h1>
                </div>
                <h1 className="subIS">Inicia sesión</h1>
                <input type="email" placeholder="Correo" className="inIS"/>
                <input type="password" placeholder="Contraseña" className="inIS"/>
                <button className="botonIS">Iniciar sesión</button>
                <a className="linkIS" href="">He olvidado mi contraseña</a>
                <h1 className="textIS">¿Todavia no tienes cuenta? <span><Link to='/registrar' className="linkISD"> Registrate</Link></span></h1>
            </div>
        </div>
    );
}

export default IniciarSesion;