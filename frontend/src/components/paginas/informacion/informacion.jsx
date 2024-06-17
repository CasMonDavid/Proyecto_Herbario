import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./informacion.css";
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario-production-7369.up.railway.app

const Informacion = () => {
    const { id } = useParams();
    console.log("Id: "+id);

    const [planta, setPlanta] = useState([]);
    const [familia, setFamilia] = useState([]);
    const [colector, setColector] = useState([]);
    const [localidad, setLocalidad] = useState([]);
    const [habitat, setHabitat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const respuesta1 = await Axios.get(`https://backherbario-production-7369.up.railway.app/informacion/${id}`);
                setPlanta(respuesta1.data);

                const respuesta2 = await Axios.get(`https://backherbario-production-7369.up.railway.app/familia/${respuesta1.data.id_familia}`);
                setFamilia(respuesta2.data);

                const respuesta3 = await Axios.get(`https://backherbario-production-7369.up.railway.app/colector/${respuesta1.data.id_colector}`);
                setColector(respuesta3.data);

                const respuesta4 = await Axios.get(`https://backherbario-production-7369.up.railway.app/localidad/${respuesta1.data.id_localidad}`);
                setLocalidad(respuesta4.data);

                const respuesta5 = await Axios.get(`https://backherbario-production-7369.up.railway.app/habitat/${respuesta1.data.id_habitat}`);
                setHabitat(respuesta5.data);
            }catch(err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        Axios.get(`https://backherbario-production-7369.up.railway.app/informacion/${id}`)
        .then(response => {
            setPlanta(response.data);
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        })
    }, [id]);

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src={planta.fotografia} alt="img"  className="imgn-edr"/> {/* AQUI VA LA IMAGEN COLOCADA EN LA BASE DE DATOS */}
                <div className="nam-tit-ed"><h1 className="tit-ed">{planta.nombre_cientifico}</h1></div>
                <div className="nam-tit-ed"><h1 className="nombre-comun">{planta.nombre_comun ? planta.nombre_comun : ''}</h1></div>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Numero de catalogo</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.numero_catalago}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.taxon}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Familia</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{familia.nombre}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Colector</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{colector.nombre}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha de recolección</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.fecha_recoleccion}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Localidad</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{localidad.nombre}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Hábitat</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{habitat.nombre}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Investigador</h1></div>
                <div className="nam-sub-ed"><h1 className="cont-ed">{planta.id_investigador}</h1></div>
            </div>
        </div>
    );
}

export default Informacion;