import React, { useState } from "react";
import "./registrarPlanta.css";
import Axios from "axios";
import { Navigate } from "react-router-dom";

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app


const RegistrarPlanta = () => {
  const navigate = useNavigate();
  let usuario =  JSON.parse(localStorage.getItem("user"));

  if (!usuario){
    return < Navigate to="/" replace />
  }

  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreComun, setNombreComun] = useState("");
  const [fecha, setFecha] = useState("");
  const [taxon, setTaxon] = useState("");
  const [Familia, setFamilia] = useState("");
  const [Colector, setColector] = useState("");
  const [Localidad, setLocalidad] = useState("");
  const [Habitat, setHabitat] = useState("");
  const [fotografia, setFotografia] = useState();

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
    let fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');;

    const formData = new FormData();
    formData.append("nombre_cientifico", nombreCientifico);
    formData.append("nombre_comun", nombreComun);
    formData.append("taxon", taxon);
    formData.append("familia", Familia);
    formData.append("colector", Colector);
    formData.append("fecha", formattedDate);
    formData.append("fecha_registro",fecha_registro);
    formData.append("localidad", Localidad);
    formData.append("habitat", Habitat);
    formData.append("id_investigador", usuario.id_investigador);
    formData.append("fotografia", fotografia); // <-- Aquí se manda el archivo

    Axios.post("http://localhost:4000/registrarplanta", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        alert("Planta registrada de forma exitosa");
        navigate("/");
      })
      .catch((error) => {
        console.error("Hubo un error al registrar los datos:", error);
        alert("Error al registrar los datos");
      });
  };

  const [errorNombreCientifico, setErrorNombreCientifico] = useState("");
  const [errorNombreComun, setErrorNombreComun] = useState("");

  /*const fotografiaChange = (event) => {
    const value = event.target.value;
    setFotografia(value);

    try {
      new URL(value);
      setErrorUrl(""); // URL válida
    } catch (_) {
      setErrorUrl("La URL ingresada no es válida.");
    }
  };*/

  const nombreCientificoChange = (event) => {
    const nombre = event.target.value;
    setNombreCientifico(nombre);

    if (!nombre.trim()) {
      setErrorNombreCientifico("El nombre científico es obligatorio.");
    } else {
      setErrorNombreCientifico("");
    }
  };

  const nombreComunChange = (event) => {
    const nombre = event.target.value;
    setNombreComun(nombre);

    if (!nombre.trim()) {
      setErrorNombreComun("El nombre común es obligatorio.");
    } else {
      setErrorNombreComun("");
    }
  };

  const taxonChange = (event) => {
    setTaxon(event.target.value);
  };
  const FamiliaChange = (event) => {
    setFamilia(event.target.value);
  };
  const ColectorChange = (event) => {
    setColector(event.target.value);
  };
  const fechaChange = (event) => {
    setFecha(event.target.value);
  };
  const LocalidadChange = (event) => {
    setLocalidad(event.target.value);
  };
  const HabitatChange = (event) => {
    setHabitat(event.target.value);
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
          placeholder="URL de la imagen"
          onChange= {(e) => setFotografia(e.target.files[0])}
        />

        <div className="nam-sub-ed">
          <h1 className="sub-ed">Nombre cientifico</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Nombre cientifico"
          onChange={nombreCientificoChange}
        />
        {errorNombreCientifico && (
          <p style={{ color: "red", marginTop: "5px" }} className="error-msg">
            {errorNombreCientifico}
          </p>
        )}

        <div className="nam-sub-ed">
          <h1 className="sub-ed">Nombre común</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Nombre común"
          onChange={nombreComunChange}
        />
        {errorNombreComun && (
          <p style={{ color: "red", marginTop: "5px" }} className="error-msg">
            {errorNombreComun}
          </p>
        )}

        <div className="nam-sub-ed">
          <h1 className="sub-ed">Taxon</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Taxon"
          onChange={taxonChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Familia</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Familia"
          onChange={FamiliaChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Colector</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Colector"
          onChange={ColectorChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Fecha recoleccion</h1>
        </div>
        <input
          type="date"
          className="in-ep"
          placeholder="AAAA-MM-AA"
          onChange={fechaChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Localidad</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Localidad"
          onChange={LocalidadChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Habitad</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Habitad"
          onChange={HabitatChange}
        />

        <div className="contenedor-botones">
          <button className="boton-epRP" onClick={() => window.history.back()}>
            Cancelar
          </button>
          <button className="boton-epRP" onClick={registrarPlanta}>
            Registrar planta
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrarPlanta;
