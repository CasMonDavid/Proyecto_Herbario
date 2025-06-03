import { useNavigate, Navigate } from "react-router-dom";
import React, { useState } from "react";
import "./registrarPlanta.css";
import Axios from "axios";

const RegistrarPlanta = () => {
  const navigate = useNavigate();

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
  const [errorFecha, setErrorFecha] = useState("");
  const [errorFotografia, setErrorFotografia] = useState("");
  const [errorCampos, setErrorCampos] = useState("");
  const [errorTaxon, setErrorTaxon] = useState("");
  const [errorFamilia, setErrorFamilia] = useState("");
  const [errorColector, setErrorColector] = useState("");
  const [errorLocalidad, setErrorLocalidad] = useState("");
  const [errorHabitat, setErrorHabitat] = useState("");

  const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  const usuario = JSON.parse(localStorage.getItem("user"));
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  const validarFotografia = (file) => {
    if (!file) return "Debe seleccionar una fotografía.";
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) return "Formato de imagen no válido (solo jpg, jpeg, png).";
    if (file.size > 5 * 1024 * 1024) return "La imagen no debe pesar más de 5MB.";
    return "";
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    const error = validarFotografia(file);
    setErrorFotografia(error);
    setFotografia(file);
  };

  const handleFechaChange = (e) => {
    const value = e.target.value;
    const hoy = new Date().toISOString().split("T")[0];
    if (!value) {
      setErrorFecha("La fecha es obligatoria.");
    } else if (value > hoy) {
      setErrorFecha("La fecha no puede ser futura.");
    } else {
      setErrorFecha("");
    }
    setFecha(value);
  };

  const nombreCientificoChange = (e) => {
    const valor = e.target.value;
    setNombreCientifico(valor);
    if (!valor.trim()) {
      setErrorNombreCientifico("El nombre científico es obligatorio.");
    } else if (!soloLetrasRegex.test(valor)) {
      setErrorNombreCientifico("Solo se permiten letras y espacios.");
    } else {
      setErrorNombreCientifico("");
    }
  };

  const nombreComunChange = (e) => {
    const valor = e.target.value;
    setNombreComun(valor);
    if (!valor.trim()) {
      setErrorNombreComun("El nombre común es obligatorio.");
    } else if (!soloLetrasRegex.test(valor)) {
      setErrorNombreComun("Solo se permiten letras y espacios.");
    } else {
      setErrorNombreComun("");
    }
  };

  const taxonChange = (e) => {
    const valor = e.target.value;
    setTaxon(valor);
    if (!valor.trim()) {
      setErrorTaxon("El taxon es obligatorio.");
    } else if (!soloLetrasRegex.test(valor)) {
      setErrorTaxon("Solo se permiten letras y espacios.");
    } else if (valor.length < 8 ) {
      setErrorTaxon("Debe ser de 8 caracteres");
    } else {
      setErrorTaxon("");
    }
  };

  const familiaChange = (e) => {
    const valor = e.target.value;
    setFamilia(valor);
    if (!soloLetrasRegex.test(valor)) {
      setErrorFamilia("Solo se permiten letras y espacios.");
    } else {
      setErrorFamilia("");
    }
  };

  const colectorChange = (e) => {
    const valor = e.target.value;
    setColector(valor);
    if (!soloLetrasRegex.test(valor)) {
      setErrorColector("Solo se permiten letras y espacios.");
    } else {
      setErrorColector("");
    }
  };

  const localidadChange = (e) => {
    const valor = e.target.value;
    setLocalidad(valor);
    if (!soloLetrasRegex.test(valor)) {
      setErrorLocalidad("Solo se permiten letras y espacios.");
    } else {
      setErrorLocalidad("");
    }
  };

  const habitatChange = (e) => {
    const valor = e.target.value;
    setHabitat(valor);
    if (!soloLetrasRegex.test(valor)) {
      setErrorHabitat("Solo se permiten letras y espacios.");
    } else {
      setErrorHabitat("");
    }
  };

  const registrarPlanta = (event) => {
    event.preventDefault();

    if (
      !nombreCientifico.trim() ||
      !nombreComun.trim() ||
      !taxon.trim() ||
      !Familia.trim() ||
      !Colector.trim() ||
      !fecha ||
      !Localidad.trim() ||
      !Habitat.trim()
    ) {
      setErrorCampos("Todos los campos son obligatorios.");
      return;
    } else {
      setErrorCampos("");
    }

    if (
      errorNombreCientifico ||
      errorNombreComun ||
      errorTaxon ||
      errorFamilia ||
      errorColector ||
      errorFecha ||
      errorFotografia ||
      errorLocalidad ||
      errorHabitat
    ) {
      alert("Corrige los errores antes de enviar el formulario.");
      return;
    }

    const formattedDate = new Date(fecha).toISOString().split("T")[0];
    const fecha_registro = new Date().toISOString().slice(0, 19).replace("T", " ");

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

  return (
    <div className="editar-bg">
      <div className="editar-unoRG">
        <h1>Registrar planta</h1>

        <div className="nam-sub-ed"><h1 className="sub-ed">Url de la imagen</h1></div>
        <input type="file" className="in-ep" onChange={handleFotoChange} />
        {errorFotografia && <p style={{ color: "red" }}>{errorFotografia}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Nombre científico</h1></div>
        <input type="text" className="in-ep" onChange={nombreCientificoChange} />
        {errorNombreCientifico && <p style={{ color: "red" }}>{errorNombreCientifico}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Nombre común</h1></div>
        <input type="text" className="in-ep" onChange={nombreComunChange} />
        {errorNombreComun && <p style={{ color: "red" }}>{errorNombreComun}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
        <input type="text" className="in-ep" onChange={taxonChange} />
        {errorTaxon && <p style={{ color: "red" }}>{errorTaxon}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Familia</h1></div>
        <input type="text" className="in-ep" onChange={familiaChange} />
        {errorFamilia && <p style={{ color: "red" }}>{errorFamilia}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Colector</h1></div>
        <input type="text" className="in-ep" onChange={colectorChange} />
        {errorColector && <p style={{ color: "red" }}>{errorColector}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Fecha recolección</h1></div>
        <input type="date" className="in-ep" onChange={handleFechaChange} />
        {errorFecha && <p style={{ color: "red" }}>{errorFecha}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Localidad</h1></div>
        <input type="text" className="in-ep" onChange={localidadChange} />
        {errorLocalidad && <p style={{ color: "red" }}>{errorLocalidad}</p>}

        <div className="nam-sub-ed"><h1 className="sub-ed">Hábitat</h1></div>
        <input type="text" className="in-ep" onChange={habitatChange} />
        {errorHabitat && <p style={{ color: "red" }}>{errorHabitat}</p>}

        {errorCampos && <p style={{ color: "red" }}>{errorCampos}</p>}

        <div className="contenedor-botones">
          <button className="boton-epRP" onClick={() => window.history.back()}>Cancelar</button>
          <button className="boton-epRP" onClick={registrarPlanta}>Registrar planta</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrarPlanta;
