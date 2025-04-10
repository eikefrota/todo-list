import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [invalidFields, setInvalidFields] = useState({
    username: false,
    password: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Reset dos estados de erro
    setInvalidFields({
      username: false,
      password: false
    });

    // Verifica campos vazios
    const emptyFields = {
      username: username.trim() === '',
      password: password.trim() === ''
    };

    if (Object.values(emptyFields).some(field => field)) {
      setInvalidFields(emptyFields);
      toast.error('Preencha todos os campos');
      return;
    }

    // Busca usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Procura o usuário
    const usuario = usuarios.find(
      user => user.username === username && user.password === password
    );

    if (usuario) {
      // Login bem sucedido
      localStorage.setItem('usuarioAtual', JSON.stringify({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email
      }));
      
      toast.success('Login realizado com sucesso!', {
        onClose: () => navigate('/tarefas')
      });
    } else {
      // Login falhou - destacar ambos os campos e mostrar mensagem
      setInvalidFields({
        username: true,
        password: true
      });
      toast.error('Usuário ou senha incorretos');
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <div className="form-group">
          <label htmlFor="username">USUÁRIO</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => {
              setUsername(e.target.value);
              setInvalidFields(prev => ({...prev, username: false}));
              setError('');
            }}
            className={invalidFields.username ? 'invalid-input' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">SENHA</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              setInvalidFields(prev => ({...prev, password: false}));
              setError('');
            }}
            className={invalidFields.password ? 'invalid-input' : ''}
          />
        </div>

        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>

        <button className="login-button" type="submit">ENTRAR</button>
      </form>
    </div>
  );
}

export default Login;