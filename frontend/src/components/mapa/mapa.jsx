import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
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
        <div className="mapa">
            <MapContainer center={[24.102769955203822, -110.3160343719642]} zoom={13} className="mapa-img">
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[24.102626, -110.316013]}>
                    <Popup>
                        Aquí se encontró un girasol.
                    </Popup>
                </Marker>
                <Marker position={[24.130677, -110.296301]}>
                    <Popup>
                        Aquí se encontró un palo de arco.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Mapa;