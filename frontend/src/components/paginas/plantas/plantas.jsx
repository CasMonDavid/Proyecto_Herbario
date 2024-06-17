import React from "react";
import { useState, useEffect } from 'react';
import './plantas.css'
import Card from "./card";
import Axios from 'axios';

//local: http://localhost:4000
//railway: https://backherbario-production-7369.up.railway.app

const Plantas = () => {
    const [plantas, setPlantas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get('http://localhost:4000/plantas/getall')
            .then(response => {
                setPlantas(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
                setIsLoading(false);
            });
    }, []); 

    return (
        <div className="plantas">
            <h1>Plantas</h1>
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <div className="cartas">
                    {plantas.map((planta) => {
                        console.log(planta.nombre_cientifico);
                        return (
                            <Card
                                key={planta.id}
                                title={planta.nombre_cientifico}
                                imageUrl={planta.fotografia}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Plantas;