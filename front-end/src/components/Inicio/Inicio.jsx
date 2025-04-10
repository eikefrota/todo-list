import React from 'react';
import './Inicio.css';
import { Link } from 'react-router-dom';
import logoTaskflow from '../../assets/logo-taskflow.png';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <img src={logoTaskflow} alt="TaskFlow Logo" className="logo" />
      <div className="botoes-container">
        <Link to="/login">
          <button className="botao">Login</button>
        </Link>
        <Link to="/cadastro">
          <button className="botao">Cadastro</button>
        </Link>
      </div>
    </div>
  );
};

export default Inicio;