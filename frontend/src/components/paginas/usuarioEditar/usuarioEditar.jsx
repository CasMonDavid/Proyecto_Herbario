import React, { useState, useEffect } from "react";
import "./usuarioEditar.css";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const UsuarioEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:4000/usuarioedit/${id}`)
      .then((response) => {
        setNombre(response.data.nombre);
        setCorreoElectronico(response.data.correo_electronico);
        setPassword(response.data.contrasena);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, [id]);

  const editarUsuario = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let errores = [];

    if (nombre.trim().length < 8)
      errores.push("- El nombre debe tener al menos 8 caracteres.");
    if (!emailRegex.test(correoElectronico))
      errores.push("- El correo no tiene un formato válido.");
    if (password.length < 8)
      errores.push("- La contraseña debe tener al menos 8 caracteres.");
    if (password !== passwordConfirm)
      errores.push("- Las contraseñas no coinciden.");

    if (errores.length > 0) {
      alert("Ocurrió un error:\n" + errores.join("\n"));
      return;
    }

    Axios.put(`http://localhost:4000/usuarioedit/${id}`, {
      nombre: nombre,
      correo_electronico: correoElectronico,
      contrasena: password,
    })
      .then((response) => {
        alert("Usuario actualizado de forma correcta");
        navigate("/usuario");
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar los datos:", error);
        alert("Error al actualizar los datos");
      });
  };

  return (
    <div className="editar-bg">
      <div className="editar-uno">
        <img src="/default-user.png" alt="img" className="imgn-edr" />
      </div>
      <div className="editar-dos">
        <div className="nam-sub-ed">
          <h1 className="cont-ed">Nombre</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Nuevo nombre"
          value={nombre}
          onChange={(e) => {
            const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
            if (soloLetras.test(e.target.value)) {
              setNombre(e.target.value);
            }
          }}
        />

        <div className="nam-sub-ed">
          <h1 className="cont-ed">Correo</h1>
        </div>
        <input
          type="email"
          className="in-ep"
          placeholder="Correo electrónico"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
        />
        <div className="nam-sub-ed">
          <h1 className="cont-ed">Contraseña</h1>
        </div>
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={editarUsuario} className="boton-epUE">
            Guardar
          </button>
          <button onClick={() => navigate(-1)} className="boton-epUE2">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsuarioEditar;
