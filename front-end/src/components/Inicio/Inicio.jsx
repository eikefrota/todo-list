import React from 'react';
import './Inicio.css';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h1 className="titulo">LISTA DE TAREFAS</h1>
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