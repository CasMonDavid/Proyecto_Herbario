import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./informacion.css";
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app

const Informacion = () => {
    const { id } = useParams();

    const [planta, setPlanta] = useState([]);

    const baseUrl = "http://localhost:4000";

    useEffect(() => {
        const fetchData = async () => {
            try{
                const respuesta1 = await Axios.get(`http://localhost:4000/informacion/${id}`);
                setPlanta(respuesta1.data);
            }catch(err) {
                console.error("Hubo un error al obtener los datos:", err);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        Axios.get(`http://localhost:4000/informacion/${id}`)
        .then(response => {
            setPlanta(response.data);
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        })
    }, [id]);

    return (
        <div className="editar-bg">
              <button className="boton-volver" onClick={() => window.history.back()}>
            ⬅ Volver
        </button>
            <div className="editar-uno">
                <img src={`${baseUrl}/${planta.fotografia}`} alt="img"  className="imgn-edr"/> {/* AQUI VA LA IMAGEN COLOCADA EN LA BASE DE DATOS */}
                <div className="nam-tit-ed"><h1 className="tit-ed">{planta.nombre_cientifico}</h1></div>
                <div className="nam-tit-ed"><h1 className="nombre-comun">{planta.nombre_comun ? planta.nombre_comun : ''}</h1></div>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.taxon}</h1></div>

                <div className="nam-sub-ed"><h1 className="sub-ed">Familia</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.familia}</h1></div>

                <div className="nam-sub-ed"><h1 className="sub-ed">Colector</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.colector}</h1></div>

                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha de recolección</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.fecha_recoleccion}</h1></div>

                <div className="nam-sub-ed"><h1 className="sub-ed">Localidad</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.localidad}</h1></div>

                <div className="nam-sub-ed"><h1 className="sub-ed">Hábitat</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.habitat}</h1></div>
                
                <div className="nam-sub-ed"><h1 className="sub-ed">Investigador</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.nombre_investigador}</h1></div>
            </div>
        </div>
    );
}

export default Informacion;