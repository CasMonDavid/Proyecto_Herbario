import React, { useState, useEffect } from "react";
import './plantas.css'
import Card from "./card";
import Axios from 'axios';

//local: http://localhost:4000
//railway: https://backherbario-production-7369.up.railway.app

const Plantas = () => {
    const [plantas, setPlantas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get('https://backherbario-production-7369.up.railway.app/plantas/getall')
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
                        return (
                            <Card
                                key={planta.id_planta}
                                id={planta.id_planta}
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