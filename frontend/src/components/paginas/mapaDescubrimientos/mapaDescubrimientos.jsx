import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./mapaDescubrimientos.css";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapaDescubrimientos = () => {
  const [descubrimientos, setDescubrimientos] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [mensajeComentario, setMensajeComentario] = useState("");
  const [estadoComentarios, setEstadoComentarios] = useState({});
  const [plantaDetalles, setPlantaDetalles] = useState({});
  const [tarjetaActiva, setTarjetaActiva] = useState(null); // 🔹 Guarda el id de la tarjeta volteada
  const usuario = JSON.parse(localStorage.getItem("user"));
  let sesionActiva = usuario ? true : false;
  const inputRef = useRef(null);

  const getEstado = (id) =>
    estadoComentarios[id] || { nuevo: "", modoEdicion: null, respuestaA: null };

  const setEstado = (id, nuevoEstado) => {
    setEstadoComentarios((prev) => ({
      ...prev,
      [id]: { ...getEstado(id), ...nuevoEstado },
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/descubrimientos")
      .then((res) => setDescubrimientos(res.data))
      .catch((err) => console.error("Error al cargar descubrimientos:", err));
  }, []);

  useEffect(() => {
    const cargarTodosLosComentarios = async () => {
      for (const d of descubrimientos) {
        await recargarComentarios(d.id);
      }
    };
    if (descubrimientos.length > 0) {
      cargarTodosLosComentarios();
    }
  }, [descubrimientos]);

  const cargarDetallesPlanta = async (idDescubrimiento, idPlanta) => {
    try {
      if (!idPlanta) {
        setPlantaDetalles((prev) => ({
          ...prev,
          [idDescubrimiento]: null,
        }));
        return;
      }

      const plantaId = Number(idPlanta);
      if (isNaN(plantaId)) {
        console.warn("⚠️ id_planta inválido para el descubrimiento:", idDescubrimiento);
        return;
      }

      const res = await axios.get(`http://localhost:4000/informacion/${plantaId}`);
      setPlantaDetalles((prev) => ({
        ...prev,
        [idDescubrimiento]: res.data,
      }));
    } catch (err) {
      console.error("Error al cargar detalles de planta:", err.response?.data || err);
      setPlantaDetalles((prev) => ({
        ...prev,
        [idDescubrimiento]: null,
      }));
    }
  };

  const toggleTarjeta = (id, idPlanta) => {
  if (tarjetaActiva === id) {
    setTarjetaActiva(null);
  } else {
    setTarjetaActiva(id);
    // Si no hay relación, ponemos null para que se muestre "Sin detalles"
    cargarDetallesPlanta(id, idPlanta || null);
  }
};


  const eliminarDescubrimiento = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este descubrimiento?"
    );
    if (!confirmar) return;

    try {
      const respuesta = await fetch(
        `http://localhost:4000/descubrimientos/eliminar/${id}`,
        { method: "DELETE" }
      );
      if (respuesta.ok) {
        alert("Descubrimiento eliminado correctamente");
        setDescubrimientos((prev) => prev.filter((d) => d.id !== id));
      } else {
        alert("Error al eliminar el descubrimiento");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar eliminar");
    }
  };

  const mostrarMensaje = (tipo) => {
    switch (tipo) {
      case "publicar":
        setMensajeComentario("Comentario publicado correctamente.");
        break;
      case "editar":
        setMensajeComentario("Comentario editado exitosamente.");
        break;
      case "responder":
        setMensajeComentario("Respuesta agregada correctamente.");
        break;
      case "eliminar":
        setMensajeComentario("Comentario eliminado.");
        break;
      default:
        setMensajeComentario("");
    }
    setTimeout(() => {
      setMensajeComentario("");
    }, 3000);
  };

  const recargarComentarios = async (id) => {
    const res = await axios.get(
      `http://localhost:4000/descubrimiento/comentario/getbyiddescubrimiento/${id}`
    );
    setComentarios((prev) => ({
      ...prev,
      [id]: Array.isArray(res.data) ? res.data : [],
    }));
  };

  const publicarComentario = async (id_descubrimiento) => {
    const estado = getEstado(id_descubrimiento);
    if (!estado.nuevo.trim()) return;

    const esRespuesta = typeof estado.respuestaA === "number";

    const data = {
      contenido: estado.nuevo,
      id_investigador: usuario.id_investigador,
      id_objetivo: esRespuesta ? estado.respuestaA : id_descubrimiento,
      tipo: esRespuesta ? "comentario" : "descubrimiento",
    };

    try {
      await axios.post(
        "http://localhost:4000/descubrimiento/comentario/crear",
        data
      );
      mostrarMensaje(esRespuesta ? "responder" : "publicar");
      setEstado(id_descubrimiento, {
        nuevo: "",
        respuestaA: null,
        modoEdicion: null,
      });
      recargarComentarios(id_descubrimiento);
    } catch (error) {
      console.error("Error al publicar comentario:", error.response?.data || error);
      setMensajeComentario("Ocurrió un error al publicar el comentario.");
      setTimeout(() => setMensajeComentario(""), 3000);
    }
  };

  const editarComentario = async (id_comentario, id_descubrimiento) => {
    const estado = getEstado(id_descubrimiento);
    if (!estado.nuevo.trim()) return;
    try {
      await axios.put(
        "http://localhost:4000/descubrimiento/comentario/actualizar",
        {
          id_comentario,
          id_investigador: usuario.id_investigador,
          contenido: estado.nuevo,
        }
      );
      mostrarMensaje("editar");
      setEstado(id_descubrimiento, {
        nuevo: "",
        modoEdicion: null,
        respuestaA: null,
      });
      recargarComentarios(id_descubrimiento);
    } catch (error) {
      console.error("Error al editar comentario:", error);
      setMensajeComentario("Ocurrió un error al editar el comentario.");
      setTimeout(() => setMensajeComentario(""), 3000);
    }
  };

  const eliminarComentario = async (id_comentario, id_descubrimiento) => {
    const listaComentarios = comentarios[id_descubrimiento] || [];
    const comentarioPadre = listaComentarios.find((c) => c.id === id_comentario);
    const tieneRespuestas = comentarioPadre?.respuestas?.length > 0;
    const mensajeConfirmacion = tieneRespuestas
      ? "⚠️ Si lo eliminas, también se eliminarán sus subcomentarios. ¿Deseas continuar?"
      : "¿Eliminar este comentario?";
    const confirmar = window.confirm(mensajeConfirmacion);
    if (!confirmar) return;

    try {
      await axios.delete("http://localhost:4000/descubrimiento/comentario/eliminar", {
        data: { id_comentario, id_investigador: usuario.id_investigador },
      });
      mostrarMensaje("eliminar");
      recargarComentarios(id_descubrimiento);
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      setMensajeComentario("Ocurrió un error al eliminar el comentario.");
      setTimeout(() => setMensajeComentario(""), 3000);
    }
  };

  const renderComentarios = (lista, id_descubrimiento) =>
    lista.map((c) => (
      <div key={c.id} className="comentario">
        <div className="comentario-header">
          <strong>{c.autor}</strong>{" "}
          <span className="comentario-fecha">• reciente</span>
        </div>
        <div className="comentario-texto">{c.comentario}</div>
        {sesionActiva && (
          <div className="comentario-acciones">
            {c.id_autor === usuario.id_investigador && (
              <>
                <button
                  onClick={() => {
                    const estadoActual = getEstado(id_descubrimiento);
                    if (estadoActual.modoEdicion === c.id) {
                      setEstado(id_descubrimiento, { modoEdicion: null, nuevo: "" });
                    } else {
                      setEstado(id_descubrimiento, {
                        modoEdicion: c.id,
                        respuestaA: null,
                        nuevo: c.comentario,
                      });
                      setTimeout(() => {
                        inputRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        inputRef.current?.focus();
                      }, 100);
                    }
                  }}
                >
                  Editar
                </button>
                <button onClick={() => eliminarComentario(c.id, id_descubrimiento)}>
                  Eliminar
                </button>
              </>
            )}
            <button
              onClick={() => {
                const estadoActual = getEstado(id_descubrimiento);
                if (estadoActual.respuestaA === c.id) {
                  setEstado(id_descubrimiento, { respuestaA: null, nuevo: "" });
                } else {
                  setEstado(id_descubrimiento, {
                    respuestaA: c.id,
                    modoEdicion: null,
                    nuevo: "",
                  });
                  setTimeout(() => {
                    inputRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    inputRef.current?.focus();
                  }, 100);
                }
              }}
            >
              Responder
            </button>
          </div>
        )}
        {c.respuestas && c.respuestas.length > 0 && (
          <div className="subcomentario">
            {renderComentarios(c.respuestas, id_descubrimiento)}
          </div>
        )}
      </div>
    ));

  return (
    <MapContainer
      center={[24.10273914855748, -110.3159221446148]}
      zoom={13}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {descubrimientos.map((d) => {
        const estado = getEstado(d.id);
        const detallesPlanta = plantaDetalles[d.id];
        return (
          <Marker key={d.id} position={[d.latitud, d.longitud]} icon={icon}>
            <Popup>
              <div
                className={`tarjeta-container ${tarjetaActiva === d.id ? "flipped" : ""}`}
              >
                {/* 🔹 Cara frontal */}
                <div className="tarjeta-front tarjeta">
                  {d.fotografia && (
                    <img
                      src={`http://localhost:4000/fotos/descubrimientos/${d.fotografia}`}
                      alt="descubrimiento"
                      width="100"
                    />
                  )}
                  <div className="tarjeta-content">
                    <div className="tarjeta-title">{d.nombre}</div>
                    <div className="tarjeta-description">
                      {d.descripcion}
                      <br />
                      <strong>Fecha de descubrimiento:</strong>{" "}
                      {d.fecha ? new Date(d.fecha).toLocaleDateString() : "Desconocida"}
                      <br />
                      {d.nombre_cientifico && (
                        <>
                          <strong>Relación:</strong> {d.nombre_cientifico}
                          <br />
                        </>
                      )}
                    </div>
                  </div>

                  {/* 🔹 Botones */}
                  <div
                    className="tarjeta-buttons"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "6px",
                      marginTop: "0px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className="detalles-btn"
                      onClick={() => toggleTarjeta(d.id, d.relacion)}
                      
                    >
                      🔍 Detalles
                    </button>

                    {sesionActiva && Number(usuario.id_investigador) === d.id_autor && (
                      <>
                        <Link to={`/descubrimiento/${d.id}`} className="edit-btn">
                          ✏️ Editar
                        </Link>
                        <button
                          className="delete-btn"
                          onClick={() => eliminarDescubrimiento(d.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </>
                    )}
                  </div>

                  {/* Comentarios */}
                  <div className="comentarios-section">
                    <h4>Comentarios</h4>
                    <div className="nuevo-comentario">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder={
                          estado.modoEdicion
                            ? "Editando comentario..."
                            : estado.respuestaA
                            ? "Respondiendo comentario..."
                            : "Escribe un comentario..."
                        }
                        value={estado.nuevo}
                        onChange={(e) => setEstado(d.id, { nuevo: e.target.value })}
                      />

                      {(estado.modoEdicion || estado.respuestaA) && (
                        <div
                          className="comentario-alerta"
                          style={{
                            marginTop: "6px",
                            fontSize: "0.9em",
                            color: "#bfa200ff",
                          }}
                        >
                          {estado.modoEdicion
                            ? `✏️ Editando comentario`
                            : `🟡 Respondiendo a: ${
                                Object.values(comentarios)
                                  .flat()
                                  .find((c) => c.id === estado.respuestaA)
                                  ?.autor || "Desconocido"
                              }`}
                        </div>
                      )}

                      <button
                        onClick={() =>
                          estado.modoEdicion
                            ? editarComentario(estado.modoEdicion, d.id)
                            : publicarComentario(d.id)
                        }
                      >
                        {estado.modoEdicion ? "Guardar" : "Publicar"}
                      </button>

                      {(estado.modoEdicion || estado.respuestaA) && (
                        <button
                          className="botones-dirc"
                          style={{
                            display: "block",
                            marginTop: "8px",
                            backgroundColor: "#ccc",
                            color: "#000",
                          }}
                          onClick={() =>
                            setEstado(d.id, {
                              modoEdicion: null,
                              respuestaA: null,
                              nuevo: "",
                            })
                          }
                        >
                          Cancelar
                        </button>
                      )}

                      {mensajeComentario && (
                        <div className="comentario-alerta publicar">
                          {mensajeComentario}
                        </div>
                      )}
                    </div>

                    {comentarios[d.id] && renderComentarios(comentarios[d.id], d.id)}
                  </div>
                </div>

                {/* 🔹 Cara trasera */}
<div
  className="tarjeta-back tarjeta"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",  // alineación izquierda
    textAlign: "left",
    gap: "2px",              // menor espacio entre líneas
    padding: "10px",
  }}
>
  {detallesPlanta ? (
    <>
      {detallesPlanta.fotografia && (
        <img
          src={`http://localhost:4000/${detallesPlanta.fotografia.replace("\\", "/")}`}
          alt="planta"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "8px",
          }}
        />
      )}

      <h3 style={{ margin: "4px 0", textAlign: "center" }}>
        {detallesPlanta.nombre_cientifico}
      </h3>

      <p style={{ margin: "6px 0" }}><strong>Nombre común:</strong> {detallesPlanta.nombre_comun}</p>
      <p style={{ margin: "6px 0" }}><strong>Familia:</strong> {detallesPlanta.familia}</p>
      <p style={{ margin: "6px 0" }}><strong>Taxón:</strong> {detallesPlanta.taxon}</p>
      <p style={{ margin: "6px 0" }}><strong>Colector:</strong> {detallesPlanta.colector}</p>
      <p style={{ margin: "6px 0" }}><strong>Localidad:</strong> {detallesPlanta.localidad}</p>
      <p style={{ margin: "6px 0" }}><strong>Hábitat:</strong> {detallesPlanta.habitat}</p>
      <p style={{ margin: "6px 0" }}><strong>Investigador:</strong> {detallesPlanta.nombre_investigador}</p>

      <button
        style={{
          backgroundColor: "#78B578",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "10px",
          marginTop: "60px",   // suficiente separación sin empujar
          alignSelf: "center",
          cursor: "pointer",
          width: "85%",
        }}
        onClick={() => setTarjetaActiva(null)}
      >
        Volver
      </button>
    </>
  ) : (
    <>
      <p><strong>Sin detalles</strong></p>
     <button
        style={{
          backgroundColor: "#78B578",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "10px",
          marginTop: "auto",   // suficiente separación sin empujar
          alignSelf: "center",
          cursor: "pointer",
          width: "85%",
        }}
        onClick={() => setTarjetaActiva(null)}
      >
        Volver
      </button>
    </>
  )}
</div>

              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapaDescubrimientos;
