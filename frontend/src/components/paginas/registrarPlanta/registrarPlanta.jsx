import React, { useState } from "react";
import "./registrarPlanta.css";
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app

const RegistrarPlanta = () => {
  const [numeroCatalogo, setNumeroCatalogo] = useState(0);
  const [idOcurrencia, setIdOcurrencia] = useState("");
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [fecha, setFecha] = useState("");
  const [nombreComun, setNombreComun] = useState("");
  const [taxon, setTaxon] = useState("");
  const [idFamilia, setIdFamilia] = useState(0);
  const [idColector, setIdColector] = useState(0);
  const [idLocalidad, setIdLocalidad] = useState(0);
  const [idHabitat, setIdHabitat] = useState(0);
  const [fotografia, setFotografia] = useState();
  const [idInvestigador, setIdInvestigador] = useState(0);

  const registrarPlanta = (event) => {
    event.preventDefault();

    if (
      errorNumeroCatalogo ||
      !numeroCatalogo.trim() ||
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

    const formData = new FormData();
    formData.append("numero_catalogo", numeroCatalogo);
    formData.append("id_ocurrencia", idOcurrencia);
    formData.append("nombre_cientifico", nombreCientifico);
    formData.append("nombre_comun", nombreComun);
    formData.append("taxon", taxon);
    formData.append("id_familia", idFamilia);
    formData.append("id_colector", idColector);
    formData.append("fecha", formattedDate);
    formData.append("id_localidad", idLocalidad);
    formData.append("id_habitat", idHabitat);
    formData.append("id_investigador", idInvestigador);
    formData.append("fotografia", fotografia); // <-- Aquí se manda el archivo

    Axios.post("http://localhost:4000/registrarplanta", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        alert("Planta registrada de forma exitosa");
      })
      .catch((error) => {
        console.error("Hubo un error al registrar los datos:", error);
        alert("Error al registrar los datos");
      });
  };

  const [errorNombreCientifico, setErrorNombreCientifico] = useState("");
  const [errorNombreComun, setErrorNombreComun] = useState("");
  const [errorNumeroCatalogo, setErrorNumeroCatalogo] = useState("");

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

  const numeroCatalogoChange = (event) => {
    const valor = event.target.value;
    setNumeroCatalogo(valor);

    if (!valor.trim()) {
      setErrorNumeroCatalogo("El número de catálogo es obligatorio.");
    } else if (!/^\d+$/.test(valor)) {
      setErrorNumeroCatalogo("Solo se permiten números.");
    } else {
      setErrorNumeroCatalogo("");
    }
  };

  const idOcurrenciaChange = (event) => {
    setIdOcurrencia(event.target.value);
  };

  const taxonChange = (event) => {
    setTaxon(event.target.value);
  };
  const idFamiliaChange = (event) => {
    setIdFamilia(event.target.value);
  };
  const idColectorChange = (event) => {
    setIdColector(event.target.value);
  };
  const fechaChange = (event) => {
    setFecha(event.target.value);
  };
  const idLocalidadChange = (event) => {
    setIdLocalidad(event.target.value);
  };
  const idHabitatChange = (event) => {
    setIdHabitat(event.target.value);
  };
  const fotografiaChange = (event) => {
        setFotografia(event.target.value);
    };
  const idInvestigadorChange = (event) => {
    setIdInvestigador(event.target.value);
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
          <h1 className="sub-ed">Número de catalogo</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Número de catalogo"
          onChange={numeroCatalogoChange}
        />
        {errorNumeroCatalogo && (
          <p style={{ color: "red", marginTop: "5px" }} className="error-msg">
            {errorNumeroCatalogo}
          </p>
        )}

        <div className="nam-sub-ed">
          <h1 className="sub-ed">Id concurrencia</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Id concurrencia"
          onChange={idOcurrenciaChange}
        />
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
          <h1 className="sub-ed">Id familia</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Id familia"
          onChange={idFamiliaChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Id colector</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Id colector"
          onChange={idColectorChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Fecha recoleccion</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="AAAA-MM-AA"
          onChange={fechaChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Id localidad</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Id localidad"
          onChange={idLocalidadChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Id habitad</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Id habitad"
          onChange={idHabitatChange}
        />
        <div className="nam-sub-ed">
          <h1 className="sub-ed">Id investigador</h1>
        </div>
        <input
          type="text"
          className="in-ep"
          placeholder="Id investigador"
          onChange={idInvestigadorChange}
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
