import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './registrarPlanta.css';
import Axios from "axios";

//local: http://localhost:4000
//railway: https://backherbario-production-7369.up.railway.app

const RegistrarPlanta = () => {
    const [familias, setFamilias] = useState([]);

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

    /*useEffect(() => {
        Axios.get('http://localhost:4000/getfamilias')
        .then(
            response => {
                setFamilias(response.data);
            }
        ).catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        });
    }, []);*/

    const registrarPlanta = (event) => {
        event.preventDefault();

        const formattedDate = new Date(fecha).toISOString().split('T')[0];

        Axios.post(`http://localhost:4000/registrarplanta`, {
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
            alert("Planta registrada de forma exitosa");
        }).catch(error => {
            console.error("Hubo un error al registrar los datos:", error);
            alert("Error al registrar los datos");
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
            <div className="editar-unoRG">
                <h1>Registrar planta</h1>
                <div className="nam-sub-ed"><h1 className="sub-ed">Url de la imagen</h1></div>
                <input
                    type="url"
                    className="in-ep"
                    placeholder="URL de la imagen"
                    onChange={fotografiaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre cientifico</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Nombre cientifico"
                    onChange={nombreCientificoChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre común</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Nombre común"
                    onChange={nombreComunChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Número de catalogo</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Número de catalogo"
                    onChange={numeroCatalogoChange}
                />

                <div className="nam-sub-ed"><h1 className="sub-ed">Id concurrencia</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id concurrencia"
                    onChange={idOcurrenciaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Taxon"
                    onChange={taxonChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id familia</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id familia"
                    onChange={idFamiliaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id colector</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id colector"
                    onChange={idColectorChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha recoleccion</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="AAAA-MM-AA"
                    onChange={fechaChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id localidad</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id localidad"
                    onChange={idLocalidadChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id habitad</h1></div>
                <input
                    type="text"
                    className="in-ep"
                    placeholder="Id habitad"
                    onChange={idHabitatChange}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Id investigador</h1></div>
                <input
                type="text"
                className="in-ep"
                placeholder="Id investigador"
                onChange={idInvestigadorChange}
                />

                <div>
                    <button onClick={registrarPlanta} className="boton-epRP">Registrar planta</button>
                </div>
            </div>
        </div>
    );
}

export default RegistrarPlanta;