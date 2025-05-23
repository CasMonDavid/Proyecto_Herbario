import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

  useEffect(() => {
    axios.get("http://localhost:4000/descubrimientos")
      .then(res => setDescubrimientos(res.data))
      .catch(err => console.error("Error al cargar descubrimientos:", err));
  }, []);

  return (
    <MapContainer center={[23.6345, -102.5528]} zoom={5} style={{ height: "90vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {descubrimientos.map(d => (
        <Marker key={d.id} position={[d.latitud, d.longitud]} icon={icon}>
          <Popup>
            <strong>{d.nombre}</strong><br />
            {d.descripcion}<br />
            {d.fotografia && (
              <img src={`http://localhost:4000/uploads/descubrimientos/${d.fotografia}`} alt="descubrimiento" width="100" />
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaDescubrimientos;
