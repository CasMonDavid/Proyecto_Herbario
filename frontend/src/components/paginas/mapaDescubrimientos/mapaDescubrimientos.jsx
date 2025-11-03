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
  const usuario = JSON.parse(localStorage.getItem("user"));
  let sesionActiva = usuario ? true : false;

  useEffect(() => {
    axios
      .get("http://localhost:4000/descubrimientos")
      .then((res) => setDescubrimientos(res.data))
      .catch((err) => console.error("Error al cargar descubrimientos:", err));
  }, []);

  const eliminarDescubrimiento = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este descubrimiento?"
    );
    if (!confirmar) return;

    try {
      const respuesta = await fetch(
        `http://localhost:4000/descubrimientos/eliminar/${id}`,
        {
          method: "DELETE",
        }
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
                  {d.fecha
                    ? new Date(d.fecha).toLocaleDateString()
                    : "Desconocida"}
                  <br />
                </div>
              </div>
              {sesionActiva &&
                Number(usuario.id_investigador) === d.usuario_id && (
                  <div className="tarjeta-buttons">
                    <button className="edit-btn">
                      <Link
                        to={`/descubrimiento/${d.id}`}
                        className="botones-dirc"
                      >
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
                  <input type="text" placeholder="Escribe un comentario..." />
                  <button>Publicar</button>
                </div>

                {/* Comentario ejemplo */}
                <div className="comentario">
                  <div className="comentario-header">
                    <strong>Juan Pérez</strong>{" "}
                    <span className="comentario-fecha">• 2 nov 2025</span>
                  </div>
                  <div className="comentario-texto">
                    Esta planta es muy común en la zona norte de La Paz.
                  </div>
                  <div className="comentario-acciones">
                    <button>Editar</button>
                    <button>Eliminar</button>
                    <button>Responder</button>
                  </div>

                  {/* Subcomentario ejemplo */}
                  <div className="subcomentario">
                    <div className="comentario-header">
                      <strong>Carlos</strong>{" "}
                      <span className="comentario-fecha">• 2 nov 2025</span>
                    </div>
                    <div className="comentario-texto">
                      ¡Exacto! También la he visto cerca del campus UABCS.
                    </div>
                    <div className="comentario-acciones">
                      <button>Editar</button>
                      <button>Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaDescubrimientos;