import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const FormularioDescubrimiento = () => {
    const usuario = JSON.parse(localStorage.getItem("user"));

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
        <form onSubmit={handleSubmit}>
        <h2>Nuevo Descubrimiento</h2>

        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} accept="image/*" required />

        <p>Selecciona la ubicación en el mapa:</p>
        <MapContainer center={[23.6345, -102.5528]} zoom={5} style={{ height: '300px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            {form.latitud && form.longitud && (
            <Marker position={[form.latitud, form.longitud]} />
            )}
        </MapContainer>

        <button type="submit">Registrar Descubrimiento</button>
        </form>
    );
};

export default FormularioDescubrimiento;
