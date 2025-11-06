import React, { useState, useEffect } from 'react';
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
        fotografia: null,
        id_planta: '' // 🔹 Nuevo campo para la planta seleccionada
    });

    const [plantas, setPlantas] = useState([]); // 🔹 Guardará las plantas desde el backend

    // 🔹 Cargar plantas al montar
    useEffect(() => {
        const fetchPlantas = async () => {
            try {
                const res = await axios.get("http://localhost:4000/plantas/getall");
                setPlantas(res.data);
            } catch (err) {
                console.error("Error al cargar plantas:", err);
            }
        };
        fetchPlantas();
    }, []);

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

        // 🔹 El backend espera el campo "relacion", no "id_planta"
        // 🔹 Si el usuario elige "ninguna", mandamos un string vacío
        // 🔹 En handleSubmit
// Nuevo
if (!(form.id_planta === "ninguna" || form.id_planta === "" || form.id_planta === null)) {
    data.append("relacion", form.id_planta);
}
// 🔹 No se agrega 'relacion' si es "ninguna" o vacío



        try {
            await axios.post("http://localhost:4000/descubrimientos/publicar", data);
            alert("Descubrimiento registrado");
            window.location.href = "http://localhost:3000/plantas"; // 🔹 Redirección agregada aquí
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
                maxWidth: '800px', // 🔹 más ancho
                margin: '30px auto',
                padding: '30px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Nuevo Descubrimiento</h2>

            {/* Campo Nombre */}
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    margin: '0 auto 18px auto',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                }}
            />

            {/* Campo Descripción */}
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
                required
                rows={5}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    margin: '0 auto 18px auto',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                }}
            />

            {/* Nuevo campo selector de planta (funcional con datos del backend) */}
            <select
                name="id_planta"
                value={form.id_planta}
                onChange={handleChange}
                required
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    margin: '0 auto 18px auto',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                }}
            >
                <option value="">Selecciona relación de la planta</option>
                <option value="ninguna">Sin relación</option> {/* Nueva opción */}
                {plantas.map((planta) => (
                    <option key={planta.id_planta} value={planta.id_planta}>
                        {planta.nombre_cientifico}
                    </option>
                ))}
            </select>

            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
                style={{
                    display: 'block',
                    width: '100%',
                    margin: '0 auto 18px auto'
                }}
            />

            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Selecciona la ubicación en el mapa:</p>
            <MapContainer
                center={[23.6345, -102.5528]}
                zoom={5}
                style={{
                    height: '350px',
                    width: '100%',
                    margin: '0 auto 25px auto',
                    borderRadius: '10px',
                    border: '1px solid #ccc'
                }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {form.latitud && form.longitud && (
                    <Marker position={[form.latitud, form.longitud]} icon={icon} />
                )}
            </MapContainer>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button
                    type="submit"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'background-color 0.3s'
                    }}
                >
                    Registrar Descubrimiento
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'background-color 0.3s'
                    }}
                >
                    Volver
                </button>
            </div>
        </form>
    );
};

export default FormularioDescubrimiento;
