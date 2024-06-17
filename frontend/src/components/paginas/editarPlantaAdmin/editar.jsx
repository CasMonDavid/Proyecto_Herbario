import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './editar.css';
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario-production-7369.up.railway.app

const Editar = () => {
    //OBTIENE LOS DATOS DEL URL
    const { id } = useParams();
    //console.log("Id: "+id);

    //const [planta, setPlanta] = useState([]);
    const [numeroCatalogo, setNumeroCatalogo] = useState(0);
    const [idOcurrencia, setIdOcurrencia] = useState("");
    const [nombreCientifico, setNombreCientifico] = useState("");
    const [fecha, setFecha] = useState("");
    const [nombreComun, setNombreComun] = useState("");
    const [taxon, setTaxon] = useState("");
    const [idFamilia, setIdFamilia] = useState(0);
    const [idColector, setIdColector] = useState(0);
    const [idLocalidad, setIdLocalidad] = useState(0);
    const [idHabitat, setIdHabitat] = useState(0);
    const [fotografia, setFotografia] = useState("");
    const [idInvestigador, setIdInvestigador] = useState(0);
    
    useEffect(() => {
        Axios.get(`https://backherbario-production-7369.up.railway.app/editar/${id}`)
            .then(response => {
                setFotografia(response.data.fotografia);
                setFecha(response.data.fecha_recoleccion);
                setNombreCientifico(response.data.nombre_cientifico);
                setNombreComun(response.data.nombre_comun);
                setNumeroCatalogo(response.data.numero_catalago);
                setIdOcurrencia(response.data.id_ocurrencia);
                setTaxon(response.data.taxon);
                setIdFamilia(response.data.id_familia);
                setIdColector(response.data.id_colector);
                setFecha(response.data.fecha_recoleccion);
                setIdLocalidad(response.data.id_localidad);
                setIdHabitat(response.data.id_habitat);
                setIdInvestigador(response.data.id_investigador);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formattedDate = new Date(fecha).toISOString().split('T')[0];

        Axios.put(`https://backherbario-production-7369.up.railway.app/editar/${id}`, {
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
                <img src={fotografia} alt="Fotogracia de la planta"  className="imgn-edr"/> {/* AQUI VA LA IMAGEN COLOCADA EN LA BASE DE DATOS */}
                <input
                    type="url"
                    className="in-ep"
                    placeholder="URL de la imagen"
                    value={fotografia}
                    onChange={fotografiaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre cientifico</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Nombre cientifico"
                    value={nombreCientifico}
                    onChange={nombreCientificoChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre común</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Nombre común"
                    value={nombreComun ? nombreComun : ''}
                    onChange={nombreComunChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Número de catalogo</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Número de catalogo"
                    value={numeroCatalogo}
                    onChange={numeroCatalogoChange}
                />
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Id: {id}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Id concurrencia</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id concurrencia"
                    value={idOcurrencia}
                    onChange={idOcurrenciaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Taxon"
                    value={taxon}
                    onChange={taxonChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id familia</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id familia"
                    value={idFamilia}
                    onChange={idFamiliaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id colector</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id colector"
                    value={idColector}
                    onChange={idColectorChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha recoleccion</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="AAAA-MM-DD"
                    value={fecha}
                    onChange={fechaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id localidad</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id localidad"
                    value={idLocalidad}
                    onChange={idLocalidadChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id habitad</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id habitad"
                    value={idHabitat}
                    onChange={idHabitatChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id investigador</h1></div>
                <input
                    type="number"
                    className="in-ep"
                    placeholder="Id investigador"
                    value={idInvestigador}
                    onChange={idInvestigadorChange}
                />
                <div>
                    <button onClick={handleSubmit} className="boton-ep ">Guardar</button>
                </div>

            </div>
        </div>
    );
}

export default Editar;