import React, { useEffect, useState } from "react";
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
  const [mensajeComentario, setMensajeComentario] = useState(""); // mensaje emergente
  const [nuevoComentario, setNuevoComentario] = useState(""); // contenido del comentario
  const [modoEdicion, setModoEdicion] = useState(null); // id del comentario en edición
  const [respuestaA, setRespuestaA] = useState(null); // id del comentario a responder
  const usuario = JSON.parse(localStorage.getItem("user"));
  let sesionActiva = usuario ? true : false;

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

  // Funciones eliminarDescubrimiento, mostrarMensaje, recargarComentarios, publicarComentario, editarComentario, eliminarComentario
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
    if (!nuevoComentario.trim()) return;
    const esRespuesta = typeof respuestaA === "number";
    const data = { id_investigador: usuario.id_investigador };

    if (esRespuesta) {
      data.comentario = nuevoComentario;
      data.id_comentario_padre = respuestaA;
    } else {
      data.contenido = nuevoComentario;
      data.id_descubrimiento = id_descubrimiento;
    }

    try {
      await axios.post(
        "http://localhost:4000/descubrimiento/comentario/crear",
        data
      );
      mostrarMensaje(esRespuesta ? "responder" : "publicar");
      setNuevoComentario("");
      setRespuestaA(null);
      recargarComentarios(id_descubrimiento);
    } catch (error) {
      console.error("Error al publicar comentario:", error.response?.data || error);
      setMensajeComentario("Ocurrió un error al publicar el comentario.");
      setTimeout(() => setMensajeComentario(""), 3000);
    }
  };

  const editarComentario = async (id_comentario, id_descubrimiento) => {
    if (!nuevoComentario.trim()) return;
    try {
      await axios.put("http://localhost:4000/descubrimiento/comentario/actualizar", {
        id_comentario,
        id_investigador: usuario.id_investigador,
        contenido: nuevoComentario,
      });
      mostrarMensaje("editar");
      setNuevoComentario("");
      setModoEdicion(null);
      recargarComentarios(id_descubrimiento);
    } catch (error) {
      console.error("Error al editar comentario:", error);
      setMensajeComentario("Ocurrió un error al editar el comentario.");
      setTimeout(() => setMensajeComentario(""), 3000);
    }
  };

  const eliminarComentario = async (id_comentario, id_descubrimiento) => {
    const confirmar = window.confirm("¿Eliminar este comentario?");
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

  // Renderizado recursivo de comentarios
  // Dentro de renderComentarios:
const renderComentarios = (lista, id_descubrimiento) =>
  lista.map((c) => (
    <div key={c.id} className="comentario">
      {/* Mostrar alerta solo sobre el comentario que se va a responder */}
      {respuestaA === c.id && (
  <div className="comentario-alerta responder">
    Respondiendo al comentario #{c.id}
    <button className="botones-dirc" onClick={() => setRespuestaA(null)}>
      Cancelar
    </button>
  </div>
)}


      <div className="comentario-header">
        <strong>{c.autor}</strong> <span className="comentario-fecha">• reciente</span>
      </div>
      <div className="comentario-texto">{c.comentario}</div>
      {sesionActiva && (
        <div className="comentario-acciones">
          {c.id_investigador === usuario.id_investigador && (
            <>
              <button onClick={() => setModoEdicion(c.id)}>Editar</button>
              <button onClick={() => eliminarComentario(c.id, id_descubrimiento)}>Eliminar</button>
            </>
          )}
          <button onClick={() => setRespuestaA(c.id)}>Responder</button>
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
      {descubrimientos.map((d) => (
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
                  {d.fecha ? new Date(d.fecha).toLocaleDateString() : "Desconocida"}
                  <br />
                </div>
              </div>
              {sesionActiva && Number(usuario.id_investigador) === d.usuario_id && (
                <div className="tarjeta-buttons">
                  <button className="edit-btn">
                    <Link to={`/descubrimiento/${d.id}`} className="botones-dirc">
                      Editar
                    </Link>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => eliminarDescubrimiento(d.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}

              {/* Sección de comentarios */}
              <div className="comentarios-section">
                <h4>Comentarios</h4>

                {/* Formulario para nuevo comentario */}
                <div className="nuevo-comentario">
                  <input
                    type="text"
                    placeholder={
                      modoEdicion
                        ? "Editando comentario..."
                        : respuestaA
                        ? "Respondiendo comentario..."
                        : "Escribe un comentario..."
                    }
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      modoEdicion
                        ? editarComentario(modoEdicion, d.id)
                        : publicarComentario(d.id)
                    }
                  >
                    {modoEdicion ? "Guardar" : "Publicar"}
                  </button>

                  {/* Mensaje emergente */}
                  {mensajeComentario && (
                    <div className="comentario-alerta publicar">
                      {mensajeComentario}
                    </div>
                  )}
                </div>

                {/* Comentarios reales */}
                {comentarios[d.id] && renderComentarios(comentarios[d.id], d.id)}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaDescubrimientos;
