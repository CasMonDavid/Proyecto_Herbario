import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './registrarSesion.css';
import fondoo from './caclog.jpg';
import logoo from './logo_uabcs.png';
import Axios from 'axios';

const RegistrarSesion = () => {
  const [nombre, setName] = useState("");
  const [correo_electronico, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // ✅ Hook para navegación

  const addAdmin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

    if (
      nombre.trim().length >= 8 &&
      letrasRegex.test(nombre) &&
      correo_electronico.trim() !== "" &&
      emailRegex.test(correo_electronico) &&
      contrasena.length >= 8 &&
      confirmPassword !== "" &&
      contrasena === confirmPassword
    ) {
      Axios.post("http://localhost:4000/registrar/user", {
        nombre,
        correo_electronico,
        contrasena
      }).then(() => {
        alert("Registro exitoso");
        navigate("/iniciarsesion"); // ✅ Redirección aquí
      }).catch(error => {
        console.error("Error en el registro:", error);
        alert("Ocurrió un error al registrar.");
      });
    } else {
      let errorMsg = "Ocurrió un error:\n";

      if (nombre.trim().length < 8) errorMsg += "- El nombre debe tener al menos 8 caracteres.\n";
      if (!letrasRegex.test(nombre)) errorMsg += "- El nombre solo puede contener letras y espacios.\n";
      if (!emailRegex.test(correo_electronico)) errorMsg += "- El correo no tiene un formato válido.\n";
      if (contrasena.length < 8) errorMsg += "- La contraseña debe tener al menos 8 caracteres.\n";
      if (contrasena !== confirmPassword) errorMsg += "- Las contraseñas no coinciden.\n";

      alert(errorMsg);
    }
  };

  return (
    <div className="registrar-sesion">
      <div className="primera-parteRS">
        <img className="fondo-imgRS" src={fondoo} alt="img" />
      </div>
      <div className="segunda-parteRS">
        <div className="tituloRS">
          <img className="logo-imgRS" src={logoo} alt="logo" />
          <h1>HERBARIO</h1>
        </div>
        <h1 className="subRS">Registrarse</h1>
        <input
          type="text"
          placeholder="Nombre completo"
          className="inRS"
          value={nombre}
          onChange={(e) => {
            const valor = e.target.value;
            const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
            if (soloLetras.test(valor)) {
              setName(valor);
            }
          }}
        />
        <input
          type="email"
          placeholder="Correo"
          className="inRS"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contraseña"
          className="inRS"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirmar contraseña"
          className="inRS"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="botonRS" onClick={addAdmin}>Registrarse</button>
        <h1 className="textRS">
          ¿Ya tienes cuenta? <span><Link to='/iniciarsesion' className="linkRSD"> Iniciar sesión</Link></span>
        </h1>
      </div>
    </div>
  );
};

export default RegistrarSesion;
