import { useNavigate, Navigate } from "react-router-dom";
import React, { useState } from "react";
import "./registrarPlanta.css";
import Axios from "axios";

const RegistrarPlanta = () => {
  const navigate = useNavigate();

  //  
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreComun, setNombreComun] = useState("");
  const [fecha, setFecha] = useState("");
  const [taxon, setTaxon] = useState("");
  const [Familia, setFamilia] = useState("");
  const [Colector, setColector] = useState("");
  const [Localidad, setLocalidad] = useState("");
  const [Habitat, setHabitat] = useState("");
  const [fotografia, setFotografia] = useState();
  const [errorNombreCientifico, setErrorNombreCientifico] = useState("");
  const [errorNombreComun, setErrorNombreComun] = useState("");

  const usuario = JSON.parse(localStorage.getItem("user"));

  //  
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  const registrarPlanta = (event) => {
    event.preventDefault();

    if (
      errorNombreCientifico ||
      errorNombreComun ||
      !fotografia ||
      !nombreCientifico.trim() ||
      !nombreComun.trim()
    ) {
      alert("Por favor corrige los errores antes de enviar el formulario.");
      return;
    }

    const formattedDate = new Date(fecha).toISOString().split("T")[0];
    let fecha_registro = new Date().toISOString().slice(0, 19).replace("T", " ");

    const formData = new FormData();
    formData.append("nombre_cientifico", nombreCientifico);
    formData.append("nombre_comun", nombreComun);
    formData.append("taxon", taxon);
    formData.append("familia", Familia);
    formData.append("colector", Colector);
    formData.append("fecha", formattedDate);
    formData.append("fecha_registro", fecha_registro);
    formData.append("localidad", Localidad);
    formData.append("habitat", Habitat);
    formData.append("id_investigador", usuario.id_investigador);
    formData.append("fotografia", fotografia);

    Axios.post("http://localhost:4000/registrarplanta", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        alert("Planta registrada de forma exitosa");
        navigate("/plantas");
      })
      .catch((error) => {
        console.error("Hubo un error al registrar los datos:", error);
        alert("Error al registrar los datos");
      });
  };

  const nombreCientificoChange = (event) => {
    const nombre = event.target.value;
    setNombreCientifico(nombre);
    setErrorNombreCientifico(!nombre.trim() ? "El nombre científico es obligatorio." : "");
  };

  const nombreComunChange = (event) => {
    const nombre = event.target.value;
    setNombreComun(nombre);
    setErrorNombreComun(!nombre.trim() ? "El nombre común es obligatorio." : "");
  };

  return (
    <div className="editar-bg">
      <div className="editar-unoRG">
        <h1>Registrar planta</h1>

        <div className="nam-sub-ed">
          <h1 className="sub-ed">Url de la imagen</h1>
        </div>
        <input
          type="file"
          className="in-ep"
          onChange={(e) => setFotografia(e.target.files[0])}
        />

        <div className="nam-sub-ed">
          <h1 className="sub-ed">Nombre cientifico</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          onChange={nombreCientificoChange}
        />
        {errorNombreCientifico && (
          <p style={{ color: "red" }} className="error-msg">{errorNombreCientifico}</p>
        )}

        <div className="nam-sub-ed">
          <h1 className="sub-ed">Nombre común</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          onChange={nombreComunChange}
        />
        {errorNombreComun && (
          <p style={{ color: "red" }} className="error-msg">{errorNombreComun}</p>
        )}

        <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
        <input type="text" className="in-ep" onChange={(e) => setTaxon(e.target.value)} />

        <div className="nam-sub-ed"><h1 className="sub-ed">Familia</h1></div>
        <input type="text" className="in-ep" onChange={(e) => setFamilia(e.target.value)} />

        <div className="nam-sub-ed"><h1 className="sub-ed">Colector</h1></div>
        <input type="text" className="in-ep" onChange={(e) => setColector(e.target.value)} />

        <div className="nam-sub-ed"><h1 className="sub-ed">Fecha recolección</h1></div>
        <input type="date" className="in-ep" onChange={(e) => setFecha(e.target.value)} />

        <div className="nam-sub-ed"><h1 className="sub-ed">Localidad</h1></div>
        <input type="text" className="in-ep" onChange={(e) => setLocalidad(e.target.value)} />

        <div className="nam-sub-ed"><h1 className="sub-ed">Hábitat</h1></div>
        <input type="text" className="in-ep" onChange={(e) => setHabitat(e.target.value)} />

        <div className="contenedor-botones">
          <button className="boton-epRP" onClick={() => window.history.back()}>Cancelar</button>
          <button className="boton-epRP" onClick={registrarPlanta}>Registrar planta</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrarPlanta;
