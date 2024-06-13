import React from "react";
import './menu.css'
import logo from './logow.png'
import flecha from './flecha.png'
import filtrar from './filtrar.png'
import idioma from './idioma.png'
import perfil from './usuario.png'
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="background-menu">
            <div className="parte-uno">
                <img src={logo} className="logo" alt="logo" />
                <Link className="uabcs-title" to='/'>U A B C S</Link>
                <div className="line"></div>
                <h1 className="herbario-title">H E R B A R I O</h1>
            </div>
            <div className="parte-dos">
                <Link className="opciones" to='/plantas'>PLANTAS
                <img className="flecha" src={flecha} alt="ver mas" /></Link>
                <Link className="opciones-dos" to='/mapa'>MAPA</Link>
                <Link className="opciones-uno" to='/'>ESTADISTICAS</Link>
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
                <Link className="fondo-perfil" to='/iniciarsesion'>
                    <img className="perfil" src={perfil} alt="perfil"/>
                </Link>
            </div>
        </div>
    );
}

export default Menu;