import React from "react";
import { useState, useEffect } from 'react';
import './plantas.css'
import Card from "./card";
import Axios from 'axios';

const Plantas = () => {

    const [plantas, setPlantas] = useState([]);

    useEffect(() => {
        // Reemplaza la URL con la URL de tu backend que devuelve la lista de plantas
        Axios.get('https://backherbario-production-7369.up.railway.app/plantas/getall')
            .then(response => {
                setPlantas(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, []); 

    return (
        <div className="plantas">
            <h1>Plantas</h1>
            <div className="cartas">
                {plantas.map((planta) => (
                    <Card
                        key={planta.id_planta}
                        title={planta.nombre_cientifico}
                        imageUrl={planta.fotografia}
                    />
                ))}
            </div>
        </div>
    );
}

export default Plantas;