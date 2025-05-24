import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapaDescubrimientos = () => {
    const [descubrimientos, setDescubrimientos] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get("http://localhost:4000/descubrimientos")
        .then(res => setDescubrimientos(res.data))
        .catch(err => console.error("Error al cargar descubrimientos:", err));
    }, []);

    return (
        <MapContainer center={[24.10273914855748, -110.3159221446148]} zoom={13} style={{ height: "90vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {descubrimientos.map(d => (
                <Marker key={d.id} position={[d.latitud, d.longitud]} icon={icon}>
                    <Popup>
                        <strong>{d.nombre}</strong><br />
                        {d.descripcion}<br />
                        {d.fotografia && (
                        <img src={`http://localhost:4000/fotos/descubrimientos/${d.fotografia}`} alt="descubrimiento" width="100" />
                        )}
                        <button>
                            <Link to={`/descubrimiento/${d.id}`} >Editar</Link>
                        </button>
                        <button>
                            <Link to='/' >Eliminar</Link>
                        </button>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapaDescubrimientos;
