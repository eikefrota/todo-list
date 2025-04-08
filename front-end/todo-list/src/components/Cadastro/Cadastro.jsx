import { useState } from 'react';
import './Cadastro.css'; // Crie um arquivo CSS para estilização, se necessário
import { Link } from 'react-router-dom'; // Importando o Link

function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuário:', username);
    console.log('Email:', email);
    console.log('Senha:', password);
    // Aqui você pode adicionar a lógica de cadastro
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>CADASTRO</h2>

        <div className="form-group">
          <label htmlFor="username">USUÁRIO</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">SENHA</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="signup-link">
          <p>
            Já tem uma conta? <Link to="/">Faça login</Link>
          </p>
        </div>

        <button type="submit">CADASTRAR</button>
      </form>
    </div>
  );
}

export default Cadastro;