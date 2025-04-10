import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cadastro.css';

function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [invalidFields, setInvalidFields] = useState({
    username: false,
    email: false,
    password: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset dos estados de erro
    setError('');
    setInvalidFields({
      username: false,
      email: false,
      password: false
    });

    // Verifica campos vazios
    const emptyFields = {
      username: username.trim() === '',
      email: email.trim() === '',
      password: password.trim() === ''
    };

    if (Object.values(emptyFields).some(field => field)) {
      setInvalidFields(emptyFields);
      toast.error('Preencha todos os campos');
      return;
    }

    // Verifica se já existem usuários no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verifica se o usuário ou email já existe
    const usuarioExiste = usuarios.some(
      user => user.username === username || user.email === email
    );

    if (usuarioExiste) {
      setError('Usuário ou email já cadastrado');
      return;
    }

    // Cria novo usuário
    const novoUsuario = {
      id: Date.now(),
      username,
      email,
      password
    };

    // Adiciona ao array e salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostra mensagem de sucesso e redireciona
    toast.success('Cadastro realizado com sucesso!', {
      onClose: () => navigate('/login')
    });
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>CADASTRO</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <div className="form-group">
          <label htmlFor="username">USUÁRIO</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className={invalidFields.username ? 'invalid-input' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={invalidFields.email ? 'invalid-input' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">SENHA</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className={invalidFields.password ? 'invalid-input' : ''}
          />
        </div>

        <div className="login-link">
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </div>

        <button className='signup-button' type="submit">CADASTRAR</button>
      </form>
    </div>
  );
}

export default Cadastro;