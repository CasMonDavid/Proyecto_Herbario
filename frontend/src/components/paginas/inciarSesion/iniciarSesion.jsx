
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './iniciarSesion.css'
import fondo from './caclog.jpg'
import logo from './logo_uabcs.png'
import Axios from 'axios';

//local: http://localhost:4000
//railway: https://backherbario-production-7369.up.railway.app

const IniciarSesion = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginTeacher = () => {
        Axios.post("https://backherbario-production-7369.up.railway.app/iniciarsesion/investigador", { email, password })
        .then(response => {
          if (response.data.success) {
            const userData = response.data.data;
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', true);
            alert('Sesión iniciada con éxito');
          } else {
            alert('Correo o contraseña incorrectos');
          }
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
        });
    };

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
                <input
                    type="email"
                    placeholder="Correo"
                    className="inIS"
                    onChange={(event)=>{
                        setEmail(event.target.value);
                    }}/>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="inIS"
                    onChange={(event)=>{
                        setPassword(event.target.value);
                    }}/>
                <button className="botonIS" onClick={loginTeacher}>Iniciar sesión</button>
                <p className="linkIS">He olvidado mi contraseña</p>
                <h1 className="textIS">¿Todavia no tienes cuenta? <span><Link to='/registrar' className="linkISD"> Registrate</Link></span></h1>
            </div>
        </div>
    );
}

export default IniciarSesion;
