import React from "react";
import './menu.css'
import logo from './logow.png'
import flecha from './flecha.png'
import filtrar from './filtrar.png'
import idioma from './idioma.png'
import perfil from './usuario.png'

const Menu = () => {
    return (
        <div className="background-menu">
            <div className="parte-uno">
                <img src={logo} className="logo" alt="logo" />
                <h1 className="uabcs-title">U A B C S</h1>
                <div className="line"></div>
                <h1 className="herbario-title">H E R B A R I O</h1>
            </div>
            <div className="parte-dos">
                <h1 className="opciones-uno">PLANTAS
                <img className="flecha" src={flecha} alt="ver mas" /></h1>
                <h1 className="opciones-dos">MAPA</h1>
                <h1 className="opciones-uno">ESTADISTICAS</h1>
            </div>
            <div className="parte-tres">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar"
                />
                <img className="filtrar" src={filtrar} alt="filtro"/>
                <div className="line"></div>
                <img className="idioma" src={idioma} alt="idioma"/>
                <div className="fondo-perfil">
                    <img className="perfil" src={perfil} alt="perfil"/>
                </div>
            </div>
        </div>
    );
}

export default Menu;