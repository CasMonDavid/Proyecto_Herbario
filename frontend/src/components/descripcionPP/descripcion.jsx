import React from "react";
import './descripcion.css';
import circulo from './circulo.png';
import cac1 from './cac1.png';
import cac2 from './cac2.png';
import cac3 from './cac3.png';
import cac4 from './cac4.png';
import cac5 from './cac5.png';
//import cacTest from '../../img/Cactaceae-Cylindropuntialeptoc_1619875376.jpg';
import cacReal6 from '../../img/H145520.jpg';
import cacReal7 from '../../img/H137564.jpg';
import cacReal8 from '../../img/QUTUR_AJ_83157_M.jpg';
import cacReal9 from '../../img/Najas_May2013.jpg';
import cacReal10 from '../../img/Sphaeralcea_orcuttii_1_1467484862.jpg';

const descripcion = () => {
    return (
        <div className="descripcion">
            <div className="principalD">
                <div className="parte-unoD">
                    <div className="lineD"></div>
                    <div className="recD">
                        <h1 className="eti-gatos">SOMOS <br /> GATOS SALVAJES</h1>
                    </div>
                </div>
                <div className="parte-dosD">
                    <h1 className="titulo-hola">HOOLA HOLA! SOMOS EL HERBARIO UABCS Y TE HABLAREMOS UN POCO DE<span className="titulo-holaC"> NOSOTROS</span>:)</h1>
                    <h1 className="objetivoD">Herbario de la Universidad Autónoma de Baja California Sur (UABCS), dedicados a investigar y conservar la flora local. Nuestro objetivo es contribuir al conocimiento botánico, fomentar el respeto por la naturaleza y brindar recursos para el estudio y la apreciación de la diversidad vegetal de nuestra región.</h1>
                </div>
                <div className="parte-tresD">
                    <img className="circuloD" src= {circulo} alt="decoracion" />
                </div>
            </div>
            <div className="secundariaD">
                <div className="slider">
                    <div className="slide-track">
                        <div className="slide">
                            <img src={cacReal10} alt="img" className="image" />
                        </div>
                        <div className="slide">
                            <img src={cacReal9} alt="img" className="image" />
                        </div>
                        <div className="slide">
                            <img src={cacReal8} alt="img" className="image" />
                        </div>
                        <div className="slide">
                            <img src={cacReal7} alt="img" className="image" />
                        </div>
                        <div className="slide">
                            <img src={cacReal6} alt="img" className="image" />
                        </div>


                        <div className="slide">
                            <img src={cac1} alt="img" />
                        </div>
                        <div className="slide">
                            <img src={cac2} alt="img" />
                        </div>
                        <div className="slide">
                            <img src={cac3} alt="img" />
                        </div>
                        <div className="slide">
                            <img src={cac4} alt="img" />
                        </div>
                        <div className="slide">
                            <img src={cac5} alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default descripcion;