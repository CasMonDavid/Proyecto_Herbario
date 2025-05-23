import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './editar.css';
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario--production-7369.up.railway.app

const Editar = () => {
    const { id } = useParams(); //OBTIENE LOS DATOS DEL URL
    const baseUrl = "http://localhost:4000";

    //const [planta, setPlanta] = useState([]);

    const [planta, setPlanta] = useState([]);
    
    useEffect(() => {
        Axios.get(`http://localhost:4000/informacion/${id}`)
        .then(response => {
            setPlanta(response.data);
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        })
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formattedDate = new Date(fecha).toISOString().split('T')[0];

        Axios.put(`http://localhost:4000/editar/${id}`, {
            numero_catalogo: numeroCatalogo,
            id_ocurrencia: idOcurrencia,
            nombre_cientifico: nombreCientifico,
            nombre_comun: nombreComun,
            taxon: taxon,
            id_familia: idFamilia,
            id_colector: idColector,
            fecha: formattedDate,
            id_localidad: idLocalidad,
            id_habitat: idHabitat,
            fotografia: fotografia,
            id_investigador: idInvestigador
        }).then(response => {
            alert("Planta actualizada de forma correcta");
        }).catch(error => {
            console.error("Hubo un error al actualizar los datos:", error);
            alert("Error al actualizar los datos");
        });
    };

    const numeroCatalogoChange = (event) => {
        setNumeroCatalogo(event.target.value);
    };
    const idOcurrenciaChange = (event) => {
        setIdOcurrencia(event.target.value);
    };
    const nombreCientificoChange = (event) => {
        setNombreCientifico(event.target.value);
    };
    const nombreComunChange = (event) => {
        setNombreComun(event.target.value);
    };
    const taxonChange = (event) => {
        setTaxon(event.target.value);
    };
    const idFamiliaChange = (event) => {
        setIdFamilia(event.target.value);
    };
    const idColectorChange = (event) => {
        setIdColector(event.target.value);
    };
    const fechaChange = (event) => {
        setFecha(event.target.value);
    };
    const idLocalidadChange = (event) => {
        setIdLocalidad(event.target.value);
    };
    const idHabitatChange = (event) => {
        setIdHabitat(event.target.value);
    };
    const fotografiaChange = (event) => {
        setFotografia(event.target.value);
    };
    const idInvestigadorChange = (event) => {
        setIdInvestigador(event.target.value);
    };

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src={`${baseUrl}/${planta.fotografia}`} alt="Fotogracia de la planta"  className="imgn-edr"/> {/* AQUI VA LA IMAGEN COLOCADA EN LA BASE DE DATOS */}
                <input
                    type="file"
                    className="in-ep"
                    onChange={fotografiaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre cientifico</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Nombre cientifico"
                    value={planta.nombre_cientifico}
                    onChange={nombreCientificoChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre común</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Nombre común"
                    value={planta.nombre_comun ? planta.nombre_comun : ''}
                    onChange={nombreComunChange}
                />
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Id: {id}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Taxon"
                    value={planta.taxon}
                    onChange={taxonChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Familia</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Familia"
                    value={planta.familia}
                    onChange={idFamiliaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Colector</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Colector"
                    value={planta.colector}
                    onChange={idColectorChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha recoleccion</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="AAAA-MM-DD"
                    value={planta.fecha_recoleccion}
                    onChange={fechaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Localidad</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Localidad"
                    value={planta.localidad}
                    onChange={idLocalidadChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Habitad</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Habitad"
                    value={planta.habitat}
                    onChange={idHabitatChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Investigador</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id investigador"
                    value={planta.nombre_investigador}
                    onChange={idInvestigadorChange}
                />
                <div>
                    <button className="boton-volver" onClick={() => window.history.back()}>Cancelar</button>
               
                    <button onClick={handleSubmit} className="boton-ep">Guardar</button>
                </div>
                

            </div>
        </div>
    );
}

export default Editar;