import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./editar.css";
import Axios from "axios";

const Editar = () => {
  const { id } = useParams();
  const baseUrl = "http://localhost:4000";

  // Estados para los campos
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreComun, setNombreComun] = useState("");
  const [taxon, setTaxon] = useState("");
  const [familia, setFamilia] = useState("");
  const [colector, setColector] = useState("");
  const [fecha, setFecha] = useState(""); // fecha_recoleccion
  const [fechaRegistro, setFechaRegistro] = useState(""); // solo lectura
  const [localidad, setLocalidad] = useState("");
  const [habitat, setHabitat] = useState("");
  const [fotografia, setFotografia] = useState("");
  const [nuevaFoto, setNuevaFoto] = useState(null);
  const [idInvestigador, setIdInvestigador] = useState("");

  // Cargar datos al montar
  useEffect(() => {
    Axios.get(`${baseUrl}/informacion/${id}`)
      .then(({ data }) => {
        setNombreCientifico(data.nombre_cientifico || "");
        setNombreComun(data.nombre_comun || "");
        setTaxon(data.taxon || "");
        setFamilia(data.familia || "");
        setColector(data.colector || "");
        setFecha(data.fecha_recoleccion || "");
        // Convertimos datetime a 'YYYY-MM-DD HH:mm:ss'
        setFechaRegistro(
          data.fecha_registro?.replace("T", " ").slice(0, 19) || ""
        );
        setLocalidad(data.localidad || "");
        setHabitat(data.habitat || "");
        setFotografia(data.fotografia || "");
        setIdInvestigador(data.id_investigador || "");
      })
      .catch((err) => console.error("Error al cargar planta:", err));
  }, [id]);

  // Enviar actualización
  const handleSubmit = (event) => {
    event.preventDefault();

    // construyes formData como antes...
    const formData = new FormData();
    formData.append("nombre_cientifico", nombreCientifico);
    formData.append("nombre_comun", nombreComun);
    formData.append("taxon", taxon);
    formData.append("familia", familia);
    formData.append("colector", colector);
    formData.append("fecha", fecha);
    formData.append("localidad", localidad);
    formData.append("habitat", habitat);
    formData.append("id_investigador", idInvestigador);
    nuevaFoto
      ? formData.append("fotografia", nuevaFoto)
      : formData.append("fotografia", fotografia);

    // ————————————————
    // **Aquí añadimos el log**
    console.log("==== Contenido del FormData ====");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log("================================");

    Axios.put(`${baseUrl}/editar/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => alert("Planta actualizada de forma correcta"))
      .catch((error) => {
        console.error("Error al actualizar:", error.response?.data || error);
        alert("Error Faltan campos por llenar");
      });
  };

  return (
    <form className="editar-bg" onSubmit={handleSubmit}>
      <div className="editar-uno">
        {fotografia && (
          <img
            src={`${baseUrl}/${fotografia}`}
            alt="Fotografía de la planta"
            className="imgn-edr"
          />
        )}
        <input
          type="file"
          className="in-ep"
          accept="image/*"
          onChange={(e) => setNuevaFoto(e.target.files[0])}
        />

        <label>Nombre científico</label>
        <input
          type="text"
          className="in-ep"
          value={nombreCientifico}
          onChange={(e) => setNombreCientifico(e.target.value)}
        />

        <label>Nombre común</label>
        <input
          type="text"
          className="in-ep"
          value={nombreComun}
          onChange={(e) => setNombreComun(e.target.value)}
        />
      </div>

      <div className="editar-dos">
        <label>ID Planta</label>
        <input type="text" className="in-ep" value={id} readOnly />

        <label>Taxon</label>
        <input
          type="text"
          className="in-ep"
          value={taxon}
          onChange={(e) => setTaxon(e.target.value)}
        />

        <label>Familia</label>
        <input
          type="text"
          className="in-ep"
          value={familia}
          onChange={(e) => setFamilia(e.target.value)}
        />

        <label>Colector</label>
        <input
          type="text"
          className="in-ep"
          value={colector}
          onChange={(e) => setColector(e.target.value)}
        />

        <label>Fecha de recolección</label>
        <input
          type="date"
          className="in-ep"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <label>Fecha de registro</label>
        <input type="text" className="in-ep" value={fechaRegistro} readOnly />

        <label>Localidad</label>
        <input
          type="text"
          className="in-ep"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
        />

        <label>Hábitat</label>
        <input
          type="text"
          className="in-ep"
          value={habitat}
          onChange={(e) => setHabitat(e.target.value)}
        />

        <label>ID Investigador</label>
        <input
          type="text"
          className="in-ep"
          value={idInvestigador}
          onChange={(e) => {
            const soloNumeros = e.target.value.replace(/\D/g, ""); // elimina todo lo que no sea dígito
            setIdInvestigador(soloNumeros);
          }}
        />

        <div className="botones">
          <button type="button" onClick={() => window.history.back()}>
            Cancelar
          </button>
          <button type="submit">Guardar</button>
        </div>
      </div>
    </form>
  );
};

export default Editar;
