import React, { useState } from "react";
import './menu.css'
import logo from './logow.png'
import flecha from './flecha.png'
import filtrar from './filtrar.png'
import perfil from './usuario.png'
import { Link, Navigate, useNavigate } from "react-router-dom";

const Menu = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const navigate = useNavigate();

    const [query, setQuery] = useState(""); //estado para las variables del buscador

    const handleKeyDown = (event) => {// funciona que determina cuando el input recibe la tecla enter
        if (event.key == 'Enter' && query.trim() != '') {//no puede estar vacio al pulsar enter en el buscador
            navigate(`/resultado/${encodeURIComponent(query.trim())}`);
        }
    }

    if (user) {
        //console.log(user.id_investigador);    // Output: 1
       // console.log(user.nombre);  // Output: Alice
       // console.log(user.correo_electronico); // Output: alice@example.com
    }

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
                <Link className="opciones-dos" to='/descubrimientos'>DESCUBRIMIENTOS</Link>
            </div>
            <div className="parte-tres">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img className="filtrar" src={filtrar} alt="filtro"/>
                <div className="line"></div>
                
                <Link className="fondo-perfil" to={user ? '/usuario' : '/iniciarsesion'}>
                    <img className="perfil" src={perfil} alt="perfil"/>
                </Link>
            </div>
        </div>
    );
}

export default Menu;