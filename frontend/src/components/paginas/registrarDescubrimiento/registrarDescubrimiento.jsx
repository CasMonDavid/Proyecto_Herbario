import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const FormularioDescubrimiento = () => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        latitud: null,
        longitud: null,
        fotografia: null
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, fotografia: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.latitud || !form.longitud) {
            alert("Selecciona una ubicación en el mapa");
            return;
        }

        const data = new FormData();
        data.append("nombre", form.nombre);
        data.append("descripcion", form.descripcion);
        data.append("latitud", form.latitud);
        data.append("longitud", form.longitud);
        data.append("usuario_id", usuario.id_investigador);
        data.append("fotografia", form.fotografia);

        try {
            await axios.post("http://localhost:4000/descubrimientos/publicar", data);
            alert("Descubrimiento registrado");
        } catch (err) {
            console.error(err);
            alert("Error al registrar descubrimiento");
        }
    };

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setForm({
                    ...form,
                    latitud: e.latlng.lat,
                    longitud: e.latlng.lng
                });
            }
        });
        return null;
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: '500px',
                margin: '20px auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f9f9f9'
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Nuevo Descubrimiento</h2>

            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                }}
            />
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
                required
                rows={4}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    resize: 'vertical'
                }}
            />
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
                style={{ marginBottom: '15px' }}
            />

            <p style={{ marginBottom: '8px' }}>Selecciona la ubicación en el mapa:</p>
            <MapContainer
                center={[23.6345, -102.5528]}
                zoom={5}
                style={{ height: '300px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {form.latitud && form.longitud && (
                    <Marker position={[form.latitud, form.longitud]} icon={icon} />
                )}
            </MapContainer>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Registrar Descubrimiento
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Volver
                </button>
            </div>
        </form>
    );
};

export default FormularioDescubrimiento;
