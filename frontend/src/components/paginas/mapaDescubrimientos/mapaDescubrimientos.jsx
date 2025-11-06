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
                <button
                  onClick={() => eliminarComentario(c.id, id_descubrimiento)}
                >
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
        return (
          <Marker key={d.id} position={[d.latitud, d.longitud]} icon={icon}>
            <Popup>
              <div className="tarjeta">
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
                    {d.fecha
                      ? new Date(d.fecha).toLocaleDateString()
                      : "Desconocida"}
                    <br />
                    {d.nombre_cientifico && (
                      <>
                        <strong>Relación:</strong> {d.nombre_cientifico}
                        <br />
                      </>
                    )}
                  </div>
                </div>

                {/* 🔹 Botones de editar, eliminar y detalles */}
                <div
                  className="tarjeta-buttons"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "8px",
                    flexWrap: "wrap",
                  }}
                >
                 <Link to={`/detalles/${d.id}`} className="detalles-btn">🔍 Detalles</Link>

                  {sesionActiva && Number(usuario.id_investigador) === d.id_autor && (
                    <>
                      <Link to={`/descubrimiento/${d.id}`} className="edit-btn">✏️ Editar</Link>

                      <button className="delete-btn" onClick={() => eliminarDescubrimiento(d.id)}>🗑️ Eliminar</button>
                    </>
                  )}
                </div>



                {/* Sección de comentarios */}
                <div className="comentarios-section">
                  <h4>Comentarios</h4>

                  {/* Formulario para nuevo comentario */}
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
                      onChange={(e) =>
                        setEstado(d.id, { nuevo: e.target.value })
                      }
                    />

                    {/* 🔹 Mostrar debajo del campo a quién se responde o edita */}
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

                    {/* 🔹 Botón de cancelar debajo del botón guardar/publicar */}
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

                    {/* Mensaje emergente */}
                    {mensajeComentario && (
                      <div className="comentario-alerta publicar">
                        {mensajeComentario}
                      </div>
                    )}
                  </div>

                  {/* Comentarios reales */}
                  {comentarios[d.id] &&
                    renderComentarios(comentarios[d.id], d.id)}
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
