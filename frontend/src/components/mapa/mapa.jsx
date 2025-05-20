import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './mapa.css'

//
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Mapa = () => {
    return (
        <MapContainer center={[20.6597, -103.3496]} zoom={6} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[24.102626, -110.316013]}>
                <Popup>
                    Aquí se encontró una planta.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Mapa;