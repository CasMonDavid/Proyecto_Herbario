
import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom'
import './registrarSesion.css'
import fondoo from './caclog.jpg'
import logoo from './logo_uabcs.png'
import Axios from 'axios';

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app

const RegistrarSesion = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const addAdmin = () => {

        if ((name!=null && email!=null) && password===confirmPassword){
            Axios.post("http://localhost:4000/registrar/user", {
            name: name,
            email: email,
            password: password
            }).then(() => {
            alert("Registro exitoso");
            });
        }else{
            alert("Ocurrio un error, verifique que todos los campos sean ingresados y correctos");
        }
    }

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
                <input
                    type="name"
                    placeholder="Nombre completo"
                    className="inRS"
                    onChange={(event)=>{
                        setName(event.target.value);
                    }}/>
                <input
                    type="email"
                    placeholder="Correo"
                    className="inRS"
                    onChange={(event)=>{
                        setEmail(event.target.value);
                    }}/>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="inRS"
                    onChange={(event)=>{
                        setPassword(event.target.value);
                    }}/>
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    className="inRS"
                    onChange={(event)=>{
                        setConfirmPassword(event.target.value);
                    }}/>
                <button className="botonRS" onClick={addAdmin}>Registrarse</button>
                <h1 className="textRS">¿Ya tienes cuenta? <span><Link to='/iniciarsesion' className="linkRSD"> Iniciar sesión</Link></span></h1>
            </div>
        </div>
    );
}

export default RegistrarSesion;
