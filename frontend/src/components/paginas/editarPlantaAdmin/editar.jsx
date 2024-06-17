import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './editar.css';
import Axios from "axios";

const Editar = () => {
    //OBTIENE LOS DATOS DEL URL
    const { id } = useParams();
    console.log("Id: "+id);

    const [planta, setPlanta] = useState([]);
    const [url, setUrl] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:4000/editar/${id}`)
            .then(response => {
                setPlanta(response.data);
                setUrl(planta.fotografia);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, []); 

    return (
        <div className="editar-bg">
            <div className="editar-uno">
                <img src="https://images.pexels.com/photos/15845935/pexels-photo-15845935/free-photo-of-madera-naturaleza-caminando-bosque.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="img"  className="imgn-edr"/> {/* AQUI VA LA IMAGEN COLOCADA EN LA BASE DE DATOS */}
                <input
                    type="url"
                    className="in-ep"
                    placeholder="URL de la imagen"
                    defaultValue= {url}
                />
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre cientifico</h1></div>
                <input type="text" className="in-ep" placeholder="Nombre cientifico"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Nombre común</h1></div>
                <input type="text" className="in-ep" placeholder="Nombre común"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Número de catalogo</h1></div>
                <input type="text" className="in-ep" placeholder="Número de catalogo"/>
            </div>
            <div className="editar-dos">
                <div className="nam-sub-ed"><h1 className="sub-ed">Id: {id}</h1></div>
                <div className="nam-sub-ed"><h1 className="sub-ed">Id concurrencia</h1></div>
                <input type="text" className="in-ep" placeholder="Id concurrencia"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Taxon</h1></div>
                <input type="text" className="in-ep" placeholder="Taxon"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Id familia</h1></div>
                <input type="text" className="in-ep" placeholder="Id familia"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Id colector</h1></div>
                <input type="text" className="in-ep" placeholder="Id colector"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Fecha recoleccion</h1></div>
                <input type="date" className="in-ep"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Id localidad</h1></div>
                <input type="text" className="in-ep" placeholder="Id localidad"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Id habitad</h1></div>
                <input type="text" className="in-ep" placeholder="Id habitad"/>
                <div className="nam-sub-ed"><h1 className="sub-ed">Id investigador</h1></div>
                <input type="text" className="in-ep" placeholder="Id investigador"/>

                <div>
                    <button className="boton-ep ">Guardar</button>
                </div>

            </div>
        </div>
    );
}

export default Editar;