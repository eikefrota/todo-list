import { useState } from 'react';
import './Login.css'; // Importando o CSS para estilização

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuário:', username);
    console.log('Senha:', password);
    // Aqui você pode adicionar a lógica de autenticação
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>

        <div className="form-group">
          <label htmlFor="username">USUÁRIO</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">SENHA</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className='signup-link'>
          <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
        </div>

        <button type="submit">ENTRAR</button>
      </form>
    </div>
  );
}

export default Login;