import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const FormularioDescubrimiento = () => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({});
    const [plantas, setPlantas] = useState([]); // 🔹 lista de plantas

    // 🔹 Cargar datos del descubrimiento y las plantas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [descRes, plantasRes] = await Promise.all([
                    axios.get(`http://localhost:4000/descubrimientos/${id}`),
                    axios.get("http://localhost:4000/plantas/getall")
                ]);
                setForm({
                    ...descRes.data,
                    id_planta: descRes.data.relacion || ""
                });
                setPlantas(plantasRes.data);
            } catch (err) {
                console.error("Error al cargar datos:", err);
            }
        };
        fetchData();
    }, [id]);

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

        if (form.fotografia) data.append("fotografia", form.fotografia);

        // 🔹 enviar relación de planta
        if (form.id_planta === "ninguna" || !form.id_planta) {
            data.append("relacion", "");
        } else {
            data.append("relacion", form.id_planta);
        }

        try {
            await axios.put(`http://localhost:4000/descubrimientos/editar/${id}`, data);
            alert("Descubrimiento actualizado");
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert("Error al actualizar el descubrimiento");
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
                maxWidth: '800px',
                margin: '30px auto',
                padding: '30px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Actualizar Descubrimiento</h2>

            {/* Campo Nombre */}
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre || ''}
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
                value={form.descripcion || ''}
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

            {/* 🔹 Campo relación con planta */}
            <select
                name="id_planta"
                value={form.id_planta || ""}
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
                <option value="ninguna">Sin relación</option>
                {plantas.map((planta) => (
                    <option key={planta.id_planta} value={planta.id_planta}>
                        {planta.nombre_cientifico}
                    </option>
                ))}
            </select>

            {/* 🔹 Etiqueta arriba del campo */}
<label
    htmlFor="fotografia"
    style={{
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    }}
>
    Imagen (opcional):
</label>

<input
    id="fotografia"
    type="file"
    onChange={handleFileChange}
    accept="image/*"
    style={{
        display: 'block',
        width: '100%',
        margin: '0 auto 18px auto'
    }}
/>


            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Selecciona la ubicación en el mapa:</p>
            <MapContainer
                center={[form.latitud || 23.6345, form.longitud || -102.5528]}
                zoom={form.latitud && form.longitud ? 10 : 5}
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
                    Actualizar Descubrimiento
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
