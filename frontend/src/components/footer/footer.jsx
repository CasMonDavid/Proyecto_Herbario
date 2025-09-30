import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from "../menu/logow.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección izquierda: Logo + Título */}
        <div className="footer-left">
          <img src={logo} alt="logo" className="footer-logo" />
          <div className="footer-title">
            <Link to="/" className="uabcs-title">U A B C S</Link>
            <span className="herbario-title">H E R B A R I O</span>
          </div>
        </div>

        {/* Sección central: Información */}
        <div className="footer-center">
          <p>Proyecto de registro y monitoreo de plantas y sus descubrimientos.</p>
          <ul className="footer-links">
            <li>Email: info@plantasdescubrimientos.com</li>
            <li>Teléfono: +52 612 123 4567</li>
            <li>Dirección: Blvd. Luis Donaldo Colosio, La Paz, BCS</li>
          </ul>
        </div>

        {/* Sección inferior: Copyright */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} UABCS | Herbario. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
