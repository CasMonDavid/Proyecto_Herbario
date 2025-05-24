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
    let sesionActiva = (usuario)? true : false ;

    useEffect(() => {
        axios.get("http://localhost:4000/descubrimientos")
        .then(res => setDescubrimientos(res.data))
        .catch(err => console.error("Error al cargar descubrimientos:", err));
    }, []);

    const eliminarDescubrimiento = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este descubrimiento?");
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`http://localhost:4000/descubrimientos/eliminar/${id}`, {
                method: 'DELETE',
            });

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
        <MapContainer center={[24.10273914855748, -110.3159221446148]} zoom={13} style={{ height: "90vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {descubrimientos.map(d => (
                <Marker key={d.id} position={[d.latitud, d.longitud]} icon={icon}>
                    <Popup>
                        <div class="tarjeta">
                            {d.fotografia && (
                                <img src={`http://localhost:4000/fotos/descubrimientos/${d.fotografia}`} alt="descubrimiento" width="100" />
                            )}
                            <div class="tarjeta-content">
                                <div class="tarjeta-title">{d.nombre}</div>
                                <div class="tarjeta-description">
                                    {d.descripcion}
                                </div>
                            </div>
                            { sesionActiva && Number(usuario.id_investigador) === d.usuario_id && (
                                <div class="tarjeta-buttons">
                                    <button class="edit-btn">
                                        <Link to={`/descubrimiento/${d.id}`} className="botones-dirc" >Editar</Link>
                                    </button>
                                    <button class="delete-btn" onClick={() => eliminarDescubrimiento(d.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            ) }
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapaDescubrimientos;
