import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './editar.css';
import Axios from "axios";

const Editar = () => {
    const { id } = useParams();
    const baseUrl = "http://localhost:4000";

    const [numeroCatalogo, setNumeroCatalogo] = useState('');
    const [idOcurrencia, setIdOcurrencia] = useState('');
    const [nombreCientifico, setNombreCientifico] = useState('');
    const [nombreComun, setNombreComun] = useState('');
    const [taxon, setTaxon] = useState('');
    const [idFamilia, setIdFamilia] = useState('');
    const [idColector, setIdColector] = useState('');
    const [fecha, setFecha] = useState('');
    const [idLocalidad, setIdLocalidad] = useState('');
    const [idHabitat, setIdHabitat] = useState('');
    const [fotografia, setFotografia] = useState('');
    const [idInvestigador, setIdInvestigador] = useState('');

    useEffect(() => {
        Axios.get(`${baseUrl}/informacion/${id}`)
            .then(response => {
                const data = response.data;
                setNumeroCatalogo(data.numero_catalogo || '');
                setIdOcurrencia(data.id_ocurrencia || '');
                setNombreCientifico(data.nombre_cientifico || '');
                setNombreComun(data.nombre_comun || '');
                setTaxon(data.taxon || '');
                setIdFamilia(data.id_familia || '');
                setIdColector(data.id_colector || '');
                setFecha(data.fecha || '');
                setIdLocalidad(data.id_localidad || '');
                setIdHabitat(data.id_habitat || '');
                setFotografia(data.fotografia || '');
                setIdInvestigador(data.id_investigador || '');
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formattedDate = new Date(fecha).toISOString().split('T')[0];

        Axios.put(`${baseUrl}/editar/${id}`, {
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

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src={`${baseUrl}/${fotografia}`} alt="Fotografía de la planta" className="imgn-edr" />
                <input type="file" className="in-ep" onChange={(e) => setFotografia(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre científico</h1></div>
                <input type="text" className="in-ep" value={nombreCientifico} onChange={(e) => setNombreCientifico(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre común</h1></div>
                <input type="text" className="in-ep" value={nombreComun} onChange={(e) => setNombreComun(e.target.value)} />
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Id: {id}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <input type="text" className="in-ep" value={taxon} onChange={(e) => setTaxon(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Familia</h1></div>
                <input type="text" className="in-ep" value={idFamilia} onChange={(e) => setIdFamilia(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Colector</h1></div>
                <input type="text" className="in-ep" value={idColector} onChange={(e) => setIdColector(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha recolección</h1></div>
                <input type="date" className="in-ep" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Localidad</h1></div>
                <input type="text" className="in-ep" value={idLocalidad} onChange={(e) => setIdLocalidad(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Hábitat</h1></div>
                <input type="text" className="in-ep" value={idHabitat} onChange={(e) => setIdHabitat(e.target.value)} />
                <div className="nam-sub-ed"><h1 className="sub-ed">Investigador</h1></div>
                <input type="text" className="in-ep" value={idInvestigador} onChange={(e) => setIdInvestigador(e.target.value)} />
                <div>
                    <button className="boton-volver" onClick={() => window.history.back()}>Cancelar</button>
                    <button onClick={handleSubmit} className="boton-ep">Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default Editar;
